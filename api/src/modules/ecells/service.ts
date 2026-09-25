import { prisma } from "../../lib/prisma.js";

export class EcellService {
  /**
   * Fetch all participating E-Cells for the public /teams page
   */
  static async getPublicTeams() {
    const ecells = await prisma.eCell.findMany({
      include: {
        college: {
          select: { name: true, city: true, state: true }
        },
        leaderboard: {
          select: { globalRank: true, totalPoints: true }
        },
        registrations: {
          where: { status: "APPROVED" },
          include: {
            competitions: {
              include: {
                competition: { select: { id: true, name: true } }
              }
            }
          }
        }
      },
      orderBy: {
        leaderboard: {
          globalRank: "asc"
        }
      }
    });

    // Map to a clean public format — no sensitive fields
    return ecells.map(ecell => {
      const participatingComps = new Map<string, string>();
      ecell.registrations.forEach(reg => {
        reg.competitions.forEach(rc => {
          participatingComps.set(rc.competitionId, rc.competition.name);
        });
      });

      return {
        id: ecell.id,
        name: ecell.name,
        slug: ecell.slug,
        logo: ecell.logo,
        college: ecell.college,
        rank: ecell.leaderboard?.globalRank ?? null,
        totalPoints: ecell.leaderboard?.totalPoints ?? 0,
        competitions: Array.from(participatingComps.values())
      };
    });
  }

  /**
   * Fetch detailed public view for a specific E-Cell by its slug
   */
  static async getPublicTeamBySlug(slug: string) {
    const ecell = await prisma.eCell.findUnique({
      where: { slug },
      include: {
        college: {
          select: { name: true, city: true, state: true }
        },
        leaderboard: true,
        leaguePoints: {
          include: {
            competition: { select: { id: true, name: true } },
            result: { select: { rank: true, status: true } }
          }
        },
        registrations: {
          where: { status: "APPROVED" },
          include: {
            competitions: {
              include: {
                competition: { select: { id: true, name: true } }
              }
            }
          }
        }
      }
    });

    if (!ecell) throw new Error("TEAM_NOT_FOUND");

    const participatingComps = new Map<string, string>();
    ecell.registrations.forEach(reg => {
      reg.competitions.forEach(rc => {
        participatingComps.set(rc.competitionId, rc.competition.name);
      });
    });

    const performance = ecell.leaguePoints.map(lp => ({
      competitionName: lp.competition.name,
      rankAchieved: lp.result.rank,
      pointsAwarded: lp.points,
      isPublished: lp.result.status === "PUBLISHED"
    }));

    return {
      id: ecell.id,
      name: ecell.name,
      slug: ecell.slug,
      logo: ecell.logo,
      socialLinks: ecell.socialLinks,
      college: ecell.college,
      rank: ecell.leaderboard?.globalRank ?? null,
      totalPoints: ecell.leaderboard?.totalPoints ?? 0,
      stats: {
        wins: ecell.leaderboard?.wins ?? 0,
        topThree: ecell.leaderboard?.topThreeCount ?? 0,
      },
      participatingCompetitions: Array.from(participatingComps.values()),
      performance
    };
  }
}
