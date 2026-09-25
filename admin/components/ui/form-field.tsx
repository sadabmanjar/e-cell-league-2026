import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  helpText?: string;
  htmlFor?: string;
  required?: boolean;
}

export function FormField({ 
  label, 
  error, 
  helpText, 
  htmlFor,
  required,
  children, 
  className, 
  ...props 
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <label 
        htmlFor={htmlFor} 
        className="text-sm font-medium leading-none text-text-primary"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}
      {!error && helpText && (
        <p className="text-sm text-text-secondary">{helpText}</p>
      )}
    </div>
  )
}
