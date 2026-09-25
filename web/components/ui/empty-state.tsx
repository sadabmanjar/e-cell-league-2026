import * as React from "react"
import { cn } from "@/lib/utils"
import { FolderOpen } from "lucide-react"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ 
  title = "No data found", 
  description = "There is nothing to display here at the moment.", 
  icon,
  action,
  className, 
  ...props 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed border-border bg-surface-alt/50", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface mb-4 text-text-secondary">
        {icon || <FolderOpen className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-secondary mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  )
}
