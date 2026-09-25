"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { RegistrationForm } from "@/components/register/registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Section className="pt-24 pb-12 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                League Registration Portal
              </h1>
              <p className="text-lg text-text-secondary">
                Onboard your E-Cell, manage your teams, and secure your competitive tracks for the 2026 season.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background py-16">
          <Container>
            <RegistrationForm />
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  )
}
