import type { Request, Response, NextFunction } from "express";
import { PaymentService } from "./service.js";
import { createOrderSchema, verifyPaymentSchema } from "./validation.js";

export class PaymentController {
  static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }

      const data = await PaymentService.createOrder(parsed.data);
      res.json({ success: true, data });
    } catch (error: any) {
      if (error.message === "REGISTRATION_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Registration not found." });
        return;
      }
      if (error.message === "REGISTRATION_ALREADY_APPROVED" || error.message === "PAYMENT_ALREADY_COMPLETED") {
        res.status(409).json({ success: false, message: "Payment has already been completed for this registration." });
        return;
      }
      if (error.message === "RAZORPAY_ORDER_CREATION_FAILED") {
        res.status(502).json({ success: false, message: "Failed to create order with payment gateway." });
        return;
      }
      next(error);
    }
  }

  static async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = verifyPaymentSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }

      const data = await PaymentService.verifyPayment(parsed.data);
      res.json({ success: true, data });
    } catch (error: any) {
      if (error.message === "PAYMENT_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Payment record not found." });
        return;
      }
      if (error.message === "ORDER_ID_MISMATCH") {
        res.status(400).json({ success: false, message: "Order ID mismatch." });
        return;
      }
      if (error.message === "INVALID_SIGNATURE") {
        res.status(400).json({ success: false, message: "Invalid payment signature." });
        return;
      }
      next(error);
    }
  }
}
