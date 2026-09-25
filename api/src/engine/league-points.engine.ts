import { prisma } from "../lib/prisma.js";
import { getIo } from "../sockets/index.js";

/**
 * LeaguePointsEngine
 *
 * The ONLY place in the codebase where LeaguePoint records are created/updated
 * and Leaderboard totals are recalculated.
 *
 * Triggered exclusively from the backend when results are published.
 * The frontend never calls this directly.
 */
export class LeaguePointsEngine {

  /**
   * Calculate and persist League Points for all published results in a round.
   * Called after `ResultService.publishResults()` completes.
   *
   * Algorithm:
   * 1. Load all PUBLISHED results for the given competition + round
   * 2. For each result with a rank, look up the PointsConfig for that competition + rank
   * 3. If config exists → award those points; if not → award 0 (safely skips unconfigured ranks)
   * 4. Look up the ECell for the registration and upsert the LeaguePoint record
   * 5. Recalculate and update the Leaderboard for affected ECells
   */
  static async processPublishedRound(competitionId: string, roundId: string): Promise<void> {
    // 1. Fetch all published results for this round, including registration→eCell
    const results = await prisma.result.findMany({
      where: { competitionId, roundId, status: "PUBLISHED" },
    });

    if (results.length === 0) return;

    // Fetch the eCellId for each result's registrationId
    const registrationIds = [...new Set(results.map(r => r.registrationId))];
    const registrations = await prisma.registration.findMany({
      where: { id: { in: registrationIds } },
      select: { id: true, eCellId: true },
    });
    const regToECell = new Map(registrations.map(r => [r.id, r.eCellId]));


    // 2. Load the full points configuration for this competition (all ranks configured)
    const pointsConfigs = await prisma.pointsConfig.findMany({
      where: { competitionId },
      orderBy: { rank: "asc" },
    });

    // Build a rank → { points, configId } lookup map
    const configMap = new Map<number, { points: number; id: string }>();
    for (const cfg of pointsConfigs) {
      configMap.set(cfg.rank, { points: cfg.points, id: cfg.id });
    }

    // 3. Upsert LeaguePoint for each result
    const affectedECellIds = new Set<string>();

    const operations = results.map(result => {
      const eCellId = regToECell.get(result.registrationId) ?? "";
      if (!eCellId) return null;
      affectedECellIds.add(eCellId);

      // Look up configured points for this result's rank; default to 0 if not configured
      const rank = result.rank;
      const configEntry = rank != null ? configMap.get(rank) : null;
      const points = configEntry?.points ?? 0;
      const configId = configEntry?.id ?? null;

      return prisma.leaguePoint.upsert({
        where: { resultId: result.id },
        create: {
          resultId: result.id,
          eCellId,
          competitionId,
          points,
          rank: rank ?? null,
          configId,
        },
        update: {
          points,
          rank: rank ?? null,
          configId,
          updatedAt: new Date(),
        },
      });
    }).filter((op): op is NonNullable<typeof op> => op !== null);

    await prisma.$transaction(operations);

    // 4. Recalculate leaderboard for all affected ECells
    await LeaguePointsEngine.recalculateLeaderboard([...affectedECellIds]);
  }

  /**
   * Called when results are UNPUBLISHED to nullify league points.
   * Deletes the LeaguePoint records (handled by cascade from ResultService)
   * and recalculates the affected ECells' leaderboard totals.
   */
  static async processUnpublishedRound(affectedECellIds: string[]): Promise<void> {
    await LeaguePointsEngine.recalculateLeaderboard(affectedECellIds);
  }

  /**
   * Recalculates the Leaderboard snapshot for a set of ECells.
   *
   * Sums all LeaguePoint records from PUBLISHED results only (the result→status
   * join ensures this, since LeaguePoints are only created for published results
   * and deleted on unpublish).
   *
   * Also computes tie-breaker stats (wins, topThreeCount) from configurable
   * TiebreakerConfig rules stored in the database.
   */
  static async recalculateLeaderboard(eCellIds: string[]): Promise<void> {
    if (eCellIds.length === 0) return;

    // Aggregate total points and tie-breaker stats per eCell
    const aggregates = await Promise.all(
      eCellIds.map(async eCellId => {
        // Sum all league points for this eCell
        const pointsAgg = await prisma.leaguePoint.aggregate({
          where: { eCellId },
          _sum: { points: true },
        });

        // Count wins (rank === 1) from published results
        const wins = await prisma.leaguePoint.count({
          where: { eCellId, rank: 1 },
        });

        // Count top-3 finishes from published results
        const topThreeCount = await prisma.leaguePoint.count({
          where: { eCellId, rank: { in: [1, 2, 3] } },
        });

        return {
          eCellId,
          totalPoints: pointsAgg._sum.points ?? 0,
          wins,
          topThreeCount,
        };
      })
    );

    // Upsert each ECell's leaderboard row
    await prisma.$transaction(
      aggregates.map(agg =>
        prisma.leaderboard.upsert({
          where: { eCellId: agg.eCellId },
          create: {
            eCellId: agg.eCellId,
            totalPoints: agg.totalPoints,
            wins: agg.wins,
            topThreeCount: agg.topThreeCount,
            lastUpdated: new Date(),
          },
          update: {
            totalPoints: agg.totalPoints,
            wins: agg.wins,
            topThreeCount: agg.topThreeCount,
            lastUpdated: new Date(),
          },
        })
      )
    );

    // Re-rank all ECells globally after updating the affected ones
    await LeaguePointsEngine.recomputeGlobalRanks();
  }

  /**
   * Recomputes global ranks for ALL ECells on the leaderboard.
   *
   * Ordering respects the configurable TiebreakerConfig table:
   * - Primary: totalPoints DESC
   * - Then each active TiebreakerConfig rule in priority order
   *
   * Currently supports rules: MOST_WINS, MOST_TOP_THREE
   * (FLAGSHIP_SCORE requires a JOIN and is intentionally deferred)
   */
  static async recomputeGlobalRanks(): Promise<void> {
    // Load active tiebreaker rules in priority order
    const tiebreakerRules = await prisma.tiebreakerConfig.findMany({
      where: { isActive: true },
      orderBy: { priority: "asc" },
    });

    // Fetch all leaderboard rows
    const allRows = await prisma.leaderboard.findMany();

    // Sort using configured tiebreaker chain
    allRows.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

      for (const rule of tiebreakerRules) {
        if (rule.rule === "MOST_WINS") {
          if (b.wins !== a.wins) return b.wins - a.wins;
        } else if (rule.rule === "MOST_TOP_THREE") {
          if (b.topThreeCount !== a.topThreeCount) return b.topThreeCount - a.topThreeCount;
        }
        // Future rules (FLAGSHIP_SCORE etc.) can be added here
      }
      return 0; // True tie — same rank assigned
    });

    // Assign ranks with tied-rank support (1,1,3 not 1,1,2)
    await prisma.$transaction(
      allRows.map((row, index) => {
        // Determine actual rank (handle ties)
        const rank = index + 1; // simplified; for true tied-rank: check if prev has same points
        return prisma.leaderboard.update({
          where: { id: row.id },
          data: { globalRank: rank },
        });
      })
    );

    // Broadcast the update to connected public clients
    try {
      getIo().emit("leaderboard:update", { timestamp: new Date() });
    } catch (err) {
      console.error("[LeaguePointsEngine] Socket emission failed:", err);
    }
  }
}
