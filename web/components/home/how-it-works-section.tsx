"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { motion } from "framer-motion"

export function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Register Your Team", description: "Secure a 3-Track or 5-Track League Pass. Onboard your E-Cell with 6–12 members. First-come, first-served — only 12 slots available." },
    { number: "02", title: "Select Your Tracks", description: "3-Track Pass holders choose exactly 3 tracks. 5-Track Pass holders compete in all 5. Track selection is final after registration." },
    { number: "03", title: "Assign Members", description: "All tracks run in parallel. Your Team Lead must pre-assign members to each track before arrival on event day." },
    { number: "04", title: "Compete Across Tracks", description: "On event day, your team simultaneously competes in BizIQ, The Pitch Lab, mADverse, CODEX, and Dress-A-Founder." },
    { number: "05", title: "Earn Points & Win", description: "Top 6 teams per track earn League Points (60/50/40/30/20/10). The team with the highest cumulative total wins the League Championship." },
  ]

  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading 
          title="How It Works" 
          description="From registration to championship — the road to becoming E-Cell League champion."
          align="center"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center bg-surface p-4"
            >
              <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-2xl font-bold text-white mb-6">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
