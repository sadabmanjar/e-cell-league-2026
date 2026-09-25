import { Router } from "express";
import { PointsConfigController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

const superAdminOnly = [authMiddleware, roleMiddleware(["SUPER_ADMIN"])];
const adminAccess = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN"])];

// ── Points Configuration ──────────────────────────────────────────────────────
// List all configs across competitions (admin read)
router.get("/", ...adminAccess, PointsConfigController.getAllCompetitionConfigs);

// Get config for a specific competition
router.get("/competition/:competitionId", ...adminAccess, PointsConfigController.getByCompetition);

// Bulk-upsert config for a competition (replaces atomically)
router.put("/competition/:competitionId", ...superAdminOnly, PointsConfigController.bulkUpsert);

// Clear config for a competition
router.delete("/competition/:competitionId", ...superAdminOnly, PointsConfigController.deleteByCompetition);

// ── Tiebreaker Configuration ──────────────────────────────────────────────────
router.get("/tiebreakers", ...adminAccess, PointsConfigController.getTiebreakers);
router.put("/tiebreakers", ...superAdminOnly, PointsConfigController.upsertTiebreaker);
router.delete("/tiebreakers/:id", ...superAdminOnly, PointsConfigController.deleteTiebreaker);

export { router as pointsConfigRouter };
