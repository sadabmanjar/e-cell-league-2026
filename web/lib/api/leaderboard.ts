import { fetchClient } from "./client";

export interface LeaderboardEntry {
  rank: number;
  totalPoints: number;
  trend: "up" | "down" | "steady";
  eCell: {
    id: string;
    name: string;
    collegeName: string;
    logo?: string;
  };
  competitionScores?: {
    competitionId: string;
    competitionName: string;
    points: number;
    rank: number | null;
  }[];
  points?: number; // for competition specific
}

export const leaderboardApi = {
  getOverall: () => fetchClient<LeaderboardEntry[]>("/leaderboard/overall"),
  getByCompetition: (competitionId: string) => fetchClient<LeaderboardEntry[]>(`/leaderboard/competition/${competitionId}`),
};
