import { z } from "zod";

export const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("LOW"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updateAnnouncementSchema = announcementSchema.partial();
