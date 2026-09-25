import type { Request, Response, NextFunction } from "express";
import { ParticipantService } from "./service.js";
import { createParticipantSchema } from "./validation.js";

export class ParticipantController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await ParticipantService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = await ParticipantService.getById(id as string);
      if (!data) {
        res.status(404).json({ success: false, message: "Participant not found" });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createParticipantSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const data = await ParticipantService.create(parsed.data);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
