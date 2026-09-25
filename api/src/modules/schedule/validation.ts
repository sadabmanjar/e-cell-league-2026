import { z } from "zod";

export const scheduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  competitionId: z.string().uuid().optional().nullable(),
  roundId: z.string().uuid().optional().nullable(),
  date: z.string().datetime(), // ISO string
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  venue: z.string().optional(),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"]).default("UPCOMING"),
});

export const updateScheduleSchema = scheduleSchema.partial();
