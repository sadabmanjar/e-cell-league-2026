import { Router } from "express";
import { AnnouncementController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Public route for frontend
router.get("/public", AnnouncementController.getPublic);

// Admin routes
router.use(authMiddleware);

router.get("/", AnnouncementController.getAll);
router.get("/:id", AnnouncementController.getById);

router.use(roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN"]));

router.post("/", AnnouncementController.create);
router.put("/:id", AnnouncementController.update);
router.delete("/:id", AnnouncementController.delete);

export { router as announcementsRouter };
