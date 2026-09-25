import { fetchClient } from "./client";

export interface Competition {
  id: string;
  name: string;
  slug: string;
  description: string;
  format?: string;
  teamSize?: string;
}

export const competitionsApi = {
  getPublic: () => fetchClient<Competition[]>("/competitions/public"),
  getBySlug: (slug: string) => fetchClient<Competition>(`/competitions/public/${slug}`),
};
