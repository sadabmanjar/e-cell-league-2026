import { prisma } from "../../lib/prisma.js";
import type { BulkUpsertPointsConfigInput, UpsertTiebreakerInput } from "./validation.js";

export class PointsConfigService {

  // ── Points Config CRUD ────────────────────────────────────────────────────────

  static async getByCompetition(competitionId: string) {
    return prisma.pointsConfig.findMany({
      where: { competitionId },
      orderBy: { rank: "asc" },
    });
  }

  static async getAllCompetitionConfigs() {
    return prisma.pointsConfig.findMany({
      include: { competition: { select: { id: true, name: true, slug: true } } },
      orderBy: [{ competition: { name: "asc" } }, { rank: "asc" }],
    });
  }

  /**
   * Bulk upsert: replaces the entire points config for a competition atomically.
   * This is safer than incremental updates since it prevents partial configs.
   */
  static async bulkUpsert(data: BulkUpsertPointsConfigInput) {
    const { competitionId, configs } = data;

    // Validate competition exists
    const competition = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!competition) throw new Error("COMPETITION_NOT_FOUND");

    // Check if any published results exist for this competition
    // Warn but allow update — points engine will re-process if triggered
    const publishedCount = await prisma.result.count({
      where: { competitionId, status: "PUBLISHED" },
    });

    // Atomic: delete existing and insert new
    await prisma.$transaction([
      prisma.pointsConfig.deleteMany({ where: { competitionId } }),
      prisma.pointsConfig.createMany({
        data: configs.map(c => ({
          competitionId,
          rank: c.rank,
          points: c.points,
          label: c.label ?? null,
        })),
      }),
    ]);

    return {
      saved: configs.length,
      hasPublishedResults: publishedCount > 0,
      warning: publishedCount > 0
        ? "This competition has published results. You must re-publish results to apply the updated points configuration."
        : null,
    };
  }

  static async deleteByCompetition(competitionId: string) {
    const publishedCount = await prisma.result.count({
      where: { competitionId, status: "PUBLISHED" },
    });
    if (publishedCount > 0) throw new Error("HAS_PUBLISHED_RESULTS");

    return prisma.pointsConfig.deleteMany({ where: { competitionId } });
  }

  // ── Tiebreaker Config CRUD ────────────────────────────────────────────────────

  static async getTiebreakers() {
    return prisma.tiebreakerConfig.findMany({ orderBy: { priority: "asc" } });
  }

  static async upsertTiebreaker(data: UpsertTiebreakerInput) {
    return prisma.tiebreakerConfig.upsert({
      where: { priority: data.priority },
      create: data,
      update: { rule: data.rule, label: data.label, isActive: data.isActive ?? true },
    });
  }

  static async deleteTiebreaker(id: string) {
    return prisma.tiebreakerConfig.delete({ where: { id } });
  }
}
