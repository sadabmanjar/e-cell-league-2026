import { Router } from "express";
import { ResultController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Roles allowed to manage results
const scoreManagers = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "COMPETITION_MANAGER", "SCORE_MANAGER"])];
const adminOnly = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN", "COMPETITION_MANAGER"])];

// GET results for a specific competition + round
router.get("/competition/:competitionId/round/:roundId", ...scoreManagers, ResultController.getByRound);

// Save scores as DRAFT (create or update)
router.put("/bulk", ...scoreManagers, ResultController.bulkUpsert);

// Publish all draft results for a round (affects leaderboard trigger)
router.post("/publish", ...adminOnly, ResultController.publishResults);

// Revert published results to draft
router.post("/unpublish", ...adminOnly, ResultController.unpublishResults);

// Delete a single DRAFT result
router.delete("/:resultId", ...scoreManagers, ResultController.deleteResult);

export { router as resultsRouter };
