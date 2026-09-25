import { z } from "zod";

export const upsertPointsConfigSchema = z.object({
  competitionId: z.string().uuid("Invalid competition ID"),
  rank: z.number().int().positive("Rank must be a positive integer"),
  points: z.number().int().min(0, "Points cannot be negative"),
  label: z.string().max(100).optional(),
});

export const bulkUpsertPointsConfigSchema = z.object({
  competitionId: z.string().uuid("Invalid competition ID"),
  configs: z
    .array(z.object({
      rank: z.number().int().positive(),
      points: z.number().int().min(0),
      label: z.string().max(100).optional(),
    }))
    .min(1, "At least one points config entry is required")
    .refine(
      items => new Set(items.map(i => i.rank)).size === items.length,
      { message: "Duplicate ranks in points configuration." }
    ),
});

export const upsertTiebreakerSchema = z.object({
  priority: z.number().int().positive("Priority must be a positive integer"),
  rule: z.enum(["MOST_WINS", "MOST_TOP_THREE", "FLAGSHIP_SCORE"], {
    message: "Invalid tiebreaker rule. Allowed: MOST_WINS, MOST_TOP_THREE, FLAGSHIP_SCORE",
  }),
  label: z.string().min(2, "Label is required"),
  isActive: z.boolean().optional().default(true),
});

export type BulkUpsertPointsConfigInput = z.infer<typeof bulkUpsertPointsConfigSchema>;
export type UpsertTiebreakerInput = z.infer<typeof upsertTiebreakerSchema>;
