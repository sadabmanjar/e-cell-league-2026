import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"

export const metadata = {
  title: "Terms & Conditions — E-Cell League 2026",
  description: "Terms and conditions for participating in E-Cell League 2026.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Terms & <span className="text-primary">Conditions</span>
              </h1>
              <p className="text-text-secondary">Last updated: September 2026</p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto">
              {[
                {
                  title: "1. Acceptance of Terms",
                  content: "By registering for E-Cell League 2026, you agree to be bound by these Terms and Conditions and all applicable rules, guidelines, and policies. Participation implies full acceptance of all terms.",
                },
                {
                  title: "2. Eligibility",
                  content: "Participation is open to officially registered collegiate E-Cell teams only. Each team must be affiliated with a recognized educational institution. Teams must complete registration by the deadline and pay the applicable League Pass fee.",
                },
                {
                  title: "3. Registration & Payment",
                  content: "Registration is confirmed only upon successful payment of the League Pass fee via the official payment gateway. Fees are non-refundable once registration is confirmed. In the event of cancellation by the organizers, a full refund will be issued.",
                },
                {
                  title: "4. Track Selection (3-Track Pass)",
                  content: "Teams registering with a 3-Track Pass must select their 3 tracks at the time of registration. This selection is final and cannot be changed after the registration is submitted.",
                },
                {
                  title: "5. Code of Conduct",
                  content: "All participants are expected to maintain the highest standards of sportsmanship and conduct. The Organizing Committee reserves the right to disqualify any team for disruptive, dishonest, or unsportsmanlike behavior. Misconduct violations result in a −5 League Point deduction per incident.",
                },
                {
                  title: "6. Intellectual Property",
                  content: "Ideas, presentations, and materials created for The Pitch Lab and other tracks remain the intellectual property of the creating team. By participating, you grant the Organizing Committee the right to photograph, record, and publish event footage for promotional purposes.",
                },
                {
                  title: "7. Decisions and Disputes",
                  content: "All decisions by the Organizing Committee and track judges are final. No appeals will be entertained after results are announced. Tie-breaking procedures as specified in the official handbook will be followed.",
                },
                {
                  title: "8. Liability",
                  content: "The Organizing Committee is not responsible for any loss, injury, or damage suffered by participants during the event. Participants attend at their own risk and are responsible for their own travel, accommodation, and personal safety.",
                },
                {
                  title: "9. Amendments",
                  content: "The Organizing Committee reserves the right to amend these terms at any time. Registered teams will be notified of any significant changes via email.",
                },
                {
                  title: "10. Contact",
                  content: "For queries regarding these Terms, contact: contact@ecell-league.com",
                },
              ].map((section) => (
                <div key={section.title} className="mb-8 p-5 bg-surface border border-border rounded-xl">
                  <h2 className="text-base font-bold text-white mb-3">{section.title}</h2>
                  <p className="text-text-secondary leading-relaxed text-sm">{section.content}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
