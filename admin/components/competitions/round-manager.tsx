"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Trash2 } from "lucide-react"

interface Round {
  id?: string
  name: string
  order: number
  date?: string
}

interface RoundManagerProps {
  competitionId: string
  competitionName: string
  initialRounds?: Round[]
  hasResults?: boolean
}

export function RoundManager({ competitionName, initialRounds = [], hasResults = false }: RoundManagerProps) {
  const [rounds, setRounds] = React.useState<Round[]>(initialRounds)
  const [newRound, setNewRound] = React.useState({ name: "", date: "" })
  const [deleteTarget, setDeleteTarget] = React.useState<number | null>(null)

  const addRound = () => {
    if (!newRound.name.trim()) return
    setRounds(prev => [
      ...prev,
      { name: newRound.name, order: prev.length + 1, date: newRound.date || undefined }
    ])
    setNewRound({ name: "", date: "" })
  }

  const removeRound = (index: number) => {
    if (hasResults && rounds[index].id) {
      setDeleteTarget(index)
      return
    }
    setRounds(prev => prev.filter((_, i) => i !== index))
  }

  const confirmDelete = () => {
    if (deleteTarget !== null) {
      setRounds(prev => prev.filter((_, i) => i !== deleteTarget))
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">Competition Rounds</h3>

      <div className="space-y-2">
        {rounds.map((round, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-surface-alt rounded-lg border border-border">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
              {round.order}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-sm">{round.name}</p>
              {round.date && <p className="text-xs text-text-secondary">{new Date(round.date).toLocaleDateString()}</p>}
            </div>
            <button
              onClick={() => removeRound(i)}
              className="text-text-secondary hover:text-red-400 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {rounds.length === 0 && (
          <p className="text-sm text-text-secondary py-2">No rounds configured.</p>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Round name (e.g. Prelims)"
          value={newRound.name}
          onChange={e => setNewRound(p => ({ ...p, name: e.target.value }))}
          className="flex-1"
        />
        <Input
          type="datetime-local"
          value={newRound.date}
          onChange={e => setNewRound(p => ({ ...p, date: e.target.value }))}
          className="w-48"
        />
        <Button type="button" size="sm" onClick={addRound}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Round?"
        description={`This round for "${competitionName}" has results attached. Deleting it will also remove all associated results. This is an irreversible action.`}
        confirmLabel="Delete Round"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
