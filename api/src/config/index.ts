/**
 * Application configuration.
 * Validates ALL required environment variables at startup using Zod.
 * The server will refuse to start if any required variable is missing or malformed.
 */
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((v) => Number(v ?? "4000")),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long — use a strong random value"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN must be provided").default("http://localhost:3000"),
  RAZORPAY_KEY_ID: z.string().min(1, "RAZORPAY_KEY_ID is required"),
  RAZORPAY_KEY_SECRET: z.string().min(1, "RAZORPAY_KEY_SECRET is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  console.error(`\n❌ Invalid environment configuration:\n${issues}\n`);
  process.exit(1);
}

export const config = {
  port: parsed.data.PORT,
  nodeEnv: parsed.data.NODE_ENV,
  databaseUrl: parsed.data.DATABASE_URL,
  jwtSecret: parsed.data.JWT_SECRET,
  corsOrigin: parsed.data.CORS_ORIGIN.split(",").map(url => url.trim()),
  razorpayKeyId: parsed.data.RAZORPAY_KEY_ID,
  razorpayKeySecret: parsed.data.RAZORPAY_KEY_SECRET,
} as const;
