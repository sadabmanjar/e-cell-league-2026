"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { motion } from "framer-motion"

export function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Register Your Team", description: "Secure a 3-Track or 5-Track League Pass. Onboard your E-Cell with 6–12 members. First-come, first-served — only 12 slots available." },
    { number: "02", title: "Compete Across Tracks", description: "On event day, your team simultaneously competes in BizIQ, The Pitch Lab, mADverse, CODEX, and Dress-A-Founder." },
    { number: "03", title: "Earn Points & Win", description: "Top 6 teams per track earn League Points. The team with the highest cumulative total wins the League Championship." },
  ]

  return (
    <Section className="bg-surface">
      <Container>
         <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                     IT&apos;S NOT JUST A LEAGUE.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> IT'S A LAUNCH PAD.</span>
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                     It is a one-day multi-track entrepreneurship competition exclusively for 12 E-Cell teams.
                    Points are earned across 5 parallel tracks, aggregated on a live leaderboard, and the team topping the standings wins the League Championship.
                  </p>
                </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-surface border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 font-bold text-primary">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
