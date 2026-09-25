import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react"
import { GUIDELINES } from "@/data/league"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Guidelines — E-Cell League 2026",
  description: "Official participation guidelines for E-Cell League Season 1.",
}

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Official <span className="text-primary">Guidelines</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                All participating teams must read, understand, and comply with these guidelines. Participation implies full acceptance.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-3 p-5 bg-primary/5 border border-primary/20 rounded-xl mb-12">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  These are the official participation guidelines for E-Cell League Season 1. Additional track-specific
                  rules apply — refer to each track's detail page. The Organizing Committee reserves the right to update
                  guidelines; registered teams will be notified of any changes.
                </p>
              </div>

              <SectionHeading title="General Participation Rules" />
              <div className="space-y-4 mt-6 mb-16">
                {GUIDELINES.map((guideline, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-surface border border-border rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary leading-relaxed">{guideline}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400 mb-2">Misconduct Policy</p>
                    <p className="text-sm text-text-secondary">
                      Any team found violating competition rules or engaging in unsportsmanlike conduct will receive a
                      <strong className="text-white"> −5 League Point deduction</strong> per violation, applied directly to their overall score.
                      Severe violations may result in immediate disqualification at the discretion of the Organizing Committee.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/passes">
                  <Button size="lg">Register Your E-Cell</Button>
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
