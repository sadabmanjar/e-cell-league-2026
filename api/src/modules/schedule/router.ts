import { Router } from "express";
import { ScheduleController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Public routes
router.get("/", ScheduleController.getAll);
router.get("/:id", ScheduleController.getById);

// Admin routes
router.use(authMiddleware);
router.use(roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN"]));

router.post("/", ScheduleController.create);
router.put("/:id", ScheduleController.update);
router.delete("/:id", ScheduleController.delete);

export { router as scheduleRouter };
