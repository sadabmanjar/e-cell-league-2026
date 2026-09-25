"use client"
import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FilterBarProps {
  searchPlaceholder?: string
  onSearchChange?: (v: string) => void
  children?: React.ReactNode
}

export function FilterBar({ searchPlaceholder = "Search...", onSearchChange, children }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-9"
        />
      </div>
      {children && (
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-text-secondary" />
          {children}
        </div>
      )}
    </div>
  )
}
