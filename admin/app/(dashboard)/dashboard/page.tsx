"use client"
import * as React from "react"
import Link from "next/link"
import { DashboardCard } from "@/components/dashboard-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { fetchClient } from "@/lib/api-client"
import { 
  School, 
  UserCheck, 
  CreditCard, 
  Users, 
  Trophy, 
  Calendar,
  ArrowUpRight,
  Activity
} from "lucide-react"

interface DashboardStats {
  totalEcells: number;
  confirmedRegistrations: number;
  pendingPayments: number;
  totalParticipants: number;
  activeCompetitions: number;
  upcomingSchedules: number;
}

interface RecentRegistration {
  id: string;
  eCellName: string;
  passType: string;
  status: string;
}

interface LeaderboardSnapshot {
  rank: number;
  collegeName: string;
  totalPoints: number;
}

export default function DashboardPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null)
  const [recentRegs, setRecentRegs] = React.useState<RecentRegistration[]>([])
  const [topStandings, setTopStandings] = React.useState<LeaderboardSnapshot[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Fetch all data in parallel
        const [regsRes, ecellsRes, leaderboardRes, competitionsRes] = await Promise.allSettled([
          fetchClient<{ success: boolean; data: any[]; pagination?: { total: number } }>("/registrations?limit=5"),
          fetchClient<{ success: boolean; data: any[] }>("/ecells/public"),
          fetchClient<any[]>("/leaderboard/overall"),
          fetchClient<{ success: boolean; data: any[] }>("/competitions"),
        ])

        const registrations = regsRes.status === "fulfilled" ? regsRes.value.data || [] : []
        const ecells = ecellsRes.status === "fulfilled" ? ecellsRes.value.data || [] : []
        const leaderboard = leaderboardRes.status === "fulfilled" ? leaderboardRes.value || [] : []
        const competitions = competitionsRes.status === "fulfilled" ? competitionsRes.value.data || [] : []

        const confirmed = registrations.filter((r: any) => r.status === "APPROVED" || r.status === "CONFIRMED").length
        const pending = registrations.filter((r: any) => r.payment?.status === "CREATED" || r.status === "PENDING").length

        setStats({
          totalEcells: ecells.length,
          confirmedRegistrations: confirmed,
          pendingPayments: pending,
          totalParticipants: registrations.reduce((acc: number, r: any) => acc + (r._count?.participants || 0), 0),
          activeCompetitions: competitions.filter((c: any) => c.isPublished).length,
          upcomingSchedules: 0,
        })

        setRecentRegs(registrations.slice(0, 5).map((r: any) => ({
          id: r.id,
          eCellName: r.eCell?.name || "Unknown",
          passType: r.passType,
          status: r.status,
        })))

        setTopStandings(leaderboard.slice(0, 3).map((l: any, i: number) => ({
          rank: l.rank || (i + 1),
          collegeName: l.eCell?.collegeName || "Unknown",
          totalPoints: l.totalPoints || 0,
        })))
      } catch (err) {
        console.error("Dashboard load error:", err)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="w-8 h-8 animate-pulse text-primary/50" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeading 
          title="League Overview" 
          description="High-level metrics for the E-Cell League 2026." 
        />
        <div className="text-sm text-text-secondary bg-surface-alt px-3 py-1.5 rounded-md border border-border">
          Season: 2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total E-Cells"
          value={String(stats?.totalEcells ?? 0)}
          icon={School}
        />
        <DashboardCard
          title="Confirmed Registrations"
          value={String(stats?.confirmedRegistrations ?? 0)}
          icon={UserCheck}
        />
        <DashboardCard
          title="Pending Payments"
          value={String(stats?.pendingPayments ?? 0)}
          icon={CreditCard}
          description="Awaiting manual verification"
        />
        <DashboardCard
          title="Total Participants"
          value={String(stats?.totalParticipants ?? 0)}
          icon={Users}
        />
        <DashboardCard
          title="Published Competitions"
          value={String(stats?.activeCompetitions ?? 0)}
          icon={Trophy}
          description="Visible on public website"
        />
        <DashboardCard
          title="Upcoming Events"
          value={String(stats?.upcomingSchedules ?? 0)}
          icon={Calendar}
          description="Next 7 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Registrations</h3>
            <Link href="/registrations" className="text-xs text-primary hover:underline flex items-center">
              View All <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          {recentRegs.length === 0 ? (
            <p className="text-sm text-text-secondary text-center py-8">No registrations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">E-Cell</th>
                    <th className="px-4 py-3 font-medium">Pass Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegs.map((reg) => (
                    <tr key={reg.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{reg.eCellName}</td>
                      <td className="px-4 py-3 text-text-secondary">{reg.passType}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-[10px] font-semibold rounded-full border ${
                          reg.status === "APPROVED" || reg.status === "CONFIRMED"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : reg.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Leaderboard Snapshot */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Top Standings</h3>
            <Link href="/leaderboard" className="text-xs text-primary hover:underline flex items-center">
              View Leaderboard <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          {topStandings.length === 0 ? (
            <p className="text-sm text-text-secondary text-center py-8">No results published yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-secondary uppercase bg-surface-alt border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Rank</th>
                    <th className="px-4 py-3 font-medium">College</th>
                    <th className="px-4 py-3 font-medium text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {topStandings.map((row) => (
                    <tr key={row.rank} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-primary">#{row.rank}</td>
                      <td className="px-4 py-3 font-medium text-white">{row.collegeName}</td>
                      <td className="px-4 py-3 font-bold text-white text-right">{row.totalPoints.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
