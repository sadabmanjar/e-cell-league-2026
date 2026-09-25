/**
 * JWT utility functions.
 *
 * Payload is typed explicitly — no `any` allowed.
 * The secret is always read from config (which has already validated it at startup).
 */
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export interface JwtPayload {
  id: string;
  role: string;
}

/**
 * Signs a JWT with the application secret. Default expiry: 1 day.
 */
export const generateToken = (payload: JwtPayload, expiresIn = "1d"): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn as any });
};

/**
 * Verifies a JWT and returns the typed payload, or `null` if invalid/expired.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
};
