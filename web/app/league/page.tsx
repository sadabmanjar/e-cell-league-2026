"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Accordion } from "@/components/ui/accordion"
import { LeagueJourney } from "@/components/league/journey-timeline"
import { PointsSystemPlaceholder } from "@/components/league/points-system"
import { motion } from "framer-motion"
import { Trophy, AlertTriangle, ShieldCheck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { GUIDELINES, TIE_BREAKERS } from "@/data/league"

export default function LeaguePage() {
  const rules = GUIDELINES.map((rule, i) => ({
    value: `r${i}`,
    title: `Guideline ${i + 1}`,
    content: rule,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                The Anatomy of the <span className="text-primary">E-Cell League</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Understand the structure, the rules, and the path to becoming the top collegiate entrepreneurship hub in the nation.
              </p>
            </div>
          </Container>
        </Section>

        {/* What is E-Cell League */}
        <Section className="bg-background">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading 
                  title="What is E-Cell League?" 
                  description="The E-Cell League is a comprehensive, multi-track collegiate competition designed to discover, challenge, and elevate the best student entrepreneurs in the country."
                />
                <p className="text-text-secondary leading-relaxed mb-6">
                  E-Cell League is a one-day multi-track entrepreneurship competition exclusively for 12 registered E-Cell teams. Points are earned across tracks, aggregated on a live leaderboard, and the team topping the standings wins the League Championship.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  All tracks run in parallel, meaning team composition and track assignment strategy is vital.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl border border-border bg-surface-alt flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                  <Trophy className="w-32 h-32 text-primary opacity-80 relative z-10" />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* The Distinctions Section (Competition vs League Points) */}
        <Section className="bg-surface-alt border-y border-border">
          <Container>
            <SectionHeading 
              title="The Anatomy of Scoring" 
              description="It is crucial to understand the difference between how teams are evaluated locally within a track, and how colleges are ranked globally."
              align="center"
            />
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">1. Competition Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    This is how an individual team performs in a specific track. Top 6 finishing teams earn points. 7th place onwards earn 0 points.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-white">2. League Points</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    The Competition Result is converted into standardized League Points. A "1st Place" finish yields 60 League Points, down to 10 points for 6th place.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">3. Overall Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    The sum of all valid League Points across all tracks dictates the team's Overall Leaderboard Position. Negative points from misconduct are directly deducted. The team at Rank #1 at the end of the day wins the League.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Visual Journey */}
        <Section className="bg-background overflow-hidden">
          <Container>
            <SectionHeading 
              title="The League Journey" 
              description="A step-by-step roadmap from registration to crowning the champion."
              align="center"
            />
            <LeagueJourney />
          </Container>
        </Section>

        {/* Points System & Tie Breaker */}
        <Section className="bg-surface border-y border-border">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              <PointsSystemPlaceholder />
              
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Pass System & Participation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      To participate, an E-Cell must secure a League Pass (3-Track or 5-Track). The 5-Track pass allows access to all 5 tracks for up to 12 members. 
                      Track selection for the 3-Track pass is fixed upon registration and cannot be changed.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      Tie-Breaker Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      In the event of a tie in Overall League Points between two or more colleges, the following sequence will determine the winner:
                    </p>
                    <ul className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                      {TIE_BREAKERS.map((tb, i) => (
                        <li key={i}>{tb.rule}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Rules & Dates */}
        <Section className="bg-background">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <SectionHeading title="General Rules" />
                <Accordion items={rules} type="single" />
              </div>
              <div>
                <SectionHeading title="Schedule & Dates" />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">One Day Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The exact schedule for all 5 tracks will be shared with every registered team immediately after registration closes. 
                      Event date to be announced.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
        
      </main>
      
      <Footer />
    </div>
  )
}
