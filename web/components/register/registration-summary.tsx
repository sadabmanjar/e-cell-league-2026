"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { RegistrationFormData } from "@/lib/validations/registration"

export function RegistrationSummary() {
  const { watch } = useFormContext<RegistrationFormData>()
  const data = watch()

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Review Registration</h2>
        <p className="text-sm text-text-secondary">Please verify all details before proceeding to payment.</p>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 border border-border rounded-lg bg-surface">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-border pb-2">E-Cell Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-text-secondary">College:</span> <p className="text-white">{data.collegeName}</p></div>
            <div><span className="text-text-secondary">E-Cell Name:</span> <p className="text-white">{data.ecellName}</p></div>
            <div><span className="text-text-secondary">City:</span> <p className="text-white">{data.city}</p></div>
            <div><span className="text-text-secondary">Email:</span> <p className="text-white">{data.officialEmail}</p></div>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg bg-surface">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-border pb-2">Coordinator</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-text-secondary">Name:</span> <p className="text-white">{data.coordinatorName}</p></div>
            <div><span className="text-text-secondary">Phone:</span> <p className="text-white">{data.coordinatorPhone}</p></div>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg bg-surface">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-border pb-2">Registration Pass</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Selected Pass:</span> 
            <p className="font-bold text-primary">{data.passType === "3-pass" ? "3-Competition Pass" : "5-Competition Pass"}</p>
          </div>
          <div className="mt-4">
            <span className="text-text-secondary text-sm">Selected Tracks:</span> 
            <div className="flex flex-wrap gap-2 mt-2">
              {data.selectedTracks?.map(track => (
                <span key={track} className="px-2 py-1 bg-surface-alt rounded text-xs text-white border border-border">
                  {track}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
