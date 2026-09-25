"use client"
import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CalendarClock } from "lucide-react"
import { SCHEDULE_NOTICE, PARALLEL_TRACK_NOTICE } from "@/data/league"

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion()

  const notices = [
    {
      title: "Schedule Shared Post-Registration",
      description: SCHEDULE_NOTICE,
    },
    {
      title: "Parallel Track Format",
      description: "Multiple tracks run simultaneously. Members cannot be in two tracks at the same time. Full slot order will be shared with registered teams.",
    },
    {
      title: "Late Arrival Policy",
      description: "Late arrival to a track slot without prior notice may result in forfeiture. Teams must check in at least 30 minutes before the event begins.",
    },
    {
      title: "Real-Time Updates on Event Day",
      description: "Schedule changes on event day will be communicated in real time to Team Leads. Team Leads are the single point of contact.",
    },
    {
      title: "Pre-Assignment Required",
      description: "Team members must be pre-assigned to their tracks before arrival. The Team Lead is responsible for ensuring the right members are at the right place at the right time.",
    },
  ]

  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" as any } 
    }
  }

  return (
    <Section className="bg-surface relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      
      <Container>
        <SectionHeading 
          title="Schedule & Format" 
          description="E-Cell League is a one-day event. Here's what to expect."
          align="center"
        />
        
        <div className="max-w-3xl mx-auto mt-16 relative pl-8">
          <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-primary/30" />

          <div className="space-y-12">
            {notices.map((item, i) => (
              <motion.div 
                key={i} 
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                transition={{ delay: i * 0.15 }}
              >
                {/* Node Dot */}
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                  className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-surface bg-primary shadow-[0_0_10px_rgba(255,77,109,0.5)]" 
                />
                
                <div className="bg-background border border-border hover:border-primary/30 transition-colors rounded-xl p-6 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarClock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Event Day</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Official notice at the bottom */}
          <div className="mt-10 ml-[-2rem] p-4 border border-border rounded-lg bg-surface-alt">
            <p className="text-sm text-text-secondary text-center">
              <span className="font-semibold text-white">Event Date:</span> To be announced.{" "}
              <span className="font-semibold text-white">Venue:</span> Will be shared with registered teams.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
