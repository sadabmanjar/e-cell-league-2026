"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { FilterBar } from "@/components/ui/filter-bar"
import { fetchClient } from "@/lib/api-client"
import {
  Trophy, ChevronRight, Save, CheckCircle,
  RotateCcw, Info, Activity
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type ResultStatus = "DRAFT" | "PUBLISHED"

interface TeamRow {
  registrationId: string
  collegeName: string
  eCellName: string
  score: string
  rank: string
  feedback: string
  status: ResultStatus
}

interface ApiRound { id: string; name: string; order: number }
interface ApiCompetition { id: string; name: string; rounds: ApiRound[] }

// ── Main Component ────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const [competitions, setCompetitions] = React.useState<ApiCompetition[]>([])
  const [loadingComps, setLoadingComps] = React.useState(true)
  const [selectedComp, setSelectedComp] = React.useState<ApiCompetition | null>(null)
  const [selectedRound, setSelectedRound] = React.useState<ApiRound | null>(null)
  const [rows, setRows] = React.useState<TeamRow[]>([])
  const [loadingRows, setLoadingRows] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  const [isPublishing, setIsPublishing] = React.useState(false)
  const [isUnpublishing, setIsUnpublishing] = React.useState(false)
  const [publishDialog, setPublishDialog] = React.useState(false)
  const [unpublishDialog, setUnpublishDialog] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [toast, setToast] = React.useState<{ msg: string; type: "success" | "error" } | null>(null)

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Load competitions from API
  React.useEffect(() => {
    const load = async () => {
      try {
        setLoadingComps(true)
        const res = await fetchClient<{ success: boolean; data: ApiCompetition[] }>("/competitions")
        setCompetitions(res.data || [])
      } catch {
        showToast("Failed to load competitions", "error")
      } finally {
        setLoadingComps(false)
      }
    }
    load()
  }, [])

  const loadRound = async (comp: ApiCompetition, round: ApiRound) => {
    setSelectedComp(comp)
    setSelectedRound(round)
    setErrors({})
    setRows([])

    try {
      setLoadingRows(true)
      // Fetch existing results for this competition + round
      const res = await fetchClient<{ success: boolean; data: any[] }>(
        `/results/competition/${comp.id}/round/${round.id}`
      )
      const results = res.data || []

      // Also fetch the registered teams for this competition
      const teamsRes = await fetchClient<{ success: boolean; data: any[] }>(
        `/competitions/${comp.id}/teams`
      )
      const teams = teamsRes.data || []

      // Merge teams with any existing results
      const merged: TeamRow[] = teams.map((team: any) => {
        const existing = results.find((r: any) => r.registrationId === team.registrationId)
        return {
          registrationId: team.registrationId,
          collegeName: team.eCell?.college?.name || "Unknown",
          eCellName: team.eCell?.name || "Unknown",
          score: existing?.score?.toString() || "",
          rank: existing?.rankAchieved?.toString() || "",
          feedback: existing?.feedback || "",
          status: existing?.status || "DRAFT",
        }
      })
      setRows(merged)
    } catch (err: any) {
      showToast(err.message || "Failed to load round data", "error")
      setRows([])
    } finally {
      setLoadingRows(false)
    }
  }

  const updateRow = (regId: string, field: keyof TeamRow, value: string) => {
    setRows(prev => prev.map(r => r.registrationId === regId ? { ...r, [field]: value } : r))
    if (errors[`${regId}-${field}`]) {
      setErrors(prev => { const n = { ...prev }; delete n[`${regId}-${field}`]; return n })
    }
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    const ranksUsed: Record<string, string> = {}

    rows.forEach(row => {
      const score = parseFloat(row.score)
      if (row.score === "" || isNaN(score) || score < 0) {
        errs[`${row.registrationId}-score`] = "Enter a valid score (≥ 0)"
      }
      if (row.rank !== "") {
        const rank = parseInt(row.rank)
        if (isNaN(rank) || rank < 1) {
          errs[`${row.registrationId}-rank`] = "Rank must be ≥ 1"
        } else if (ranksUsed[row.rank]) {
          errs[`${row.registrationId}-rank`] = `Rank ${row.rank} already assigned`
          errs[`${ranksUsed[row.rank]}-rank`] = `Rank ${row.rank} already assigned`
        } else {
          ranksUsed[row.rank] = row.registrationId
        }
      }
    })

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSaveDraft = async () => {
    if (!selectedComp || !selectedRound) return
    if (!validate()) { showToast("Please fix the validation errors before saving.", "error"); return }
    setIsSaving(true)
    try {
      const payload = rows.map(r => ({
        registrationId: r.registrationId,
        competitionId: selectedComp.id,
        roundId: selectedRound.id,
        score: parseFloat(r.score),
        rankAchieved: r.rank ? parseInt(r.rank) : null,
        feedback: r.feedback || null,
      }))
      await fetchClient("/results/bulk", {
        method: "PUT",
        body: JSON.stringify({ results: payload }),
      })
      showToast("Results saved as DRAFT successfully.")
      await loadRound(selectedComp, selectedRound)
    } catch (err: any) {
      showToast(err.message || "Failed to save", "error")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!selectedComp || !selectedRound) return
    setPublishDialog(false)
    setIsPublishing(true)
    try {
      await fetchClient("/results/publish", {
        method: "POST",
        body: JSON.stringify({ competitionId: selectedComp.id, roundId: selectedRound.id }),
      })
      showToast("Results published. Leaderboard will update shortly.")
      await loadRound(selectedComp, selectedRound)
    } catch (err: any) {
      showToast(err.message || "Failed to publish", "error")
    } finally {
      setIsPublishing(false)
    }
  }

  const handleUnpublish = async () => {
    if (!selectedComp || !selectedRound) return
    setUnpublishDialog(false)
    setIsUnpublishing(true)
    try {
      await fetchClient("/results/unpublish", {
        method: "POST",
        body: JSON.stringify({ competitionId: selectedComp.id, roundId: selectedRound.id }),
      })
      showToast("Results reverted to DRAFT. Leaderboard points removed.")
      await loadRound(selectedComp, selectedRound)
    } catch (err: any) {
      showToast(err.message || "Failed to unpublish", "error")
    } finally {
      setIsUnpublishing(false)
    }
  }

  const filteredRows = rows.filter(r =>
    r.collegeName.toLowerCase().includes(search.toLowerCase()) ||
    r.eCellName.toLowerCase().includes(search.toLowerCase())
  )

  const isPublished = rows.length > 0 && rows.every(r => r.status === "PUBLISHED")
  const hasDrafts = rows.some(r => r.status === "DRAFT")

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium border animate-in slide-in-from-bottom-2 duration-200 ${
          toast.type === "success" ? "bg-green-950 text-green-400 border-green-500/30" : "bg-red-950 text-red-400 border-red-500/30"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Competition Results</h1>
          <p className="text-sm text-text-secondary mt-1">Enter and manage scores per competition and round.</p>
        </div>
      </div>

      {/* Competition & Round Selector */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Select Competition
          </h3>
          {loadingComps ? (
            <div className="flex items-center gap-2 py-4 text-text-secondary">
              <Activity className="w-4 h-4 animate-pulse" /> Loading competitions...
            </div>
          ) : competitions.length === 0 ? (
            <p className="text-sm text-text-secondary py-4">No competitions found. Create competitions first.</p>
          ) : (
            <div className="space-y-2">
              {competitions.map(comp => (
                <div
                  key={comp.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedComp?.id === comp.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                  onClick={() => { setSelectedComp(comp); setSelectedRound(null); setRows([]) }}
                >
                  <p className={`font-medium text-sm ${selectedComp?.id === comp.id ? "text-white" : "text-text-secondary"}`}>{comp.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{comp.rounds.length} round(s)</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-primary" /> Select Round
          </h3>
          {selectedComp ? (
            selectedComp.rounds.length === 0 ? (
              <p className="text-sm text-text-secondary py-4">No rounds defined for this competition yet.</p>
            ) : (
              <div className="space-y-2">
                {selectedComp.rounds.map(round => (
                  <div
                    key={round.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRound?.id === round.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                    onClick={() => loadRound(selectedComp, round)}
                  >
                    <p className={`font-medium text-sm ${selectedRound?.id === round.id ? "text-white" : "text-text-secondary"}`}>
                      Round {round.order}: {round.name}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center gap-2 text-sm text-text-secondary py-4">
              <Info className="w-4 h-4" /> Select a competition first.
            </div>
          )}
        </div>
      </div>

      {/* Score Entry Table */}
      {selectedRound && (
        loadingRows ? (
          <div className="flex items-center justify-center h-32 text-text-secondary">
            <Activity className="w-5 h-5 animate-pulse mr-2 text-primary/50" /> Loading teams...
          </div>
        ) : rows.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl py-16 flex flex-col items-center text-center">
            <Trophy className="w-10 h-10 text-text-secondary mb-4" />
            <h3 className="font-semibold text-white mb-2">No Teams Registered</h3>
            <p className="text-sm text-text-secondary max-w-xs">No teams have registered for this competition yet.</p>
          </div>
        ) : (
          <>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-white">
                    {selectedComp?.name} — Round {selectedRound.order}: {selectedRound.name}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">{rows.length} participating teams</p>
                </div>
                <div className="flex items-center gap-2">
                  {isPublished
                    ? <StatusBadge status="approved" />
                    : <StatusBadge status="draft" />
                  }
                </div>
              </div>

              <div className="p-4">
                <FilterBar searchPlaceholder="Filter teams..." onSearchChange={setSearch} />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Team / College</th>
                      <th className="px-4 py-3 font-medium w-32">Score <span className="text-primary">*</span></th>
                      <th className="px-4 py-3 font-medium w-24">Rank</th>
                      <th className="px-4 py-3 font-medium">Feedback</th>
                      <th className="px-4 py-3 font-medium w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map(row => (
                      <tr key={row.registrationId} className="border-b border-border last:border-0 hover:bg-surface-alt/30 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-white">{row.collegeName}</p>
                          <p className="text-xs text-text-secondary">{row.eCellName}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <input
                              type="number"
                              value={row.score}
                              onChange={e => updateRow(row.registrationId, "score", e.target.value)}
                              disabled={isPublished}
                              placeholder="0"
                              min="0"
                              className={`w-full bg-background border rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors[`${row.registrationId}-score`] ? "border-red-500" : "border-border"
                              }`}
                            />
                            {errors[`${row.registrationId}-score`] && (
                              <p className="text-xs text-red-400 mt-1">{errors[`${row.registrationId}-score`]}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <input
                              type="number"
                              value={row.rank}
                              onChange={e => updateRow(row.registrationId, "rank", e.target.value)}
                              disabled={isPublished}
                              placeholder="—"
                              min="1"
                              className={`w-full bg-background border rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors[`${row.registrationId}-rank`] ? "border-red-500" : "border-border"
                              }`}
                            />
                            {errors[`${row.registrationId}-rank`] && (
                              <p className="text-xs text-red-400 mt-1">{errors[`${row.registrationId}-rank`]}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.feedback}
                            onChange={e => updateRow(row.registrationId, "feedback", e.target.value)}
                            disabled={isPublished}
                            placeholder="Optional feedback..."
                            className="w-full bg-background border border-border rounded px-2 py-1.5 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.status === "PUBLISHED" ? "approved" : "draft"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface border border-border rounded-xl">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Info className="w-3.5 h-3.5" />
                <span>Publishing results will trigger the leaderboard update process on the backend.</span>
              </div>

              <div className="flex items-center gap-3">
                {isPublished ? (
                  <Button
                    variant="outline"
                    onClick={() => setUnpublishDialog(true)}
                    disabled={isUnpublishing}
                    className="border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {isUnpublishing ? "Reverting..." : "Revert to Draft"}
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Draft"}
                    </Button>
                    <Button onClick={() => setPublishDialog(true)} disabled={isPublishing || !hasDrafts}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isPublishing ? "Publishing..." : "Publish Results"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )
      )}

      {/* Empty State */}
      {!selectedRound && !loadingComps && (
        <div className="border border-dashed border-border rounded-xl py-20 flex flex-col items-center text-center">
          <Trophy className="w-10 h-10 text-text-secondary mb-4" />
          <h3 className="font-semibold text-white mb-2">No Round Selected</h3>
          <p className="text-sm text-text-secondary max-w-xs">
            Select a competition and a round from above to begin entering scores.
          </p>
        </div>
      )}

      {/* Publish Dialog */}
      <ConfirmDialog
        open={publishDialog}
        title="Publish Results?"
        description={`This will mark all ${rows.length} results for ${selectedComp?.name} (${selectedRound?.name}) as PUBLISHED. Published results will count toward the League Leaderboard and cannot be edited without first being unpublished.`}
        confirmLabel="Publish Results"
        isLoading={isPublishing}
        onConfirm={handlePublish}
        onCancel={() => setPublishDialog(false)}
      />

      {/* Unpublish Dialog */}
      <ConfirmDialog
        open={unpublishDialog}
        title="Revert to Draft?"
        description="This will remove these results from the public leaderboard and revert them to DRAFT status. League points awarded from this round will be nullified pending re-publication."
        confirmLabel="Revert to Draft"
        isDestructive
        isLoading={isUnpublishing}
        onConfirm={handleUnpublish}
        onCancel={() => setUnpublishDialog(false)}
      />
    </div>
  )
}
