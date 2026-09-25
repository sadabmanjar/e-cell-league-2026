import { Router } from "express";
import { CompetitionController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// ── Public routes (consumed by web frontend) ──────────────────────────────────
router.get("/", CompetitionController.getAll);
router.get("/slug/:slug", CompetitionController.getBySlug);
router.get("/:id", CompetitionController.getById);
router.get("/:id/teams", CompetitionController.getRegisteredTeams);

// ── Protected Admin routes ────────────────────────────────────────────────────
const adminOnly = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN", "COMPETITION_MANAGER"])];
const superOnly = [authMiddleware, roleMiddleware(["SUPER_ADMIN"])];

router.post("/", ...adminOnly, CompetitionController.create);
router.patch("/:id", ...adminOnly, CompetitionController.update);
router.delete("/:id", ...superOnly, CompetitionController.delete);

// ── Rounds sub-resource ───────────────────────────────────────────────────────
router.post("/:id/rounds", ...adminOnly, CompetitionController.createRound);
router.patch("/:id/rounds/:roundId", ...adminOnly, CompetitionController.updateRound);
router.delete("/:id/rounds/:roundId", ...adminOnly, CompetitionController.deleteRound);

export { router as competitionsRouter };
