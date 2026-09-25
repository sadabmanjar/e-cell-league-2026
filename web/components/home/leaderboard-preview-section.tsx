"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { Button } from "@/components/ui/button"

export function LeaderboardPreviewSection() {
  const dummyData = [
    { rank: 1, name: "Team Innovators", college: "IIT Bombay", points: 4500, trend: "up" as const },
    { rank: 2, name: "Alpha Builders", college: "BITS Pilani", points: 4250, trend: "up" as const },
    { rank: 3, name: "Nexus Creators", college: "IIT Delhi", points: 4100, trend: "down" as const },
    { rank: 4, name: "The Disruptors", college: "NIT Trichy", points: 3800, trend: "neutral" as const },
    { rank: 5, name: "Quantum Ventures", college: "IIM Ahmedabad", points: 3600, trend: "up" as const },
  ];

  return (
    <Section className="bg-background">
      <Container>
        <div className="flex justify-between items-end mb-8">
          <SectionHeading 
            title="Current Standings" 
            description="The race for the League Title is on. Who will claim the throne?"
            className="mb-0"
          />
          <Button variant="outline" className="hidden md:flex">View Full Leaderboard</Button>
        </div>
        
        <LeaderboardTable data={dummyData} />
        
        <div className="mt-6 flex justify-center md:hidden">
          <Button variant="outline" className="w-full">View Full Leaderboard</Button>
        </div>
      </Container>
    </Section>
  )
}
