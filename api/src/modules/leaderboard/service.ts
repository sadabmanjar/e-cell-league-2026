import { prisma } from "../../lib/prisma.js";

export class LeaderboardService {
  /**
   * Get the global overall leaderboard.
   * Joins ECell, College, and the individual LeaguePoint breakdowns.
   */
  static async getOverallLeaderboard() {
    const leaderboards = await prisma.leaderboard.findMany({
      where: { globalRank: { not: null } },
      orderBy: { globalRank: "asc" },
      include: {
        eCell: {
          include: {
            college: true,
            leaguePoints: {
              include: {
                competition: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });

    // Format the response for the frontend
    return leaderboards.map((lb) => {
      // Map competition points
      const competitionScores = lb.eCell.leaguePoints.map((lp) => ({
        competitionId: lp.competitionId,
        competitionName: lp.competition.name,
        points: lp.points,
        rank: lp.rank,
      }));

      return {
        rank: lb.globalRank,
        totalPoints: lb.totalPoints,
        trend: "steady", // Could calculate trend by comparing with historical snapshot
        eCell: {
          id: lb.eCellId,
          name: lb.eCell.name,
          collegeName: lb.eCell.college.name,
        },
        competitionScores,
      };
    });
  }

  /**
   * Get the leaderboard for a specific competition.
   */
  static async getCompetitionLeaderboard(competitionId: string) {
    // Look up competition first to ensure it exists
    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
      select: { id: true, name: true },
    });
    
    if (!competition) throw new Error("COMPETITION_NOT_FOUND");

    const points = await prisma.leaguePoint.findMany({
      where: { competitionId, points: { gt: 0 } }, // Only teams that scored points
      orderBy: { points: "desc" },
      include: {
        eCell: {
          include: { college: true },
        },
      },
    });

    return points.map((lp) => ({
      rank: lp.rank, // Note: For tied points, this rank may need client-side or separate tie-breaking adjustment if not stored correctly for the competition alone
      points: lp.points,
      eCell: {
        id: lp.eCellId,
        name: lp.eCell.name,
        collegeName: lp.eCell.college.name,
      },
    }));
  }
}
