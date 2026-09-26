import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma.js";

export class PaymentController {
  static async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { paymentId } = req.body;
const user = (req as Request & { user?: { id: string } }).user;
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { registration: true },
      });

      if (!payment) {
        res.status(404).json({ success: false, message: "Payment not found" });
        return;
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: "VERIFIED",
            verifiedAt: new Date(),
            verifiedBy: user?.id || "admin",
          },
        }),
        prisma.registration.update({
          where: { id: payment.registrationId },
          data: {
            status: "APPROVED",
          },
        }),
      ]);

      res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async rejectPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { paymentId, reason } = req.body;
const user = (req as Request & { user?: { id: string } }).user;
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        res.status(404).json({ success: false, message: "Payment not found" });
        return;
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: "REJECTED",
            rejectionReason: reason || "No reason provided",
            verifiedAt: new Date(),
            verifiedBy: user?.id || "admin",
          },
        }),
        prisma.registration.update({
          where: { id: payment.registrationId },
          data: {
            status: "REJECTED",
          },
        }),
      ]);

      res.json({ success: true, message: "Payment rejected successfully" });
    } catch (error) {
      next(error);
    }
  }
}
