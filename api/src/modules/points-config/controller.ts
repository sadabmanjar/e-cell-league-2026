import type { Request, Response, NextFunction } from "express";
import { PointsConfigService } from "./service.js";
import { bulkUpsertPointsConfigSchema, upsertTiebreakerSchema } from "./validation.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export class PointsConfigController {

  // ── Points Config ─────────────────────────────────────────────────────────────

  static async getAllCompetitionConfigs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await PointsConfigService.getAllCompetitionConfigs();
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  static async getByCompetition(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await PointsConfigService.getByCompetition(req.params.competitionId as string);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  static async bulkUpsert(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = bulkUpsertPointsConfigSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }
      const data = await PointsConfigService.bulkUpsert(parsed.data);
      res.json({ success: true, data, message: `${data.saved} rank(s) configured.${data.warning ? " " + data.warning : ""}` });
    } catch (error: any) {
      if (error.message === "COMPETITION_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      next(error);
    }
  }

  static async deleteByCompetition(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await PointsConfigService.deleteByCompetition(req.params.competitionId as string);
      res.json({ success: true, message: "Points configuration cleared." });
    } catch (error: any) {
      if (error.message === "HAS_PUBLISHED_RESULTS") {
        res.status(409).json({ success: false, message: "Cannot clear points config for a competition with published results. Unpublish results first." });
        return;
      }
      next(error);
    }
  }

  // ── Tiebreaker Config ─────────────────────────────────────────────────────────

  static async getTiebreakers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await PointsConfigService.getTiebreakers();
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  static async upsertTiebreaker(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = upsertTiebreakerSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }
      const data = await PointsConfigService.upsertTiebreaker(parsed.data);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  static async deleteTiebreaker(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await PointsConfigService.deleteTiebreaker(req.params.id as string);
      res.json({ success: true, message: "Tiebreaker rule removed." });
    } catch (error) { next(error); }
  }
}
