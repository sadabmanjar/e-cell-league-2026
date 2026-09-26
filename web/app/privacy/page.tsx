import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"

export const metadata = {
  title: "Privacy Policy — E-Cell League 2026",
  description: "Privacy policy for E-Cell League 2026.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-text-secondary">Last updated: September 2026</p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
              {[
                {
                  title: "1. Information We Collect",
                  content: "We collect personal information when you register for E-Cell League 2026. This includes your name, college name, email address, contact number, and the names and details of your team members. Payment information is processed securely through our payment provider and is not stored on our servers.",
                },
                {
                  title: "2. How We Use Your Information",
                  content: "Your information is used solely for: managing your registration, communicating event details (schedule, venue, updates), processing payments, maintaining the official leaderboard, and issuing certificates or prizes. We do not sell or share your data with third parties for marketing purposes.",
                },
                {
                  title: "3. Public Information",
                  content: "The leaderboard displays participating E-Cell names, college names, and point standings publicly. Individual participant personal details (phone numbers, email addresses) are never displayed publicly.",
                },
                {
                  title: "4. Data Security",
                  content: "We implement appropriate technical and organizational measures to protect your personal data. All data is transmitted over encrypted connections (HTTPS). Access to registration data is restricted to authorized organizing committee members.",
                },
                {
                  title: "5. Data Retention",
                  content: "Registration and participation data will be retained for a period of up to 2 years after the event for record-keeping, dispute resolution, and historical archives. You may request deletion of your data after the event by contacting us.",
                },
                {
                  title: "6. Cookies",
                  content: "Our website uses essential cookies only — for session management and authentication. We do not use tracking or advertising cookies.",
                },
                {
                  title: "7. Contact",
                  content: "For any privacy-related queries, contact us at: contact@ecell-league.com",
                },
              ].map((section) => (
                <div key={section.title} className="mb-8">
                  <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
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
