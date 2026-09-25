import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ChevronDown } from "lucide-react"

export const metadata = {
  title: "FAQ — E-Cell League 2026",
  description: "Frequently asked questions about E-Cell League 2026.",
}

const faqs = [
  {
    q: "What is E-Cell League?",
    a: "E-Cell League is a one-day multi-track collegiate entrepreneurship competition. 12 registered E-Cell teams compete across 5 parallel tracks. Points are aggregated on a live leaderboard, and the team with the highest total wins the League Championship.",
  },
  {
    q: "Who can participate?",
    a: "Any officially registered college E-Cell team can participate. Each participating E-Cell must register through the official portal and secure a League Pass (3-Track or 5-Track).",
  },
  {
    q: "What is the difference between a 3-Track Pass and a 5-Track Pass?",
    a: "A 3-Track Pass allows your E-Cell to compete in any 3 of the 5 tracks (selected at registration and cannot be changed). A 5-Track Pass grants access to all 5 tracks with up to 12 team members.",
  },
  {
    q: "How many team members can we bring?",
    a: "The minimum team size is 6 members and the maximum is 12. Track-specific sizes vary: BizIQ (2 members), The Pitch Lab (1–2), mADverse (2–3), CODEX (4), and Dress-A-Founder (1). All tracks run in parallel so no member can participate in two tracks simultaneously.",
  },
  {
    q: "Can we change our track selection after registering?",
    a: "For 3-Track Pass holders: No. Track selection is fixed upon registration and cannot be changed. For 5-Track Pass holders: All 5 tracks are included, so this does not apply.",
  },
  {
    q: "How are League Points calculated?",
    a: "Top 6 finishing teams in each track earn League Points: 1st Place = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts. 7th place and below earn 0 points. Misconduct deductions are −5 points per violation.",
  },
  {
    q: "What happens in case of a tie?",
    a: "Ties are broken in this order: (1) Team with more 1st-place finishes, (2) Team with more 2nd-place finishes, (3) Organizing Committee decision.",
  },
  {
    q: "What is the prize structure?",
    a: "The total prize pool is ₹50,000. 1st Place: ₹25,000, 2nd Place: ₹15,000, 3rd Place: ₹10,000.",
  },
  {
    q: "When will the event date and schedule be announced?",
    a: "The exact schedule including timings, venue, and room assignments will be shared with every registered Team Lead immediately after registration closes.",
  },
  {
    q: "How do I contact the organizers?",
    a: "For queries, please email us at contact@ecell-league.com. For urgent matters on event day, a point of contact will be shared with registered teams.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Everything you need to know about E-Cell League 2026.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none hover:bg-surface-alt transition-colors">
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
              <p className="text-sm text-text-secondary mb-2">Still have questions?</p>
              <a
                href="mailto:contact@ecell-league.com"
                className="text-primary font-semibold hover:underline"
              >
                contact@ecell-league.com
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
