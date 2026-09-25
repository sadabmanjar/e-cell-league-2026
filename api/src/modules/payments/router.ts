import { Router } from "express";
import { PaymentController } from "./controller.js";

const router = Router();

// Public routes (used during registration flow)
router.post("/create-order", PaymentController.createOrder);
router.post("/verify", PaymentController.verifyPayment);

export { router as paymentsRouter };
