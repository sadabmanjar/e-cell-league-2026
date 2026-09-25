"use client"
import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { FilterBar } from "@/components/ui/filter-bar"
import { fetchClient } from "@/lib/api-client"
import { Activity, User, Mail, Phone } from "lucide-react"

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  collegeId: string;
  registration: {
    id: string;
    passType: string;
    eCell: { name: string; college: { name: string } };
  };
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = React.useState<Participant[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetchClient<{ success: boolean; data: Participant[] }>("/participants")
        setParticipants(res.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load participants")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.registration?.eCell?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Participants"
        description="All individual participants registered across E-Cells."
      />

      <FilterBar searchPlaceholder="Search by name, email or E-Cell..." onSearchChange={setSearch} />

      {loading && (
        <div className="flex items-center justify-center h-48">
          <Activity className="w-6 h-6 animate-pulse text-primary/50" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">College ID</th>
                  <th className="px-4 py-3 font-medium">E-Cell</th>
                  <th className="px-4 py-3 font-medium">Pass</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-text-secondary">
                      {participants.length === 0 ? "No participants yet." : "No results match your search."}
                    </td>
                  </tr>
                ) : filtered.map(p => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-text-secondary text-xs">
                          <Mail className="w-3 h-3" /> {p.email}
                        </div>
                        <div className="flex items-center gap-1 text-text-secondary text-xs">
                          <Phone className="w-3 h-3" /> {p.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary font-mono text-xs">{p.collegeId}</td>
                    <td className="px-4 py-3 text-text-secondary">{p.registration?.eCell?.name || "—"}</td>
                    <td className="px-4 py-3 text-text-secondary">{p.registration?.passType || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
