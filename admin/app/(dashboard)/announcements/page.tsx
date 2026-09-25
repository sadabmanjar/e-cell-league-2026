"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { fetchClient } from "@/lib/api-client"
import { Activity, Plus, Megaphone, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED"

interface Announcement {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  publishedAt: string | null;
  createdAt: string;
}

const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: "text-text-secondary border-border bg-surface-alt",
  MEDIUM: "text-blue-400 border-blue-500/30 bg-blue-950/30",
  HIGH: "text-yellow-400 border-yellow-500/30 bg-yellow-950/30",
  URGENT: "text-red-400 border-red-500/30 bg-red-950/30",
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [creating, setCreating] = React.useState(false)
  const [editTarget, setEditTarget] = React.useState<Announcement | null>(null)
  const [form, setForm] = React.useState({ title: "", description: "", priority: "MEDIUM" as Priority })
  const [submitting, setSubmitting] = React.useState(false)
  const [toast, setToast] = React.useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const load = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetchClient<{ success: boolean; data: Announcement[] }>("/announcements")
      setAnnouncements(res.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to load announcements")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { load() }, [load])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    try {
      setSubmitting(true)
      if (editTarget) {
        await fetchClient(`/announcements/${editTarget.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        })
        showToast("Announcement updated.")
      } else {
        await fetchClient("/announcements", {
          method: "POST",
          body: JSON.stringify({ ...form, status: "DRAFT" }),
        })
        showToast("Announcement created as draft.")
      }
      setCreating(false)
      setEditTarget(null)
      setForm({ title: "", description: "", priority: "MEDIUM" })
      await load()
    } catch (err: any) {
      alert(err.message || "Action failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePublishToggle = async (a: Announcement) => {
    const newStatus: Status = a.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
    try {
      await fetchClient(`/announcements/${a.id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      })
      showToast(`Announcement ${newStatus === "PUBLISHED" ? "published" : "unpublished"}.`)
      await load()
    } catch (err: any) {
      alert(err.message || "Failed")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement? This cannot be undone.")) return
    try {
      await fetchClient(`/announcements/${id}`, { method: "DELETE" })
      showToast("Announcement deleted.")
      await load()
    } catch (err: any) {
      alert(err.message || "Failed to delete")
    }
  }

  const openEdit = (a: Announcement) => {
    setEditTarget(a)
    setForm({ title: a.title, description: a.description, priority: a.priority })
    setCreating(true)
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium border bg-green-950 text-green-400 border-green-500/30">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <SectionHeading title="Announcements" description="Create and publish announcements to event participants." />
        <Button onClick={() => { setCreating(true); setEditTarget(null); setForm({ title: "", description: "", priority: "MEDIUM" }) }}>
          <Plus className="w-4 h-4 mr-2" /> New Announcement
        </Button>
      </div>

      {/* Create/Edit form */}
      {creating && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-white">{editTarget ? "Edit Announcement" : "New Announcement"}</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <input
              className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              placeholder="Announcement title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Description</label>
            <textarea
              className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary h-24 resize-none"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
              placeholder="Announcement details..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Priority</label>
            <select
              className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
              value={form.priority}
              onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save Draft"}</Button>
            <Button type="button" variant="outline" onClick={() => { setCreating(false); setEditTarget(null) }}>Cancel</Button>
          </div>
        </form>
      )}

      {loading && (
        <div className="flex items-center justify-center h-48">
          <Activity className="w-6 h-6 animate-pulse text-primary/50" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {announcements.length === 0 && (
            <div className="text-center py-16 text-text-secondary bg-surface border border-border rounded-xl">
              <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No announcements yet. Create one above.</p>
            </div>
          )}
          {announcements.map(a => (
            <div key={a.id} className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[a.priority]}`}>
                    {a.priority}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                    a.status === "PUBLISHED" ? "text-green-400 border-green-500/30 bg-green-950/30" :
                    a.status === "ARCHIVED" ? "text-text-secondary border-border bg-surface-alt" :
                    "text-yellow-400 border-yellow-500/30 bg-yellow-950/30"
                  }`}>
                    {a.status}
                  </span>
                </div>
                <h4 className="font-semibold text-white">{a.title}</h4>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">{a.description}</p>
                <p className="text-xs text-text-secondary mt-2">
                  {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handlePublishToggle(a)}
                  className="p-1.5 rounded-lg hover:bg-surface-alt transition-colors text-text-secondary hover:text-primary"
                  title={a.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                >
                  {a.status === "PUBLISHED" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEdit(a)}
                  className="p-1.5 rounded-lg hover:bg-surface-alt transition-colors text-text-secondary hover:text-primary"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-1.5 rounded-lg hover:bg-red-950/40 transition-colors text-text-secondary hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
