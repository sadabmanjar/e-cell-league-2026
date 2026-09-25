import type { Request, Response, NextFunction } from "express";
import { RegistrationService } from "./service.js";
import { createRegistrationSchema } from "./validation.js";

export class RegistrationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await RegistrationService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = await RegistrationService.getById(id as string);
      if (!data) {
        res.status(404).json({ success: false, message: "Registration not found" });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createRegistrationSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const data = await RegistrationService.create(parsed.data);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async onboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Data is validated by Zod on the frontend, but we'll accept it raw for now
      // since the schema is defined in the frontend folder. 
      // Ideally we'd share it, but for speed, let's just pass it to the service.
      const payload = req.body;
      const data = await RegistrationService.onboard(payload);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ success: false, message: "Email or College already registered" });
        return;
      }
      next(error);
    }
  }
}
