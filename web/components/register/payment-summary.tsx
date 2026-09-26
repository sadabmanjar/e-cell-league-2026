"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { RegistrationFormData } from "@/lib/validations/registration"
import { ShieldCheck, QrCode } from "lucide-react"

export function PaymentSummary() {
  const { watch, register, formState: { errors } } = useFormContext<RegistrationFormData>()
  const passType = watch("passType")
  const amount = passType === "3-pass" ? "₹1,000" : "₹1,300"
  
  const qrUrl = process.env.NEXT_PUBLIC_PAYMENT_QR_URL || "https://placehold.co/400x400/png?text=Placeholder+QR\\n(Upload+Official+QR)";

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Payment</h2>
        <p className="text-sm text-text-secondary">Complete your registration by processing the payment.</p>
      </div>
      
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 border-b border-border pb-4">Order Summary</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">{passType === "3-pass" ? "3-Competition Pass" : "5-Competition Pass"}</span>
            <span className="font-medium text-white">{amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Taxes & Fees</span>
            <span className="font-medium text-white">Included</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t border-border pt-4 mt-4">
            <span className="text-white">Total Payable</span>
            <span className="text-primary">{amount}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-6 bg-background rounded-xl border border-border mb-6">
          <QrCode className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm text-text-primary mb-4 font-medium">Scan to Pay</p>
          <img src={qrUrl} alt="Payment QR Code" className="w-48 h-48 rounded-lg mb-2 object-cover bg-white" />
          <p className="text-xs text-text-secondary text-center mt-2 max-w-xs">
            Make the payment using any UPI app. Do not close this page until you enter the UTR below.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium text-white">UTR / Transaction Reference No. <span className="text-primary">*</span></label>
          <input 
            {...register("utr")}
            placeholder="e.g. 31234567890" 
            className="w-full bg-background border border-border rounded-lg p-3 text-white focus:outline-none focus:border-primary"
          />
          {errors.utr && <p className="text-xs text-red-500">{errors.utr.message}</p>}
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-primary leading-relaxed">
            Your registration will be pending manual verification. Once the UTR is verified by our team, your registration will be confirmed.
          </p>
        </div>
      </div>
    </div>
  )
}
