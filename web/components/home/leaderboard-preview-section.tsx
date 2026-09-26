"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { leaderboardApi, LeaderboardEntry } from "@/lib/api/leaderboard"
import { Activity } from "lucide-react"

export function LeaderboardPreviewSection() {
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    leaderboardApi.getOverall().then(data => {
      setEntries(data.slice(0, 5));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <Section className="bg-background">
      <Container>
        <div className="flex justify-between items-end mb-8">
          <SectionHeading 
            title="Current Standings" 
            description="The race for the League Title is on. Who will claim the throne?"
            className="mb-0"
          />
          <Link href="/leaderboard" className="hidden md:flex">
            <Button variant="outline">View Full Leaderboard</Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12 text-text-secondary border border-border rounded-lg bg-surface">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
        ) : entries.length > 0 ? (
          <LeaderboardTable data={entries.map(e => ({
             rank: e.rank,
             name: e.eCell.name,
             college: e.eCell.collegeName,
             points: e.totalPoints,
             trend: (e.trend === "steady" ? "neutral" : e.trend) as any
          }))} />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-lg bg-surface">
            <h3 className="text-xl font-medium text-white mb-2">Leaderboard will appear here once track results are finalized.</h3>
            <p className="text-text-secondary">12 Teams • Live Leaderboard • Points are updated after track results are finalized</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-center md:hidden">
          <Link href="/leaderboard" className="w-full">
            <Button variant="outline" className="w-full">View Full Leaderboard</Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
