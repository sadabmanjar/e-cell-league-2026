import { fetchClient } from "./client";

export interface CreateRegistrationPayload {
  eCellId: string;
  passType: "SINGLE_COMPETITION" | "THREE_COMPETITION" | "ALL_ACCESS";
  participants: {
    name: string;
    email: string;
    phone: string;
    collegeIdNo: string;
  }[];
  competitionIds: string[];
}

export interface PaymentOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  eCellName: string;
  contactEmail: string;
}

export const registrationsApi = {
  // We can combine the registration creation and order creation into a flow
  register: (payload: CreateRegistrationPayload) => 
    fetchClient<{ registrationId: string }>("/registrations", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
    
  createPaymentOrder: (registrationId: string) =>
    fetchClient<PaymentOrderResponse>("/payments/create-order", {
      method: "POST",
      body: JSON.stringify({ registrationId }),
    }),

  verifyPayment: (payload: { registrationId: string; razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
    fetchClient<any>("/payments/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    })
};
