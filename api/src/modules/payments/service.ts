import Razorpay from "razorpay";
import crypto from "crypto";
import { config } from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateOrderInput, VerifyPaymentInput } from "./validation.js";

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret,
});

export class PaymentService {
  /**
   * Creates a Razorpay order and a corresponding Payment record in the database.
   */
  static async createOrder(data: CreateOrderInput) {
    const { registrationId } = data;

    // 1. Validate registration
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { eCell: true },
    });
    if (!registration) throw new Error("REGISTRATION_NOT_FOUND");

    if (registration.status === "APPROVED") {
      throw new Error("REGISTRATION_ALREADY_APPROVED");
    }

    // 2. Check if payment already exists
    let payment = await prisma.payment.findUnique({
      where: { registrationId },
    });

    if (payment && payment.status === "SUCCESS") {
      throw new Error("PAYMENT_ALREADY_COMPLETED");
    }

    // Determine amount based on PassType (example amounts, should ideally be configured)
    const amountInRupees = registration.passType === "THREE_COMPETITION" ? 499 : 699;
    const amountInPaise = amountInRupees * 100;

    // 3. Create Razorpay Order
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${registrationId.slice(0, 10)}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      throw new Error("RAZORPAY_ORDER_CREATION_FAILED");
    }

    // 4. Upsert Payment in our DB
    payment = await prisma.payment.upsert({
      where: { registrationId },
      create: {
        registrationId,
        amount: amountInRupees, // Storing in standard units
        currency: "INR",
        status: "PENDING",
        razorpayOrderId: order.id,
      },
      update: {
        amount: amountInRupees,
        status: "PENDING",
        razorpayOrderId: order.id,
      },
    });

    return {
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      keyId: config.razorpayKeyId, // Sent to frontend so it can initialize Razorpay UI
      eCellName: registration.eCell.name,
      contactEmail: registration.eCell.officialEmail,
    };
  }

  /**
   * Verifies the Razorpay payment signature.
   * NEVER trust the frontend; always re-verify the signature server-side.
   */
  static async verifyPayment(data: VerifyPaymentInput) {
    const { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = data;

    // 1. Validate payment record exists
    const payment = await prisma.payment.findUnique({
      where: { registrationId },
    });

    if (!payment) throw new Error("PAYMENT_NOT_FOUND");
    if (payment.razorpayOrderId !== razorpayOrderId) {
      throw new Error("ORDER_ID_MISMATCH");
    }

    // 2. Generate expected signature
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpayKeySecret)
      .update(text)
      .digest("hex");

    // 3. Compare signatures safely
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpaySignature)
    );

    if (!isValid) {
      // Mark as failed if the signature is bad
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });
      throw new Error("INVALID_SIGNATURE");
    }

    // 4. Update Payment and Registration statuses atomically
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          razorpayPaymentId,
          razorpaySignature,
        },
      }),
      prisma.registration.update({
        where: { id: registrationId },
        data: { status: "APPROVED" },
      }),
    ]);

    return { success: true, message: "Payment verified successfully" };
  }
}
