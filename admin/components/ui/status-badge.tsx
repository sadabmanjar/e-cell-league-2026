"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type StatusVariant = "approved" | "pending" | "rejected" | "active" | "draft" | "completed"

const variantStyles: Record<StatusVariant, string> = {
  approved: "bg-green-500/10 text-green-500 border-green-500/20",
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
}

export function StatusBadge({ status }: { status: StatusVariant }) {
  return (
    <span className={cn(
      "px-2 py-0.5 text-[10px] font-semibold rounded-full border uppercase tracking-wider",
      variantStyles[status] ?? variantStyles.draft
    )}>
      {status}
    </span>
  )
}
