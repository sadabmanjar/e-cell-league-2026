"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CheckCircle } from "lucide-react"
import { GUIDELINES } from "@/data/league"

export function GuidelinesPreviewSection() {
  // Show the first 6 official guidelines as a preview
  const previewGuidelines = GUIDELINES.slice(0, 6)

  return (
    <Section className="bg-background border-t border-border">
      <Container>
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-surface-alt p-8 md:p-12">
          <SectionHeading 
            title="Official Guidelines" 
            description="Read the official rules before entering the arena. These are sourced directly from the E-Cell League Handbook."
          />
          
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {previewGuidelines.map((rule, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">{rule}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-secondary mt-6 border-t border-border pt-4">
            Full guidelines including all 12 rules are available on the{" "}
            <a href="/league" className="text-primary hover:underline">League Rules page</a>.
          </p>
        </div>
      </Container>
    </Section>
  )
}
