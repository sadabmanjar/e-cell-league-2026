/**
 * Express application entry point.
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initSockets } from "./sockets/index.js";
import { logger } from "./utils/logger.js";

// ── Module routers ────────────────────────────────────────────────────────────
import { authRouter } from "./modules/auth/router.js";
import { ecellsRouter } from "./modules/ecells/router.js";
import { participantsRouter } from "./modules/participants/router.js";
import { registrationsRouter } from "./modules/registrations/router.js";
import { competitionsRouter } from "./modules/competitions/router.js";
import { resultsRouter } from "./modules/results/router.js";
import { leaderboardRouter } from "./modules/leaderboard/router.js";
import { paymentsRouter } from "./modules/payments/router.js";
import { scheduleRouter } from "./modules/schedule/router.js";
import { announcementsRouter } from "./modules/announcements/router.js";
import { pointsConfigRouter } from "./modules/points-config/router.js";

// ── App setup ─────────────────────────────────────────────────────────────────
const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));

// Log format: use 'combined' (standard Apache format) in production to avoid
// logging sensitive request bodies; use 'dev' for local development only.
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

app.use(cookieParser()); // Required for req.cookies?.token in auth middleware
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent payload attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Global limiter: 200 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

// Auth limiter: 10 login attempts per 15 minutes per IP (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts, please try again in 15 minutes." },
  skipSuccessfulRequests: true, // Only count failed/errored requests
});

app.use(globalLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
// Do NOT expose env, version, or internal details on the public health endpoint.
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api/auth/login", authLimiter); // Apply strict limiter to login before the router
app.use("/api/auth", authRouter);
app.use("/api/ecells", ecellsRouter);
app.use("/api/participants", participantsRouter);
app.use("/api/registrations", registrationsRouter);
app.use("/api/competitions", competitionsRouter);
app.use("/api/results", resultsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/points-config", pointsConfigRouter);

// ── Error handler (must be last) ──────────────────────────────────────────────
app.use(errorHandler);

// ── HTTP server + sockets ─────────────────────────────────────────────────────
const server = createServer(app);
initSockets(server);

server.listen(config.port, () => {
  logger.info(`API server running on http://localhost:${config.port} [${config.nodeEnv}]`);
});

export { app };
