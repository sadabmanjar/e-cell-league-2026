import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { Button } from "./button"

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "An error occurred while loading this content.", 
  onRetry,
  className, 
  ...props 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)} {...props}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mb-4">
        <AlertCircle className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-secondary mb-6 max-w-sm">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>Try Again</Button>
      )}
    </div>
  )
}
