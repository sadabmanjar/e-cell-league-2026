import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Info } from "lucide-react"

export const metadata = {
  title: "Schedule — E-Cell League 2026",
  description: "Event schedule and timeline for E-Cell League 2026. Timings and venue details will be shared with registered teams.",
}

const tracks = [
  { name: "BizIQ", format: "Multi-round Quiz", teamSize: "2 members" },
  { name: "The Pitch Lab", format: "Pitch Deck + Q&A", teamSize: "1–2 members" },
  { name: "mADverse", format: "Impromptu Ad Campaign", teamSize: "2–3 members" },
  { name: "CODEX", format: "Single-day Dev Sprint", teamSize: "4 members" },
  { name: "Dress-A-Founder", format: "Crisis Simulation", teamSize: "1 member" },
]

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Event <span className="text-primary">Schedule</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                E-Cell League 2026 is a single-day event with all five tracks running in parallel.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            {/* Notice */}
            <div className="flex gap-3 p-5 bg-primary/5 border border-primary/20 rounded-xl mb-12">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">Schedule To Be Announced</p>
                <p className="text-sm text-text-secondary">
                  The exact schedule — including timings, room/venue assignments, and slot order for all 5 tracks — will be
                  shared with every registered Team Lead immediately after registration closes. Make sure your contact
                  details are up to date.
                </p>
              </div>
            </div>

            <SectionHeading
              title="All 5 Tracks Run in Parallel"
              description="On event day, all five tracks begin and operate simultaneously. Your team members cannot attend two tracks at the same time — track assignment strategy is critical."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {tracks.map((track) => (
                <Card key={track.name} className="hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{track.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Format: {track.format}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Team: {track.teamSize}</span>
                    </div>
                    <div className="mt-3 inline-flex px-3 py-1 bg-surface-alt border border-border rounded-full text-xs text-text-secondary">
                      Timing: TBA
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <SectionHeading title="General Event Day Flow" />
              <div className="space-y-4 mt-6">
                {[
                  { time: "Morning", label: "Registration Desk & Check-in Opens" },
                  { time: "Parallel", label: "All 5 Tracks Begin Simultaneously" },
                  { time: "Afternoon", label: "Track Finals & Results Compilation" },
                  { time: "Evening", label: "Leaderboard Announcement & Prize Distribution" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg">
                    <div className="w-24 text-xs font-mono text-primary font-semibold shrink-0">{item.time}</div>
                    <div className="w-px h-8 bg-border" />
                    <p className="text-sm text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
