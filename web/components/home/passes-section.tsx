"use client"
import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, AlertCircle } from "lucide-react"
import { PASSES } from "@/data/league"
import Link from "next/link"

export function PassesSection() {
  const prefersReducedMotion = useReducedMotion()

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as any } 
    }
  }

  return (
    <Section className="bg-background border-t border-border overflow-hidden">
      <Container>
        <SectionHeading 
          title="League Passes" 
          description="Secure your team's entry into E-Cell League Season 1. Only 12 team slots available."
          align="center"
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 relative">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          {/* 3-Track League Pass */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="relative overflow-hidden border-border bg-surface h-full flex flex-col group transition-colors hover:border-text-secondary/30">
              <CardHeader>
                <CardTitle className="text-2xl">3-Track League Pass</CardTitle>
                <CardDescription>Strategic entry for targeted performance.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white group-hover:text-primary transition-colors">{PASSES.THREE_TRACK.priceLabel}</span>
                  <span className="text-text-secondary text-sm ml-2">/ team</span>
                </div>
                <ul className="space-y-4">
                  {PASSES.THREE_TRACK.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-text-secondary">
                      <div className="bg-primary/10 p-1 rounded mr-3 shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="mt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-400 flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    Track selection is confirmed at registration and cannot be changed afterward.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/passes" className="w-full">
                  <Button className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]" variant="outline">Select This Pass</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          {/* 5-Track League Pass */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-primary shadow-[0_0_30px_rgba(255,77,109,0.15)] bg-surface-alt md:scale-105 z-10 h-full flex flex-col">
              {/* Premium Animated Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50 pointer-events-none" />
              
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg shadow-lg">
                RECOMMENDED
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-white">5-Track League Pass</CardTitle>
                <CardDescription>All-access entry to maximise League points.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 relative z-10">
                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/80">{PASSES.FIVE_TRACK.priceLabel}</span>
                  <span className="text-text-secondary text-sm ml-2">/ team</span>
                </div>
                <ul className="space-y-4">
                  {PASSES.FIVE_TRACK.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-text-secondary">
                      <div className="bg-primary p-1 rounded mr-3 shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="mt-0.5 text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs text-text-secondary">
                    Max earnable: <span className="text-primary font-bold">300 League Points</span> across all 5 tracks.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="relative z-10">
                <Link href="/passes" className="w-full">
                  <Button className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 hover:shadow-primary/40" variant="default">Select This Pass</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <p className="text-center text-xs text-text-secondary mt-8">
          Both passes are team-level, non-transferable, and non-refundable once purchased. Only 12 team slots available.
        </p>
      </Container>
    </Section>
  )
}
