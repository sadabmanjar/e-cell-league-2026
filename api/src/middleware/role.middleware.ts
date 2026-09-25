import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";

type AdminRole = "SUPER_ADMIN" | "EVENT_ADMIN" | "COMPETITION_MANAGER" | "SCORE_MANAGER";

export const roleMiddleware = (allowedRoles: AdminRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.admin) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.admin.role as AdminRole)) {
      res.status(403).json({ 
        success: false, 
        message: "Forbidden: You do not have the required permissions for this action" 
      });
      return;
    }

    next();
  };
};
