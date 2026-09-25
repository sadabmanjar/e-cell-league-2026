"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { RegistrationFormData } from "@/lib/validations/registration"
import { PassCard } from "@/components/passes/pass-card"

export function PassSelector() {
  const { setValue, watch, formState: { errors } } = useFormContext<RegistrationFormData>()
  
  const selectedPass = watch("passType");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select League Pass</h2>
        <p className="text-sm text-text-secondary">Choose the pass that fits your college's ambition.</p>
        {errors.passType?.message && (
          <p className="text-sm text-red-500 mt-2">{errors.passType.message}</p>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          className={`cursor-pointer rounded-xl transition-all ${selectedPass === "3-pass" ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
          onClick={() => {
            setValue("passType", "3-pass", { shouldValidate: true })
            // Reset competition selection when changing pass
            setValue("selectedTracks", [], { shouldValidate: true })
          }}
        >
          <PassCard
            title="3-Competition Pass"
            price="₹1,000"
            description="Entry into 3 tracks of your choice."
            eligibility="College E-Cells"
            features={[
              { text: "Entry into 3 Tracks", included: true },
              { text: "League Standings", included: true },
            ]}
          />
        </div>

        <div 
          className={`cursor-pointer rounded-xl transition-all ${selectedPass === "5-pass" ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
          onClick={() => {
            setValue("passType", "5-pass", { shouldValidate: true })
            // Auto select all for 5-pass could be handled here
            setValue("selectedTracks", ["hackathon", "pitch-lab", "quiz", "ad-mad", "dress-a-founder"], { shouldValidate: true })
          }}
        >
          <PassCard
            title="5-Competition Pass"
            price="₹1,300"
            description="Maximum points potential."
            eligibility="College E-Cells"
            isPopular
            features={[
              { text: "Entry into all 5 Tracks", included: true },
              { text: "League Standings", included: true },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
