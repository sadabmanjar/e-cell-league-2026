"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CompetitionFormData {
  name: string
  slug: string
  description: string
  format: string
  teamSize: string
}

interface CompetitionFormModalProps {
  open: boolean
  initialData?: Partial<CompetitionFormData>
  onClose: () => void
  onSubmit: (data: CompetitionFormData) => void
  isLoading?: boolean
}

export function CompetitionFormModal({ open, initialData, onClose, onSubmit, isLoading }: CompetitionFormModalProps) {
  const [form, setForm] = React.useState<CompetitionFormData>({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    format: initialData?.format ?? "",
    teamSize: initialData?.teamSize ?? "",
  })

  const [errors, setErrors] = React.useState<Partial<CompetitionFormData>>({})

  React.useEffect(() => {
    if (open && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name ?? "",
        slug: initialData.slug ?? "",
        description: initialData.description ?? "",
        format: initialData.format ?? "",
        teamSize: initialData.teamSize ?? "",
      })
    }
  }, [open, initialData])

  const set = (k: keyof CompetitionFormData, v: string) => {
    setForm(prev => ({ ...prev, [k]: v }))
    // Auto-generate slug from name
    if (k === "name" && !initialData?.slug) {
      setForm(prev => ({ ...prev, name: v, slug: v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }))
    }
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: "" }))
  }

  const validate = (): boolean => {
    const errs: Partial<CompetitionFormData> = {}
    if (form.name.trim().length < 2) errs.name = "Name is required"
    if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = "Slug must be lowercase with hyphens only"
    if (form.description.trim().length < 10) errs.description = "Description must be at least 10 characters"
    if (!form.format.trim()) errs.format = "Format is required"
    if (!form.teamSize.trim()) errs.teamSize = "Team size is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{initialData?.name ? "Edit Competition" : "Create Competition"}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Competition Name <span className="text-primary">*</span></label>
            <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. BizIQ" />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Slug <span className="text-primary">*</span></label>
            <Input value={form.slug} onChange={e => set("slug", e.target.value.toLowerCase())} placeholder="e.g. biziq" />
            {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug}</p>}
            <p className="text-xs text-text-secondary mt-1">Used in public URLs. Cannot be changed after creation.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Description <span className="text-primary">*</span></label>
            <textarea
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="Describe what this competition tests..."
              rows={3}
              className="w-full bg-surface-alt border border-border rounded-md px-3 py-2 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
            />
            {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">Format <span className="text-primary">*</span></label>
              <Input value={form.format} onChange={e => set("format", e.target.value)} placeholder="e.g. Multi-round quiz" />
              {errors.format && <p className="text-xs text-red-400 mt-1">{errors.format}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">Team Size <span className="text-primary">*</span></label>
              <Input value={form.teamSize} onChange={e => set("teamSize", e.target.value)} placeholder="e.g. 2 members" />
              {errors.teamSize && <p className="text-xs text-red-400 mt-1">{errors.teamSize}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : (initialData?.name ? "Save Changes" : "Create Competition")}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
