import { Router } from "express";
import { LeaderboardController } from "./controller.js";

const router = Router();

// Public routes
router.get("/overall", LeaderboardController.getOverallLeaderboard);
router.get("/competition/:competitionId", LeaderboardController.getCompetitionLeaderboard);

export { router as leaderboardRouter };
