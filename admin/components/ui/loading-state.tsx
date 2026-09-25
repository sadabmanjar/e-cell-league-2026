import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function LoadingState({ text = "Loading...", className, ...props }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-4 text-text-secondary", className)} {...props}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && <p className="text-sm font-medium">{text}</p>}
    </div>
  )
}
