import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthService } from "./auth.service.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

const loginSchema = z.object({
  email: z.string().email("A valid email address is required"),
  password: z.string().min(1, "Password is required"),
});

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const result = await AuthService.login(parsed.data.email, parsed.data.password);

      // Set HTTP-only cookie — JS cannot access it (XSS protection)
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env["NODE_ENV"] === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token: result.token,
        user: result.admin,
      });
    } catch (error: unknown) {
      // Use a consistent error code so we don't leak which field failed
      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        res.status(401).json({ success: false, message: "Invalid email or password" });
        return;
      }
      next(error);
    }
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  }

  static async me(req: AuthRequest, res: Response): Promise<void> {
    // req.admin is set by authMiddleware — only safe, pre-selected fields are present
    res.status(200).json({
      success: true,
      data: req.admin,
    });
  }
}
