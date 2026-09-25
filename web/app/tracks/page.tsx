import * as React from "react"
import Link from "next/link"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { tracksData, getIconComponent } from "@/data/tracks"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default function TracksIndexPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Section className="pt-24 pb-12 bg-surface-alt border-b border-border">
          <Container>
            <SectionHeading 
              title="Competition Tracks" 
              description="Explore the 5 distinct challenges of the E-Cell League 2026. Choose your arena, assemble your team, and prepare for battle."
            />
          </Container>
        </Section>
        
        <Section className="bg-background">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracksData.map((track) => {
                const Icon = getIconComponent(track.iconName);
                return (
                  <Card key={track.slug} className="flex flex-col h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center mb-4 border border-border text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{track.title}</CardTitle>
                      <CardDescription>{track.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-col gap-2 text-sm text-text-secondary">
                        <div className="flex justify-between border-b border-border pb-1">
                          <span>Format:</span>
                          <span className="text-text-primary text-right max-w-[60%] truncate">{track.format}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-1">
                          <span>Team Size:</span>
                          <span className="text-text-primary">{track.teamSize}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-1">
                          <span>Duration:</span>
                          <span className="text-text-primary">{track.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/tracks/${track.slug}`} className="w-full">
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  )
}
