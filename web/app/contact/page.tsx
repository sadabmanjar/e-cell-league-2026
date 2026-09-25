import * as React from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Container, Section } from "@/components/ui/container"
import { Mail, MessageSquare } from "lucide-react"

export const metadata = {
  title: "Contact Us — E-Cell League 2026",
  description: "Get in touch with the E-Cell League organizing committee.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Have a question about E-Cell League 2026? Reach out to the organizing committee.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-surface border border-border rounded-xl flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">General Inquiries</p>
                    <a href="mailto:contact@ecell-league.com" className="text-sm text-primary hover:underline">
                      contact@ecell-league.com
                    </a>
                  </div>
                </div>
                <div className="p-6 bg-surface border border-border rounded-xl flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Registration Support</p>
                    <a href="mailto:register@ecell-league.com" className="text-sm text-primary hover:underline">
                      register@ecell-league.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-surface border border-border rounded-xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="college" className="block text-sm font-medium text-white mb-1.5">
                      College / E-Cell Name
                    </label>
                    <input
                      id="college"
                      type="text"
                      placeholder="Your college or E-Cell name"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-1.5">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="What is your query about?"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Describe your query in detail..."
                      className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
