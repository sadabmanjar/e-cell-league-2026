import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = React.useId();
    const resolvedId = id || defaultId;

    return (
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={resolvedId}
            ref={ref}
            className={cn(
              "peer h-4 w-4 appearance-none rounded-sm border border-border bg-background checked:bg-primary checked:border-primary focus-ring transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <svg
            className="absolute h-3 w-3 pointer-events-none stroke-white opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <label
            htmlFor={resolvedId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary select-none cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
