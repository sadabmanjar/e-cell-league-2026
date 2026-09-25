import { Router } from "express";
import { RegistrationController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

const adminRead = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN", "COMPETITION_MANAGER"])];

router.get("/", ...adminRead, RegistrationController.getAll);
router.get("/:id", ...adminRead, RegistrationController.getById);

// Public onboarding
router.post("/onboard", RegistrationController.onboard);

// For internal creation
router.post("/", RegistrationController.create);

export { router as registrationsRouter };
