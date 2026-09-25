import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";
import { prisma } from "../lib/prisma.js";

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      res.status(401).json({ success: false, message: "Invalid or expired token" });
      return;
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true },
    });

    if (!admin) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    // Log internally but never expose details to the client
    next(error);
  }
};
