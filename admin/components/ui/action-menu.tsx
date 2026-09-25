"use client"
import * as React from "react"
import { MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ActionMenuAction {
  label: string
  icon?: React.ElementType
  onClick: () => void
  isDangerous?: boolean
}

export function ActionMenu({ actions }: { actions: ActionMenuAction[] }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-md hover:bg-surface-alt transition-colors text-text-secondary hover:text-white"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-30 w-44 bg-surface border border-border rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {actions.map((action, i) => {
            const Icon = action.icon
            return (
              <button
                key={i}
                onClick={() => { action.onClick(); setOpen(false) }}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-surface-alt transition-colors",
                  action.isDangerous ? "text-red-400 hover:text-red-300" : "text-text-secondary hover:text-white"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {action.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
