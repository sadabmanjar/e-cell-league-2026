import { Router } from "express";
import { ParticipantController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Participant PII (name, email, phone, college ID) is sensitive — admin-only access.
const adminRead = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN", "COMPETITION_MANAGER"])];

router.get("/", ...adminRead, ParticipantController.getAll);
router.get("/:id", ...adminRead, ParticipantController.getById);

// Creating participants requires authentication
router.post("/", authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN"]), ParticipantController.create);

export { router as participantsRouter };
