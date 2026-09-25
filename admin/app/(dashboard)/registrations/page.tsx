"use client"
import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { FilterBar } from "@/components/ui/filter-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { fetchClient } from "@/lib/api-client"
import { Activity, Users, CreditCard } from "lucide-react"

interface Registration {
  id: string;
  passType: string;
  status: string;
  createdAt: string;
  eCell: {
    name: string;
    officialEmail: string;
    college: { name: string; city: string };
  };
  _count: { participants: number };
  payment?: { status: string; amount: number };
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = React.useState<Registration[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetchClient<{ success: boolean; data: Registration[] }>("/registrations")
        setRegistrations(res.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load registrations")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = registrations.filter(r =>
    r.eCell?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.eCell?.college?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Registrations"
        description="View all E-Cell registration submissions."
      />

      <FilterBar searchPlaceholder="Search by E-Cell or college..." onSearchChange={setSearch} />

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
                  <th className="px-4 py-3 font-medium">E-Cell / College</th>
                  <th className="px-4 py-3 font-medium">Pass Type</th>
                  <th className="px-4 py-3 font-medium text-center">Participants</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-text-secondary">
                      {registrations.length === 0 ? "No registrations yet." : "No results match your search."}
                    </td>
                  </tr>
                ) : filtered.map(reg => (
                  <tr key={reg.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{reg.eCell?.name || "—"}</p>
                      <p className="text-xs text-text-secondary">{reg.eCell?.college?.name}, {reg.eCell?.college?.city}</p>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{reg.passType}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex items-center justify-center gap-1 text-text-secondary">
                        <Users className="w-3.5 h-3.5" />
                        {reg._count?.participants ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {reg.payment ? (
                        <span className="flex items-center gap-1 text-text-secondary">
                          <CreditCard className="w-3.5 h-3.5" />
                          {reg.payment.status}
                          {reg.payment.amount ? ` · ₹${(reg.payment.amount / 100).toLocaleString()}` : ""}
                        </span>
                      ) : (
                        <span className="text-text-secondary text-xs">No payment</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={reg.status.toLowerCase() as any} />
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
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
