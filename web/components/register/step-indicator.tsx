"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                  isCompleted ? "bg-primary border-primary text-white" : 
                  isCurrent ? "bg-background border-primary text-primary" : 
                  "bg-background border-border text-text-secondary"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
              </div>
              <span className={cn(
                "absolute top-10 text-[10px] font-medium whitespace-nowrap hidden md:block",
                isCompleted || isCurrent ? "text-white" : "text-text-secondary"
              )}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
