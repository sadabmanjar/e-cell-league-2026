import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Target, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Us — E-Cell League 2026",
  description: "Learn about E-Cell League 2026 — the premier national-level collegiate entrepreneurship competition.",
}

const pillars = [
  {
    icon: Trophy,
    title: "League Format",
    description: "Unlike standalone events, E-Cell League aggregates performance across all tracks on a live leaderboard. The college that tops the standings wins the Championship.",
  },
  {
    icon: Users,
    title: "12 Elite Teams",
    description: "Participation is capped at 12 registered E-Cell teams to ensure every match-up is competitive and the quality of competition stays elite.",
  },
  {
    icon: Target,
    title: "Five Distinct Tracks",
    description: "BizIQ, The Pitch Lab, mADverse, CODEX, and Dress-A-Founder — each testing a different dimension of entrepreneurial skill.",
  },
  {
    icon: Zap,
    title: "One Day. Everything.",
    description: "All tracks run simultaneously on a single event day. Team strategy — who goes where — matters as much as individual performance.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                About <span className="text-primary">E-Cell League</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                The premier national-level collegiate entrepreneurship competition. Season 1. Twelve teams. One champion.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <SectionHeading
                  title="What is E-Cell League?"
                  description="E-Cell League is a one-day multi-track entrepreneurship competition exclusively for registered collegiate E-Cell teams."
                />
                <p className="text-text-secondary leading-relaxed mb-4">
                  Points are earned across tracks, aggregated on a live leaderboard, and the team topping the standings
                  at the end of the day wins the E-Cell League Championship and a share of the ₹50,000 prize pool.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  This is not a hackathon. This is not a quiz. This is a full-spectrum test of everything an
                  entrepreneurial team is made of — knowledge, creativity, strategy, technical skill, and the ability
                  to perform under pressure.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl border border-border bg-surface-alt flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                  <Trophy className="w-32 h-32 text-primary opacity-80 relative z-10" />
                </div>
              </div>
            </div>

            <SectionHeading title="The Four Pillars" align="center" />
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <Card key={pillar.title} className="hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary leading-relaxed">{pillar.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to compete?</h2>
              <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                Registrations are open. Gather your team, choose your pass, and bring your best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/passes">
                  <Button size="lg">Register Your E-Cell</Button>
                </Link>
                <Link href="/league">
                  <Button size="lg" variant="outline">Read the Rules</Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
