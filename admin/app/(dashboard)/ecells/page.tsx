"use client"
import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { FilterBar } from "@/components/ui/filter-bar"
import { fetchClient } from "@/lib/api-client"
import { Activity, School, MapPin, Trophy } from "lucide-react"

interface ECell {
  id: string;
  name: string;
  officialEmail: string;
  slug: string;
  college: { name: string; city: string; state: string | null };
  leaderboard?: { rank: number; totalPoints: number } | null;
  _count?: { registrations: number };
}

export default function EcellsPage() {
  const [ecells, setEcells] = React.useState<ECell[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetchClient<{ success: boolean; data: ECell[] }>("/ecells/public")
        setEcells(res.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load E-Cells")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = ecells.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.college?.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.college?.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <SectionHeading
        title="E-Cells"
        description="All registered E-Cells and their colleges."
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
                  <th className="px-4 py-3 font-medium">E-Cell</th>
                  <th className="px-4 py-3 font-medium">College</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-text-secondary">
                      {ecells.length === 0 ? "No E-Cells registered yet." : "No results match your search."}
                    </td>
                  </tr>
                ) : filtered.map(ec => (
                  <tr key={ec.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <School className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{ec.name}</p>
                          <p className="text-xs text-text-secondary">{ec.officialEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{ec.college?.name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-text-secondary">
                        <MapPin className="w-3.5 h-3.5" />
                        {[ec.college?.city, ec.college?.state].filter(Boolean).join(", ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {ec.leaderboard?.rank ? (
                        <span className="flex items-center gap-1 text-primary font-bold">
                          <Trophy className="w-3.5 h-3.5" />
                          #{ec.leaderboard.rank}
                        </span>
                      ) : (
                        <span className="text-text-secondary text-xs">Unranked</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-white">
                      {ec.leaderboard?.totalPoints?.toLocaleString() ?? "0"}
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
