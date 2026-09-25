"use client"
import * as React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegistrationFormData } from "@/lib/validations/registration"
import { Plus, Trash2 } from "lucide-react"

export function ParticipantForm() {
  const { register, control, formState: { errors } } = useFormContext<RegistrationFormData>()
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  })

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Team Details</h2>
        <p className="text-sm text-text-secondary">Add core participants who will represent the E-Cell.</p>
      </div>
      
      {errors.participants?.root?.message && (
        <p className="text-sm text-red-500 mb-4">{errors.participants.root.message}</p>
      )}
      
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-border rounded-lg bg-surface relative">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h3 className="text-sm font-semibold text-white">Participant {index + 1}</h3>
              {fields.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Full Name" required error={errors.participants?.[index]?.name?.message}>
                <Input placeholder="Name" {...register(`participants.${index}.name` as const)} />
              </FormField>
              <FormField label="Email" required error={errors.participants?.[index]?.email?.message}>
                <Input type="email" placeholder="Email" {...register(`participants.${index}.email` as const)} />
              </FormField>
              <FormField label="Phone" required error={errors.participants?.[index]?.phone?.message}>
                <Input type="tel" placeholder="Phone" {...register(`participants.${index}.phone` as const)} />
              </FormField>
              <FormField label="College ID" required error={errors.participants?.[index]?.collegeId?.message}>
                <Input placeholder="ID Number" {...register(`participants.${index}.collegeId` as const)} />
              </FormField>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => append({ name: "", email: "", phone: "", collegeId: "" })}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Participant
      </Button>
    </div>
  )
}
