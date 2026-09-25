import { fetchClient } from "./client";

export interface TeamListEntry {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  college: {
    name: string;
    city: string;
    state: string | null;
  };
  rank: number | null;
  totalPoints: number;
  competitions: string[];
}

export interface TeamDetail extends TeamListEntry {
  socialLinks: string | null;
  stats: {
    wins: number;
    topThree: number;
  };
  participatingCompetitions: string[];
  performance: {
    competitionName: string;
    rankAchieved: number | null;
    pointsAwarded: number;
    isPublished: boolean;
  }[];
}

export const ecellsApi = {
  getPublicTeams: () => fetchClient<TeamListEntry[]>("/ecells/public"),
  getPublicTeamBySlug: (slug: string) => fetchClient<TeamDetail>(`/ecells/public/${slug}`),
};
