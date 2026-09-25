import { z } from "zod";

export const createOrderSchema = z.object({
  registrationId: z.string().uuid("Invalid registration ID"),
});

export const verifyPaymentSchema = z.object({
  registrationId: z.string().uuid("Invalid registration ID"),
  razorpayOrderId: z.string().min(1, "Razorpay Order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay Payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay Signature is required"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
