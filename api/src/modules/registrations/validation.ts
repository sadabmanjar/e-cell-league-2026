import { z } from "zod";

export const createRegistrationSchema = z.object({
  eCellId: z.string().uuid("Invalid E-Cell ID"),
  passType: z.enum(["THREE_COMPETITION", "FIVE_COMPETITION"], {
    message: "passType must be THREE_COMPETITION or FIVE_COMPETITION",
  }),
  // IDs of competitions the team wants to register for
  competitionIds: z
    .array(z.string().uuid("Each competition ID must be a valid UUID"))
    .min(1, "At least one competition must be selected")
    .max(5, "Cannot select more than 5 competitions"),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
