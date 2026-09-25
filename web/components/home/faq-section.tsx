"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function FAQSection() {
  const faqs = [
    {
      value: "q1",
      title: "Who can participate in the League?",
      content: "The League is exclusively open to official Entrepreneurship Cells (E-Cells) or equivalent recognized student bodies of colleges/universities. Individual teams must register under their college's E-Cell."
    },
    {
      value: "q2",
      title: "How does the points system work?",
      content: "Colleges accumulate points based on the performance of their representative teams across all 5 competition tracks. Winning a track yields the most points, but participation and top-10 finishes also contribute to the overall League Leaderboard."
    },
    {
      value: "q3",
      title: "Can a college send multiple teams for a single track?",
      content: "Yes, up to 3 teams per college can participate in a single track. However, only the top-performing team's score will be counted towards the college's overall League points to ensure fairness."
    },
    {
      value: "q4",
      title: "Is there a registration fee?",
      content: "Early bird registration is free for the first 50 E-Cells. After that, a nominal League Pass fee applies which covers participation in all 5 tracks."
    }
  ]

  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading 
              title="Frequently Asked Questions" 
              description="Everything you need to know about participating in the E-Cell League 2026."
            />
            <p className="text-text-secondary mb-6">
              Still have questions? Our support team is ready to help you out.
            </p>
            <Button variant="outline">Contact Support</Button>
          </div>
          
          <div>
            <Accordion items={faqs} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
