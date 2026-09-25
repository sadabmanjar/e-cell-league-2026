"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { FilterBar } from "@/components/ui/filter-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { ActionMenu } from "@/components/ui/action-menu"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { CompetitionFormModal } from "@/components/competitions/competition-form-modal"
import { RoundManager } from "@/components/competitions/round-manager"
import { Plus, Trophy, Users, Eye, EyeOff, Pencil, Trash2 } from "lucide-react"

import { fetchClient } from "@/lib/api-client"

interface CompetitionData {
  id: string;
  name: string;
  slug: string;
  description: string;
  format: string | null;
  teamSize: string | null;
  isPublished: boolean;
  rounds: any[];
  _count?: { registrations: number; results: number };
}

// Map backend to frontend shape
type Competition = {
  id: string;
  name: string;
  slug: string;
  description: string;
  format: string;
  teamSize: string;
  isPublished: boolean;
  resultsCount: number;
  teamsCount: number;
  rounds: any[];
};

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = React.useState<Competition[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")
  const [formModal, setFormModal] = React.useState<{ open: boolean; competition?: Competition }>({ open: false })
  const [deleteTarget, setDeleteTarget] = React.useState<Competition | null>(null)
  const [manageRounds, setManageRounds] = React.useState<Competition | null>(null)
  const [viewTeams, setViewTeams] = React.useState<Competition | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    fetchCompetitions()
  }, [])

  const fetchCompetitions = async () => {
    try {
      setLoading(true)
      const res = await fetchClient<{ success: boolean; data: CompetitionData[] }>("/competitions")
      const mapped = res.data.map(c => ({
        ...c,
        format: c.format || "",
        teamSize: c.teamSize || "",
        teamsCount: c._count?.registrations || 0,
        resultsCount: c._count?.results || 0
      }))
      setCompetitions(mapped)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to load competitions")
    } finally {
      setLoading(false)
    }
  }

  const filtered = competitions.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = async (data: Partial<Competition>) => {
    try {
      await fetchClient("/competitions", {
        method: "POST",
        body: JSON.stringify(data),
      })
      await fetchCompetitions()
      setFormModal({ open: false })
    } catch (err: any) {
      alert(err.message || "Create failed")
    }
  }

  const handleEdit = async (data: Partial<Competition>) => {
    if (!formModal.competition?.id) return;
    try {
      await fetchClient(`/competitions/${formModal.competition.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
      await fetchCompetitions()
      setFormModal({ open: false })
    } catch (err: any) {
      alert(err.message || "Update failed")
    }
  }

  const handleTogglePublish = async (id: string) => {
    const comp = competitions.find(c => c.id === id)
    if (!comp) return;
    try {
      await fetchClient(`/competitions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isPublished: !comp.isPublished }),
      })
      await fetchCompetitions()
    } catch (err: any) {
      alert(err.message || "Failed to toggle publish")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    if (deleteTarget.resultsCount > 0) return 
    try {
      setIsDeleting(true)
      await fetchClient(`/competitions/${deleteTarget.id}`, {
        method: "DELETE",
      })
      await fetchCompetitions()
      setDeleteTarget(null)
    } catch (err: any) {
      alert(err.message || "Failed to delete")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Competitions</h1>
          <p className="text-sm text-text-secondary mt-1">Create and manage all 5 League competition tracks.</p>
        </div>
        <Button onClick={() => setFormModal({ open: true })}>
          <Plus className="w-4 h-4 mr-2" /> Create Competition
        </Button>
      </div>

      <FilterBar searchPlaceholder="Search competitions..." onSearchChange={setSearch} />

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Competition</th>
                <th className="px-4 py-3 font-medium">Format</th>
                <th className="px-4 py-3 font-medium">Team Size</th>
                <th className="px-4 py-3 font-medium text-center">Rounds</th>
                <th className="px-4 py-3 font-medium text-center">Teams</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(comp => (
                <tr key={comp.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{comp.name}</p>
                        <p className="text-xs text-text-secondary">/{comp.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{comp.format}</td>
                  <td className="px-4 py-3 text-text-secondary">{comp.teamSize}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setManageRounds(comp)}
                      className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                    >
                      {comp.rounds.length} rounds
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setViewTeams(comp)}
                      className="flex items-center gap-1 mx-auto text-text-secondary hover:text-primary transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-sm">{comp.teamsCount}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={comp.isPublished ? "active" : "draft"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ActionMenu actions={[
                        {
                          label: "Edit",
                          icon: Pencil,
                          onClick: () => setFormModal({ open: true, competition: comp }),
                        },
                        {
                          label: comp.isPublished ? "Unpublish" : "Publish",
                          icon: comp.isPublished ? EyeOff : Eye,
                          onClick: () => handleTogglePublish(comp.id),
                        },
                        {
                          label: "Manage Rounds",
                          icon: Trophy,
                          onClick: () => setManageRounds(comp),
                        },
                        {
                          label: "Delete",
                          icon: Trash2,
                          isDangerous: true,
                          onClick: () => {
                            if (comp.resultsCount > 0) {
                              alert(`"${comp.name}" has ${comp.resultsCount} official results on record. To delete, first remove all results via the Results module (SUPER_ADMIN only).`)
                              return
                            }
                            setDeleteTarget(comp)
                          },
                        },
                      ]} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-text-secondary">
                    No competitions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CompetitionFormModal
        open={formModal.open}
        initialData={formModal.competition}
        onClose={() => setFormModal({ open: false })}
        onSubmit={formModal.competition ? handleEdit : handleCreate}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This will permanently remove the competition, all associated rounds, and team registrations. This action cannot be undone."
        confirmLabel="Delete Competition"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Round Manager Modal */}
      {manageRounds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setManageRounds(null)} />
          <div className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-6">Manage Rounds — {manageRounds.name}</h2>
            <RoundManager
              competitionId={manageRounds.id}
              competitionName={manageRounds.name}
              initialRounds={manageRounds.rounds}
              hasResults={manageRounds.resultsCount > 0}
            />
            <div className="flex justify-end mt-6 pt-4 border-t border-border">
              <Button onClick={() => setManageRounds(null)}>Done</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Teams Modal */}
      {viewTeams && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewTeams(null)} />
          <div className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-2">Registered Teams — {viewTeams.name}</h2>
            <p className="text-sm text-text-secondary mb-6">{viewTeams.teamsCount} team(s) have selected this competition.</p>
            <div className="text-center py-10 border border-dashed border-border rounded-lg">
              <Users className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <p className="text-sm text-text-secondary">Team data will load from the backend API when connected.</p>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setViewTeams(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
