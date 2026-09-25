"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { RegistrationFormData } from "@/lib/validations/registration"
import { Checkbox } from "@/components/ui/checkbox"
import { TRACKS } from "@/data/league"

export function CompetitionSelector() {
  const { watch, setValue, formState: { errors } } = useFormContext<RegistrationFormData>()
  
  const selectedPass = watch("passType");
  const selectedTracks = watch("selectedTracks") || [];
  
  const limit = selectedPass === "3-pass" ? 3 : 5;

  const tracks = TRACKS.map(t => ({
    id: t.id,
    name: t.name,
    desc: t.originalEvent
  }));

  const handleToggle = (id: string) => {
    if (selectedPass === "5-pass") return; // 5-pass has all selected by default

    const current = [...selectedTracks];
    const index = current.indexOf(id);
    
    if (index > -1) {
      current.splice(index, 1);
      setValue("selectedTracks", current, { shouldValidate: true });
    } else {
      if (current.length < limit) {
        current.push(id);
        setValue("selectedTracks", current, { shouldValidate: true });
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select Competitions</h2>
        <p className="text-sm text-text-secondary">
          You have selected the {selectedPass === "3-pass" ? "3-Track" : "5-Track"} Pass.
        </p>
        {errors.selectedTracks?.message && (
          <p className="text-sm text-red-500 mt-2">{errors.selectedTracks.message}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {tracks.map(track => {
          const isSelected = selectedTracks.includes(track.id);
          const isDisabled = selectedPass === "5-pass" || (!isSelected && selectedTracks.length >= limit);
          
          return (
            <div 
              key={track.id}
              className={`flex items-start p-4 rounded-lg border ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-surface'} ${isDisabled && selectedPass !== '5-pass' ? 'opacity-50' : 'cursor-pointer'}`}
              onClick={() => handleToggle(track.id)}
            >
              <Checkbox 
                checked={isSelected}
                disabled={isDisabled}
                className="mt-1 pointer-events-none"
              />
              <div className="ml-3">
                <p className="font-medium text-text-primary">{track.name}</p>
                <p className="text-sm text-text-secondary">{track.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      {selectedPass === "3-pass" && (
        <div className="p-4 rounded-lg bg-surface-alt border border-border mt-6">
          <p className="text-sm text-text-secondary">
            Selected: <span className="font-bold text-white">{selectedTracks.length}</span> / {limit}
          </p>
        </div>
      )}
    </div>
  )
}
