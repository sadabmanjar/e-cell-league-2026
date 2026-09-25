import { z } from "zod";

export const upsertResultSchema = z.object({
  registrationId: z.string().uuid("Invalid registration ID"),
  score: z.number({ message: "Score is required" }).min(0, "Score cannot be negative").max(10000, "Score is unrealistically high"),
  rank: z.number().int().positive("Rank must be a positive integer").optional(),
  feedback: z.string().max(2000, "Feedback must be under 2000 characters").optional(),
});

export const bulkUpsertResultsSchema = z.object({
  roundId: z.string().uuid("Invalid round ID"),
  competitionId: z.string().uuid("Invalid competition ID"),
  results: z
    .array(upsertResultSchema)
    .min(1, "At least one result entry is required")
    .refine((results) => {
      const ranks = results.map(r => r.rank).filter(r => r !== undefined);
      return new Set(ranks).size === ranks.length;
    }, { message: "Duplicate ranks detected. Each team must have a unique rank." }),
});

export const publishResultsSchema = z.object({
  roundId: z.string().uuid("Invalid round ID"),
  competitionId: z.string().uuid("Invalid competition ID"),
});

export type UpsertResultInput = z.infer<typeof upsertResultSchema>;
export type BulkUpsertResultsInput = z.infer<typeof bulkUpsertResultsSchema>;
export type PublishResultsInput = z.infer<typeof publishResultsSchema>;
