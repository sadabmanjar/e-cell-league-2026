"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { fetchClient } from "@/lib/api-client"
import { Activity, Plus, Calendar, Pencil, Trash2, Clock } from "lucide-react"

type ScheduleStatus = "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED"

interface ScheduleItem {
  id: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  endTime: string;
  venue: string | null;
  status: ScheduleStatus;
  competition?: { name: string } | null;
}

const STATUS_COLORS: Record<ScheduleStatus, string> = {
  UPCOMING: "text-blue-400 border-blue-500/30 bg-blue-950/30",
  LIVE: "text-green-400 border-green-500/30 bg-green-950/30",
  COMPLETED: "text-text-secondary border-border bg-surface-alt",
  CANCELLED: "text-red-400 border-red-500/30 bg-red-950/30",
}

type FormData = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  status: ScheduleStatus;
}

const EMPTY_FORM: FormData = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  status: "UPCOMING",
}

export default function SchedulePage() {
  const [schedules, setSchedules] = React.useState<ScheduleItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [creating, setCreating] = React.useState(false)
  const [editTarget, setEditTarget] = React.useState<ScheduleItem | null>(null)
  const [form, setForm] = React.useState<FormData>(EMPTY_FORM)
  const [submitting, setSubmitting] = React.useState(false)
  const [toast, setToast] = React.useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const load = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetchClient<{ success: boolean; data: ScheduleItem[] }>("/schedule")
      setSchedules(res.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to load schedule")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { load() }, [load])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.date || !form.startTime || !form.endTime) return
    try {
      setSubmitting(true)
      // Convert date+time fields to ISO datetime strings
      const startIso = new Date(`${form.date}T${form.startTime}`).toISOString()
      const endIso = new Date(`${form.date}T${form.endTime}`).toISOString()
      const dateIso = new Date(form.date).toISOString()

      const payload = {
        title: form.title,
        description: form.description || undefined,
        date: dateIso,
        startTime: startIso,
        endTime: endIso,
        venue: form.venue || undefined,
        status: form.status,
      }

      if (editTarget) {
        await fetchClient(`/schedule/${editTarget.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
        showToast("Schedule item updated.")
      } else {
        await fetchClient("/schedule", {
          method: "POST",
          body: JSON.stringify(payload),
        })
        showToast("Schedule item created.")
      }
      setCreating(false)
      setEditTarget(null)
      setForm(EMPTY_FORM)
      await load()
    } catch (err: any) {
      alert(err.message || "Action failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this schedule item?")) return
    try {
      await fetchClient(`/schedule/${id}`, { method: "DELETE" })
      showToast("Schedule item deleted.")
      await load()
    } catch (err: any) {
      alert(err.message || "Failed to delete")
    }
  }

  const openEdit = (s: ScheduleItem) => {
    setEditTarget(s)
    const d = new Date(s.date)
    const st = new Date(s.startTime)
    const et = new Date(s.endTime)
    setForm({
      title: s.title,
      description: s.description || "",
      date: d.toISOString().split("T")[0],
      startTime: `${st.getHours().toString().padStart(2,"0")}:${st.getMinutes().toString().padStart(2,"0")}`,
      endTime: `${et.getHours().toString().padStart(2,"0")}:${et.getMinutes().toString().padStart(2,"0")}`,
      venue: s.venue || "",
      status: s.status,
    })
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
        <SectionHeading title="Schedule" description="Create and manage event schedule items." />
        <Button onClick={() => { setCreating(true); setEditTarget(null); setForm(EMPTY_FORM) }}>
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      {creating && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-white">{editTarget ? "Edit Event" : "New Schedule Event"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-white">Title *</label>
              <input className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Event title" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Date *</label>
              <input type="date" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Venue</label>
              <input className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Hall name / Online" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Start Time *</label>
              <input type="time" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">End Time *</label>
              <input type="time" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Status</label>
              <select className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary w-full"
                value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ScheduleStatus }))}>
                <option value="UPCOMING">Upcoming</option>
                <option value="LIVE">Live</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-white">Description</label>
              <textarea className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary h-20 resize-none"
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional event details..." />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save"}</Button>
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
          {schedules.length === 0 && (
            <div className="text-center py-16 text-text-secondary bg-surface border border-border rounded-xl">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No schedule events yet. Add one above.</p>
            </div>
          )}
          {schedules.map(s => (
            <div key={s.id} className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${STATUS_COLORS[s.status]}`}>
                    {s.status}
                  </span>
                  {s.competition && (
                    <span className="text-[10px] font-medium text-text-secondary">{s.competition.name}</span>
                  )}
                </div>
                <h4 className="font-semibold text-white">{s.title}</h4>
                {s.description && <p className="text-sm text-text-secondary mt-1">{s.description}</p>}
                <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(s.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(s.startTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} –{" "}
                    {new Date(s.endTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {s.venue && <span>{s.venue}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-surface-alt transition-colors text-text-secondary hover:text-primary" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-red-950/40 transition-colors text-text-secondary hover:text-red-400" title="Delete">
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
