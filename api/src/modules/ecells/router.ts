import { Router } from "express";
import { EcellController } from "./controller.js";

const router = Router();

// Public routes for E-Cells / Teams
router.get("/public", EcellController.getPublicTeams);
router.get("/public/:slug", EcellController.getPublicTeamBySlug);

export { router as ecellsRouter };
