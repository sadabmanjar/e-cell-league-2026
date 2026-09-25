import { prisma } from "../../lib/prisma.js";
import type { BulkUpsertResultsInput, PublishResultsInput } from "./validation.js";
import { LeaguePointsEngine } from "../../engine/league-points.engine.js";

export class ResultService {
  static async getByRound(competitionId: string, roundId: string) {
    // Validate competition and round exist and belong to each other
    const round = await prisma.competitionRound.findFirst({
      where: { id: roundId, competitionId },
    });
    if (!round) throw new Error("ROUND_NOT_FOUND");

    return prisma.result.findMany({
      where: { competitionId, roundId },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        updatedBy: { select: { id: true, name: true, email: true } },
        leaguePoint: true,
      },
      orderBy: { rank: "asc" },
    });
  }

  static async bulkUpsert(data: BulkUpsertResultsInput, adminId: string) {
    const { competitionId, roundId, results } = data;

    // Validate competition
    const competition = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!competition) throw new Error("COMPETITION_NOT_FOUND");

    // Validate round belongs to competition
    const round = await prisma.competitionRound.findFirst({ where: { id: roundId, competitionId } });
    if (!round) throw new Error("ROUND_NOT_FOUND");

    // Validate all registrationIds exist and are registered for this competition
    const registrationIds = results.map(r => r.registrationId);
    const validRegistrations = await prisma.registrationCompetition.findMany({
      where: { competitionId, registrationId: { in: registrationIds } },
      select: { registrationId: true },
    });
    const validIds = new Set(validRegistrations.map(r => r.registrationId));
    const invalidEntries = registrationIds.filter(id => !validIds.has(id));
    if (invalidEntries.length > 0) {
      throw new Error(`INVALID_REGISTRATIONS:${invalidEntries.join(",")}`);
    }

    // Upsert each result as DRAFT (never touches leaderboard)
    const upsertedResults = await prisma.$transaction(
      results.map(r =>
        prisma.result.upsert({
          where: { roundId_registrationId: { roundId, registrationId: r.registrationId } },
          create: {
            competitionId,
            roundId,
            registrationId: r.registrationId,
            score: r.score,
            rank: r.rank ?? null,
            feedback: r.feedback ?? null,
            status: "DRAFT",
            createdById: adminId,
            updatedById: adminId,
          },
          update: {
            score: r.score,
            rank: r.rank ?? null,
            feedback: r.feedback ?? null,
            updatedById: adminId,
          },
        })
      )
    );

    return upsertedResults;
  }

  static async publishResults(data: PublishResultsInput, adminId: string) {
    const { competitionId, roundId } = data;

    const draftResults = await prisma.result.findMany({
      where: { competitionId, roundId, status: "DRAFT" },
    });

    if (draftResults.length === 0) {
      throw new Error("NO_DRAFT_RESULTS");
    }

    const published = await prisma.$transaction([
      prisma.result.updateMany({
        where: { competitionId, roundId, status: "DRAFT" },
        data: { status: "PUBLISHED", updatedById: adminId },
      }),
    ]);

    // Trigger the engine asynchronously — does NOT block the HTTP response
    // The engine is the ONLY code that touches LeaguePoint and Leaderboard
    setImmediate(() =>
      LeaguePointsEngine.processPublishedRound(competitionId, roundId).catch(err =>
        console.error("[LeaguePointsEngine] Error processing published round:", err)
      )
    );

    return { publishedCount: draftResults.length };
  }

  static async unpublishResults(data: PublishResultsInput, adminId: string) {
    const { competitionId, roundId } = data;

    // Unpublishing nullifies associated league points to prevent stale data
    const publishedResults = await prisma.result.findMany({
      where: { competitionId, roundId, status: "PUBLISHED" },
      select: { id: true },
    });

    if (publishedResults.length === 0) throw new Error("NO_PUBLISHED_RESULTS");

    const resultIds = publishedResults.map(r => r.id);

    await prisma.$transaction([
      // Remove league points for these results first
      prisma.leaguePoint.deleteMany({ where: { resultId: { in: resultIds } } }),
      // Revert status to DRAFT
      prisma.result.updateMany({
        where: { id: { in: resultIds } },
        data: { status: "DRAFT", updatedById: adminId },
      }),
    ]);

    // Recalculate leaderboard for affected ECells after nullifying their points
    const eCellIds = publishedResults.map(r => (r as any).registration?.eCellId).filter(Boolean);
    setImmediate(() =>
      LeaguePointsEngine.processUnpublishedRound(eCellIds).catch(err =>
        console.error("[LeaguePointsEngine] Error processing unpublished round:", err)
      )
    );

    return { unpublishedCount: publishedResults.length };
  }

  static async deleteResult(resultId: string) {
    const result = await prisma.result.findUnique({ where: { id: resultId } });
    if (!result) throw new Error("RESULT_NOT_FOUND");

    if (result.status === "PUBLISHED") {
      throw new Error("CANNOT_DELETE_PUBLISHED");
    }

    return prisma.result.delete({ where: { id: resultId } });
  }
}
