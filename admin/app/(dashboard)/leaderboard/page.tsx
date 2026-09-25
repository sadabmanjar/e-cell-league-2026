"use client"
import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { fetchClient } from "@/lib/api-client"
import { Activity, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface LeaderboardEntry {
  rank: number;
  totalPoints: number;
  trend?: "up" | "down" | "steady";
  eCell: {
    id: string;
    name: string;
    collegeName: string;
  };
  competitionScores?: {
    competitionId: string;
    competitionName: string;
    points: number;
    rank: number | null;
  }[];
}

export default function AdminLeaderboardPage() {
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchClient<LeaderboardEntry[]>("/leaderboard/overall")
        setEntries(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load leaderboard")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const TrendIcon = ({ trend }: { trend?: "up" | "down" | "steady" }) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-400" />
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-text-secondary" />
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Leaderboard"
        description="Current overall league standings. Recalculated after each result is published."
      />

      {loading && (
        <div className="flex items-center justify-center h-48">
          <Activity className="w-6 h-6 animate-pulse text-primary/50" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium w-16">Rank</th>
                  <th className="px-4 py-3 font-medium">E-Cell</th>
                  <th className="px-4 py-3 font-medium">College</th>
                  <th className="px-4 py-3 font-medium text-center">Trend</th>
                  <th className="px-4 py-3 font-medium text-right">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center text-text-secondary">
                      <Trophy className="w-10 h-10 mx-auto mb-3 opacity-20" />
                      <p>No results published yet. Publish competition results to see standings.</p>
                    </td>
                  </tr>
                ) : entries.map((entry) => (
                  <tr key={entry.eCell.id} className={`border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors ${entry.rank <= 3 ? "bg-primary/5" : ""}`}>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-lg ${entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-slate-300" : entry.rank === 3 ? "text-amber-600" : "text-primary"}`}>
                        #{entry.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">{entry.eCell.name}</td>
                    <td className="px-4 py-3 text-text-secondary">{entry.eCell.collegeName}</td>
                    <td className="px-4 py-3 flex justify-center">
                      <TrendIcon trend={entry.trend} />
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">{entry.totalPoints.toLocaleString()}</td>
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
