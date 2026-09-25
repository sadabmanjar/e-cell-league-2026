"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { RegistrationFormData } from "@/lib/validations/registration"

export function EcellDetails() {
  const { register, formState: { errors } } = useFormContext<RegistrationFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">E-Cell Details</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="College Name" required error={errors.collegeName?.message}>
          <Input placeholder="Enter college name" {...register("collegeName")} />
        </FormField>
        
        <FormField label="E-Cell Name" required error={errors.ecellName?.message}>
          <Input placeholder="Enter E-Cell name" {...register("ecellName")} />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="City" required error={errors.city?.message}>
          <Input placeholder="City" {...register("city")} />
        </FormField>
        
        <FormField label="Official Email" required error={errors.officialEmail?.message}>
          <Input type="email" placeholder="ecell@college.edu" {...register("officialEmail")} />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Contact Number" required error={errors.contactNumber?.message}>
          <Input type="tel" placeholder="+91" {...register("contactNumber")} />
        </FormField>
        
        <FormField label="Social Links (Optional)" error={errors.socialLinks?.message}>
          <Input placeholder="LinkedIn or Website URL" {...register("socialLinks")} />
        </FormField>
      </div>
    </div>
  )
}
