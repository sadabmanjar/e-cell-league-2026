"use client"
import * as React from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { tracksData, getIconComponent } from "@/data/tracks"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { CheckCircle2, ChevronRight, Clock, Users, BookOpen, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TrackDetailPage({ params }: { params: { slug: string } }) {
  const track = tracksData.find(t => t.slug === params.slug);
  
  if (!track) {
    notFound();
  }

  // eslint-disable-next-line react-hooks/static-components
  const Icon = getIconComponent(track.iconName);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
            <Icon className="w-96 h-96" />
          </div>
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center border border-primary/30 text-primary">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-primary mb-2 font-medium">
                  <Link href="/tracks" className="hover:underline">Tracks</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-text-secondary">{track.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{track.title}</h1>
              </div>
            </div>
            
            <p className="text-xl text-text-secondary max-w-3xl leading-relaxed mb-10">
              {track.overview}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/passes">
                <Button size="lg" className="px-8 text-base h-12">
                  Register for {track.title}
                </Button>
              </Link>
              <Link href="/league">
                <Button size="lg" variant="outline" className="px-8 text-base h-12">
                  View Full Rules
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
        
        {/* Detail Sections */}
        <Section className="bg-background">
          <Container>
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-16">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Preparation
                  </h2>
                  <p className="text-text-secondary leading-relaxed bg-surface p-6 rounded-lg border border-border">
                    {track.preparation}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Competition Process</h2>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {track.process.map((step, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[2px] md:ml-0 z-10">
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-lg bg-surface border border-border shadow">
                          <p className="text-sm text-text-secondary">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Judging Criteria</h2>
                    <ul className="space-y-3">
                      {track.judgingCriteria.map((criterion, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      Rules
                    </h2>
                    <ul className="space-y-3">
                      {track.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-surface rounded-xl border border-border p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-border pb-4">Key Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary uppercase">Team Size</p>
                        <p className="font-medium text-white">{track.teamSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary uppercase">Duration</p>
                        <p className="font-medium text-white">{track.duration}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-text-secondary uppercase mb-1">Format</p>
                      <p className="font-medium text-white text-sm">{track.format}</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-text-secondary uppercase mb-1">Scoring</p>
                      <p className="font-medium text-white text-sm">{track.scoring}</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-primary/10 rounded-xl border border-primary/20 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Schedule</h3>
                  <div className="text-center py-8">
                    <p className="text-sm text-text-secondary mb-4">Specific timings for this track will be announced closer to the event date.</p>
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-xs font-medium text-text-secondary border border-border">
                      To Be Announced
                    </div>
                  </div>
                </motion.div>
              </div>
              
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  )
}
