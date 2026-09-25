"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { RegistrationFormData } from "@/lib/validations/registration"

export function CoordinatorDetails() {
  const { register, formState: { errors } } = useFormContext<RegistrationFormData>()

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Coordinator Details</h2>
        <p className="text-sm text-text-secondary">Primary point of contact for League communications.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Full Name" required error={errors.coordinatorName?.message}>
          <Input placeholder="Coordinator name" {...register("coordinatorName")} />
        </FormField>
        
        <FormField label="Email Address" required error={errors.coordinatorEmail?.message}>
          <Input type="email" placeholder="name@college.edu" {...register("coordinatorEmail")} />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Phone Number" required error={errors.coordinatorPhone?.message}>
          <Input type="tel" placeholder="+91" {...register("coordinatorPhone")} />
        </FormField>
        
        <FormField label="Designation" required error={errors.designation?.message}>
          <Input placeholder="e.g. President, Secretary" {...register("designation")} />
        </FormField>
      </div>
    </div>
  )
}
