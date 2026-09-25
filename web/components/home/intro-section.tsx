"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/ui/container"
import { Trophy, Target, Users } from "lucide-react"
import { LEAGUE } from "@/data/league"

export function LeagueIntroSection() {
  const features = [
    {
      icon: Trophy,
      title: "One Day. Five Tracks.",
      description: "All five tracks run in parallel on a single day. Every registered E-Cell team competes simultaneously across BizIQ, The Pitch Lab, mADverse, CODEX, and Dress-A-Founder."
    },
    {
      icon: Target,
      title: "12 Teams. One Champion.",
      description: "Only 12 teams compete in E-Cell League. Registration is first-come, first-served. Points from all tracks are summed on a live leaderboard — the team at the top wins."
    },
    {
      icon: Users,
      title: "The Launch Pad",
      description: "Beyond the ₹50,000 prize pool, the League Champion earns Incubation Support, Internship Opportunities, and direct Startup & Founder interactions."
    }
  ]

  return (
    <Section className="bg-background">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            More than just a competition. <br />
            <span className="text-text-secondary">A proving ground.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {LEAGUE.name} is a one-day multi-track entrepreneurship competition exclusively for {LEAGUE.totalTeams} registered E-Cell teams.
            Points are earned across {LEAGUE.totalTracks} parallel tracks, aggregated on a live leaderboard, and the team topping the standings wins the League Championship.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-surface border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
