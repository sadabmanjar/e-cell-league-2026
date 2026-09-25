import { z } from "zod";

// Indian mobile: optional country code then 10 digits
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const createParticipantSchema = z.object({
  registrationId: z.string().uuid("Invalid registration ID"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .email("A valid email address is required")
    .max(254, "Email is too long")
    .toLowerCase(),
  phone: z.string().regex(phoneRegex, "A valid Indian mobile number is required"),
  collegeIdNo: z
    .string()
    .min(1, "College ID number is required")
    .max(50, "College ID number is too long"),
});

export type CreateParticipantInput = z.infer<typeof createParticipantSchema>;
