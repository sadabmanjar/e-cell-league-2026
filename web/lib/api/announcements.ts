import { fetchClient } from "./client";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
  createdAt: string;
}

export const announcementsApi = {
  getPublic: () => fetchClient<Announcement[]>("/announcements/public"),
};
