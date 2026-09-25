import type { Request, Response, NextFunction } from "express";
import { CompetitionService } from "./service.js";
import { createCompetitionSchema, updateCompetitionSchema, createRoundSchema } from "./validation.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export class CompetitionController {
  // ── Competitions ─────────────────────────────────────────────────────────────

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await CompetitionService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await CompetitionService.getById(req.params.id as string);
      if (!data) { res.status(404).json({ success: false, message: "Competition not found" }); return; }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await CompetitionService.getBySlug(req.params.slug as string);
      if (!data) { res.status(404).json({ success: false, message: "Competition not found" }); return; }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createCompetitionSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }
      const data = await CompetitionService.create(parsed.data);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = updateCompetitionSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }
      const data = await CompetitionService.update(req.params.id as string, parsed.data);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await CompetitionService.delete(req.params.id as string);
      res.json({ success: true, message: "Competition deleted" });
    } catch (error: any) {
      if (error.message === "COMPETITION_HAS_RESULTS") {
        res.status(409).json({
          success: false,
          message: "This competition has official results on record. Deletion requires explicit admin override and is permanently destructive.",
        });
        return;
      }
      next(error);
    }
  }

  static async getRegisteredTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await CompetitionService.getRegisteredTeams(req.params.id as string);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  // ── Rounds ───────────────────────────────────────────────────────────────────

  static async createRound(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createRoundSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }
      const data = await CompetitionService.createRound(req.params.id as string, parsed.data);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async updateRound(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await CompetitionService.updateRound(req.params.roundId as string, req.body);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRound(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await CompetitionService.deleteRound(req.params.roundId as string);
      res.json({ success: true, message: "Round deleted" });
    } catch (error: any) {
      if (error.message === "ROUND_HAS_RESULTS") {
        res.status(409).json({
          success: false,
          message: "This round has results attached. Delete all round results first.",
        });
        return;
      }
      next(error);
    }
  }
}
