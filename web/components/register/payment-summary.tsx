"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { RegistrationFormData } from "@/lib/validations/registration"
import { ShieldCheck } from "lucide-react"

export function PaymentSummary() {
  const { watch } = useFormContext<RegistrationFormData>()
  const passType = watch("passType")
  const amount = passType === "3-pass" ? "₹1,000" : "₹1,300"

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
            <span className="text-white">Total Amount</span>
            <span className="text-primary">{amount}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-primary leading-relaxed">
            Payment processing is currently in test mode. Clicking "Pay Now" will simulate a successful backend transaction and redirect you to the success page.
          </p>
        </div>
      </div>
    </div>
  )
}
