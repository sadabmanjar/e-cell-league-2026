import type { Request, Response, NextFunction } from "express";
import { EcellService } from "./service.js";

export class EcellController {
  static async getPublicTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await EcellService.getPublicTeams();
      res.json({ success: true, data: teams });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicTeamBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const team = await EcellService.getPublicTeamBySlug(req.params.slug as string);
      res.json({ success: true, data: team });
    } catch (error: any) {
      if (error.message === "TEAM_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Team not found" });
        return;
      }
      next(error);
    }
  }
}
