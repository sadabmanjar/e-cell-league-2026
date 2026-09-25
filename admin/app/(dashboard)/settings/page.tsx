"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { Plus, Trash2, Save, Info, Trophy, ArrowUpDown, GripVertical } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

interface PointsRow {
  rank: number
  points: string
  label: string
}

interface TiebreakerRow {
  id: string
  priority: number
  rule: string
  label: string
  isActive: boolean
}

const TIEBREAKER_RULES = [
  { value: "MOST_WINS", label: "Team with more 1st place finishes" },
  { value: "MOST_SECOND", label: "Team with more 2nd place finishes" },
  { value: "COMMITTEE", label: "Committee decision" },
]

const MOCK_COMPETITIONS = [
  { id: "biziq", name: "BizIQ" },
  { id: "pitch-lab", name: "The Pitch Lab" },
  { id: "madverse", name: "mADverse" },
  { id: "codex", name: "CODEX" },
  { id: "dress-a-founder", name: "Dress-A-Founder" },
]

const DEFAULT_TIEBREAKERS: TiebreakerRow[] = [
  { id: "t1", priority: 1, rule: "MOST_WINS", label: "Team with more 1st place finishes", isActive: true },
  { id: "t2", priority: 2, rule: "MOST_SECOND", label: "Team with more 2nd place finishes", isActive: true },
  { id: "t3", priority: 3, rule: "COMMITTEE", label: "Committee decision", isActive: true },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [selectedComp, setSelectedComp] = React.useState<typeof MOCK_COMPETITIONS[0] | null>(null)
  const [rows, setRows] = React.useState<PointsRow[]>([])
  const [tiebreakers, setTiebreakers] = React.useState<TiebreakerRow[]>(DEFAULT_TIEBREAKERS)
  const [isSaving, setIsSaving] = React.useState(false)
  const [clearDialog, setClearDialog] = React.useState(false)
  const [toast, setToast] = React.useState<{ msg: string; type: "success" | "error" } | null>(null)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const loadCompetition = (comp: typeof MOCK_COMPETITIONS[0]) => {
    setSelectedComp(comp)
    // Reset to 3 default ranks as a starting point when loading a competition
    setRows([
      { rank: 1, points: "", label: "Winner" },
      { rank: 2, points: "", label: "Runner-up" },
      { rank: 3, points: "", label: "3rd Place" },
    ])
    setErrors({})
  }

  const addRow = () => {
    const nextRank = rows.length > 0 ? Math.max(...rows.map(r => r.rank)) + 1 : 1
    setRows(prev => [...prev, { rank: nextRank, points: "", label: "" }])
  }

  const removeRow = (index: number) => {
    setRows(prev => prev.filter((_, i) => i !== index))
  }

  const updateRow = (index: number, field: keyof PointsRow, value: string | number) => {
    setRows(prev => prev.map((r, i) => i === index ? { ...r, [field]: value } : r))
    const key = `${index}-${field}`
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    const ranksUsed = new Set<number>()

    rows.forEach((row, i) => {
      if (isNaN(row.rank) || row.rank < 1) errs[`${i}-rank`] = "Rank must be ≥ 1"
      else if (ranksUsed.has(row.rank)) errs[`${i}-rank`] = `Duplicate rank ${row.rank}`
      else ranksUsed.add(row.rank)

      const pts = parseInt(row.points)
      if (row.points === "" || isNaN(pts) || pts < 0) errs[`${i}-points`] = "Points must be ≥ 0"
    })

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) { showToast("Fix validation errors before saving.", "error"); return }
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 800))
    showToast(`Points config saved for ${selectedComp?.name}.`)
    setIsSaving(false)
  }

  const handleClear = async () => {
    setClearDialog(false)
    setRows([])
    showToast(`Points config cleared for ${selectedComp?.name}.`)
  }

  const toggleTiebreaker = (id: string) => {
    setTiebreakers(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t))
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium border animate-in slide-in-from-bottom-2 duration-200 ${
          toast.type === "success" ? "bg-green-950 text-green-400 border-green-500/30" : "bg-red-950 text-red-400 border-red-500/30"
        }`}>
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-white">League Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Configure the points system and tie-breaking rules for the League.</p>
      </div>

      {/* Important Note */}
      <div className="flex gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
        <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-400 mb-1">Points Distribution Not Yet Finalized</p>
          <p className="text-sm text-text-secondary">
            Official E-Cell League 2026 points values have not been confirmed. Configure this section only once the official distribution is approved. Publishing results before configuration will award 0 points to all teams.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Competition Selector */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Competition
          </h3>
          <div className="space-y-2">
            {MOCK_COMPETITIONS.map(comp => (
              <div
                key={comp.id}
                onClick={() => loadCompetition(comp)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedComp?.id === comp.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                }`}
              >
                <p className={`text-sm font-medium ${selectedComp?.id === comp.id ? "text-white" : "text-text-secondary"}`}>{comp.name}</p>
                {selectedComp?.id === comp.id && (
                  <p className="text-xs text-primary mt-0.5">Editing configuration</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Points Config Editor */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {selectedComp ? `Points Config — ${selectedComp.name}` : "Points Configuration"}
            </h3>
            {selectedComp && rows.length > 0 && (
              <button
                onClick={() => setClearDialog(true)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>

          {!selectedComp ? (
            <div className="py-12 text-center border border-dashed border-border rounded-lg">
              <Trophy className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <p className="text-sm text-text-secondary">Select a competition to configure its points.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-secondary uppercase border-b border-border">
                    <tr>
                      <th className="pb-3 font-medium w-20">Rank</th>
                      <th className="pb-3 font-medium w-32">Points <span className="text-primary">*</span></th>
                      <th className="pb-3 font-medium">Label</th>
                      <th className="pb-3 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{row.rank}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3">
                          <div>
                            <input
                              type="number"
                              value={row.points}
                              min="0"
                              onChange={e => updateRow(i, "points", e.target.value)}
                              placeholder="e.g. 500"
                              className={`w-full bg-background border rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors ${
                                errors[`${i}-points`] ? "border-red-500" : "border-border"
                              }`}
                            />
                            {errors[`${i}-points`] && <p className="text-[10px] text-red-400 mt-0.5">{errors[`${i}-points`]}</p>}
                          </div>
                        </td>
                        <td className="py-2.5 pr-3">
                          <input
                            type="text"
                            value={row.label}
                            onChange={e => updateRow(i, "label", e.target.value)}
                            placeholder="e.g. Winner"
                            className="w-full bg-background border border-border rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                          />
                        </td>
                        <td className="py-2.5">
                          <button onClick={() => removeRow(i)} className="p-1 text-text-secondary hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rows.length === 0 && (
                <p className="text-sm text-text-secondary py-4 text-center">No ranks configured. Add rows below.</p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="outline" size="sm" onClick={addRow}>
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Rank
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isSaving || rows.length === 0}>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  {isSaving ? "Saving..." : "Save Configuration"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tiebreaker Config */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpDown className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-white">Tiebreaker Rules</h3>
        </div>
        <p className="text-sm text-text-secondary mb-5">
          When two E-Cells have equal League Points, these rules are applied in priority order (top = first checked) to determine ranking.
        </p>

        <div className="space-y-3">
          {tiebreakers.map((tb, i) => (
            <div key={tb.id} className="flex items-center gap-4 p-4 bg-surface-alt border border-border rounded-lg">
              <div className="flex items-center gap-2 text-text-secondary">
                <GripVertical className="w-4 h-4" />
                <span className="text-xs font-mono bg-background px-1.5 py-0.5 rounded border border-border">P{tb.priority}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-white">{tb.label}</p>
                <p className="text-xs text-text-secondary font-mono">{tb.rule}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={tb.isActive ? "active" : "draft"} />
                <button
                  onClick={() => toggleTiebreaker(tb.id)}
                  className="text-xs text-text-secondary hover:text-white transition-colors"
                >
                  {tb.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => showToast("Tiebreaker config saved.")}>
            <Save className="w-3.5 h-3.5 mr-1.5" /> Save Tiebreakers
          </Button>
        </div>
      </div>

      {/* Clear Dialog */}
      <ConfirmDialog
        open={clearDialog}
        title={`Clear Points Config for ${selectedComp?.name}?`}
        description="This will remove all rank-to-points mappings for this competition. Results that have already been published will retain their previously calculated points until they are re-published."
        confirmLabel="Clear Configuration"
        isDestructive
        onConfirm={handleClear}
        onCancel={() => setClearDialog(false)}
      />
    </div>
  )
}
