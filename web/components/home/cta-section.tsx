"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTASection() {
  return (
    <Section className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      
      <Container className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to represent your college?
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Registrations for the E-Cell League 2026 are now open. Gather your best teams, pick your tracks, and start building.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/passes" passHref>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base h-12 px-8 font-semibold">
              Register Your E-Cell
            </Button>
          </Link>
          <Link href="/league" passHref>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-base h-12 px-8">
              Download Prospectus
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
