import { z } from "zod";

export const createCompetitionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  format: z.string().min(2, "Format is required"),
  teamSize: z.string().min(1, "Team size is required"),
  isPublished: z.boolean().optional(),
});

export const updateCompetitionSchema = createCompetitionSchema.partial();

export const createRoundSchema = z.object({
  name: z.string().min(2, "Round name is required"),
  order: z.number().int().positive("Order must be a positive integer"),
  date: z.string().datetime().optional(),
});

export type CreateCompetitionInput = z.infer<typeof createCompetitionSchema>;
export type UpdateCompetitionInput = z.infer<typeof updateCompetitionSchema>;
export type CreateRoundInput = z.infer<typeof createRoundSchema>;
