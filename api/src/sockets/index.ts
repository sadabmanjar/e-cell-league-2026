import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import { logger } from "../utils/logger.js";
import { config } from "../config/index.js";

let io: SocketIOServer | null = null;

export function initSockets(server: HttpServer): void {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.corsOrigin,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    logger.info(`[Socket] Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`[Socket] Client disconnected: ${socket.id}`);
    });
  });

  logger.info("Socket.IO initialized and ready.");
}

export function getIo(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
