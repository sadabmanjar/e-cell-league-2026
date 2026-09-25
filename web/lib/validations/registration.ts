import { z } from "zod";

export const ecellSchema = z.object({
  collegeName: z.string().min(2, "College name is required"),
  ecellName: z.string().min(2, "E-Cell name is required"),
  city: z.string().min(2, "City is required"),
  officialEmail: z.string().email("Invalid official email"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  socialLinks: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const coordinatorSchema = z.object({
  coordinatorName: z.string().min(2, "Name is required"),
  coordinatorEmail: z.string().email("Invalid email"),
  coordinatorPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  designation: z.string().min(2, "Designation is required"),
});

export const participantSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  collegeId: z.string().min(2, "College ID is required"),
});

export const teamSchema = z.object({
  participants: z.array(participantSchema).min(1, "At least one participant is required"),
});

export const passSchema = z.object({
  passType: z.enum(["3-pass", "5-pass"], {
    message: "Please select a pass type",
  }),
});

export const competitionSchema = z.object({
  selectedTracks: z.array(z.string()).min(1, "Select at least one track"),
});

export const registrationSchema = z.object({
  ...ecellSchema.shape,
  ...coordinatorSchema.shape,
  ...teamSchema.shape,
  ...passSchema.shape,
  ...competitionSchema.shape,
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
