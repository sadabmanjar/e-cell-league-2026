import { Router } from "express";
import { PaymentController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const router = Router();

// Only Admins can verify manual QR payments
const adminOnly = [authMiddleware, roleMiddleware(["SUPER_ADMIN", "EVENT_ADMIN"])];

router.post("/verify", ...adminOnly, PaymentController.verifyPayment);
router.post("/reject", ...adminOnly, PaymentController.rejectPayment);

export { router as paymentsRouter };
