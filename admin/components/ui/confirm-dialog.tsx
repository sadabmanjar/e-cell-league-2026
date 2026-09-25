"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  confirmVariant?: "default" | "destructive"
  isDestructive?: boolean
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  isDestructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
            isDestructive ? "bg-red-500/10" : "bg-primary/10"
          )}>
            <AlertTriangle className={cn("w-5 h-5", isDestructive ? "text-red-500" : "text-primary")} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={isDestructive ? "bg-red-600 hover:bg-red-700 text-white border-red-600" : ""}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
