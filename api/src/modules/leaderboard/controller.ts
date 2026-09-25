import type { Request, Response, NextFunction } from "express";
import { LeaderboardService } from "./service.js";

export class LeaderboardController {
  static async getOverallLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await LeaderboardService.getOverallLeaderboard();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getCompetitionLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { competitionId } = req.params;
      const data = await LeaderboardService.getCompetitionLeaderboard(competitionId as string);
      res.json({ success: true, data });
    } catch (error: any) {
      if (error.message === "COMPETITION_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Competition not found" });
        return;
      }
      next(error);
    }
  }
}
