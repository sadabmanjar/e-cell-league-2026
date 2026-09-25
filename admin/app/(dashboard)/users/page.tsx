import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <SectionHeading title="Users" />
      <div className="p-6 bg-surface border border-border rounded-xl">
        <p className="text-text-secondary">Manage users here.</p>
      </div>
    </div>
  )
}
