import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Public auth routes
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

// Protected routes
router.get("/me", authMiddleware, AuthController.me);

// Example of a protected admin route requiring SUPER_ADMIN role
router.get(
  "/system-status", 
  authMiddleware, 
  roleMiddleware(["SUPER_ADMIN"]), 
  (req, res) => {
    res.json({ success: true, message: "System is running optimally", data: { version: "1.0.0" } });
  }
);

export const authRoutes = router;
