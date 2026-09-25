import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = React.useId();
    const resolvedId = id || defaultId;

    return (
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={resolvedId}
            ref={ref}
            className={cn(
              "peer h-4 w-4 appearance-none rounded-full border border-border bg-background checked:border-primary focus-ring transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <span className="absolute h-2 w-2 rounded-full bg-primary pointer-events-none scale-0 peer-checked:scale-100 transition-transform" />
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
Radio.displayName = "Radio"

export { Radio }
