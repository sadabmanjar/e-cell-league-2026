"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import Link from "next/link"
import { tracksData } from "@/data/tracks"
import { getIconComponent } from "@/data/tracks"
import { ArrowRight } from "lucide-react"

export function CompetitionTracksSection() {
  return (
    <Section className="bg-surface-alt">
      <Container>
        <SectionHeading 
          title="The Five Official Tracks" 
          description="All tracks run in parallel on event day. Assign your members to their tracks before arrival."
          align="center"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {tracksData.map((track, i) => {
            const Icon = getIconComponent(track.iconName)
            return (
              <motion.div
                key={track.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/tracks/${track.slug}`} className="group block h-full">
                  <div className="h-full p-6 rounded-xl border border-border bg-surface hover:border-primary/50 transition-all duration-300 group-hover:bg-surface-alt flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary tracking-widest uppercase">{track.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{track.title}</h3>
                    <p className="text-xs text-text-secondary mb-3 italic">{track.originalEvent}</p>
                    <p className="text-sm text-text-secondary flex-1 mb-4">{track.shortDescription}</p>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="text-xs text-text-secondary">{track.teamSize}</span>
                      <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Parallel format notice */}
        <div className="mt-10 text-center">
          <p className="text-sm text-text-secondary max-w-2xl mx-auto bg-surface border border-border rounded-lg px-6 py-4">
            All five tracks run simultaneously on event day. A participant cannot be assigned to two tracks at the same time.
            Team Leads are responsible for assigning members to their designated tracks before the event.
          </p>
        </div>
      </Container>
    </Section>
  )
}
