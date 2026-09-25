/**
 * Global error-handling middleware.
 * Must be registered last in the Express middleware chain.
 *
 * Security rules:
 * - In production, 500 errors return a generic message — never internal error text or stack traces.
 * - Known operational errors (those with an explicit statusCode < 500) return their message safely.
 * - Zod validation errors (passed via next()) are handled as 400s.
 */
import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/logger.js";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
}

const IS_PRODUCTION = process.env["NODE_ENV"] === "production";

export const errorHandler: ErrorRequestHandler = (err: AppError, _req, res, _next) => {
  // Handle Zod validation errors that bypassed safeParse (shouldn't happen after our fixes,
  // but kept as a safety net).
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten(),
    });
    return;
  }

  const status = err.statusCode ?? 500;

  // Always log the full error server-side for debugging.
  logger.error(`${status} — ${err.message}`, { stack: err.stack });

  // For 5xx errors in production, return a generic message to avoid leaking internals.
  // For known operational errors (4xx or errors with an explicit statusCode), return the message.
  const clientMessage =
    status >= 500 && IS_PRODUCTION
      ? "An unexpected error occurred. Please try again later."
      : err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message: clientMessage,
  });
};
