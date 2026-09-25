"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { PassCard } from "@/components/passes/pass-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ShieldCheck, CalendarClock, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"
import { TRACKS, PASSES } from "@/data/league"

export default function PassesPage() {
  const router = useRouter();
  const [selectedPass, setSelectedPass] = React.useState<"3-pass" | "5-pass" | null>(null);
  
  // Track selection state (placeholder logic)
  const [selectedTracks, setSelectedTracks] = React.useState<string[]>([]);
  
  const tracks = TRACKS.map(t => ({
    id: t.id,
    name: t.name,
  }));

  const handleTrackToggle = (trackId: string) => {
    if (selectedTracks.includes(trackId)) {
      setSelectedTracks(selectedTracks.filter(id => id !== trackId));
    } else {
      // Limit selection based on pass type
      const limit = selectedPass === "3-pass" ? 3 : 5;
      if (selectedTracks.length < limit) {
        setSelectedTracks([...selectedTracks, trackId]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Section className="pt-24 pb-12 bg-surface-alt border-b border-border">
          <Container>
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                League Registration Passes
              </h1>
              <p className="text-lg text-text-secondary">
                Select a pass for your E-Cell to enter the 2026 League. Every pass automatically qualifies your college for the Overall League Leaderboard standings.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-background">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PassCard
                title={PASSES.THREE_TRACK.label}
                price={PASSES.THREE_TRACK.priceLabel}
                description="Strategic entry for targeted dominance."
                eligibility="Officially recognized College E-Cells only."
                isPopular={false}
                features={[
                  { text: PASSES.THREE_TRACK.features[0], included: true },
                  { text: PASSES.THREE_TRACK.features[1], included: true },
                  { text: PASSES.THREE_TRACK.features[2], included: true },
                  { text: PASSES.THREE_TRACK.restrictions[0], included: true },
                  { text: PASSES.THREE_TRACK.restrictions[1], included: true },
                  { text: PASSES.THREE_TRACK.restrictions[2], included: true },
                ]}
                onSelect={() => {
                  setSelectedPass("3-pass");
                  setSelectedTracks([]);
                }}
              />
              
              <PassCard
                title={PASSES.FIVE_TRACK.label}
                price={PASSES.FIVE_TRACK.priceLabel}
                description="All-access entry to maximize League points."
                eligibility="Officially recognized College E-Cells only."
                isPopular={true}
                features={[
                  { text: PASSES.FIVE_TRACK.features[0], included: true },
                  { text: PASSES.FIVE_TRACK.features[1], included: true },
                  { text: PASSES.FIVE_TRACK.features[2], included: true },
                  { text: PASSES.FIVE_TRACK.features[3], included: true },
                  { text: PASSES.FIVE_TRACK.restrictions[0], included: true },
                  { text: PASSES.FIVE_TRACK.restrictions[1], included: true },
                ]}
                onSelect={() => {
                  setSelectedPass("5-pass");
                  setSelectedTracks(tracks.map(t => t.id)); // Select all automatically
                }}
              />
            </div>

            {/* Selection Configuration UI */}
            {selectedPass && (
              <div className="max-w-4xl mx-auto mt-16 p-8 border border-border rounded-xl bg-surface animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeading 
                  title="Configure Your Registration" 
                  description={`You have selected the ${selectedPass === "3-pass" ? "3-Track" : "5-Track"} Pass. Please verify your track selections.`}
                />
                
                <div className="grid md:grid-cols-2 gap-12 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Select Tracks
                    </h3>
                    
                    <div className="space-y-4">
                      {tracks.map(track => {
                        const isSelected = selectedTracks.includes(track.id);
                        const isDisabled = !isSelected && selectedPass === "3-pass" && selectedTracks.length >= 3;
                        
                        return (
                          <div 
                            key={track.id} 
                            className={`flex items-center justify-between p-4 rounded-lg border ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-background'} ${isDisabled ? 'opacity-50' : 'cursor-pointer hover:border-primary/50'}`}
                            onClick={() => !isDisabled && handleTrackToggle(track.id)}
                          >
                            <Checkbox 
                              checked={isSelected}
                              disabled={isDisabled}
                              className="pointer-events-none"
                              id={`check-${track.id}`}
                            />
                            <label htmlFor={`check-${track.id}`} className="flex-1 ml-3 font-medium text-text-primary cursor-pointer">
                              {track.name}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                    
                    {selectedPass === "3-pass" && (
                      <p className="text-sm text-text-secondary mt-4">
                        Selected: <span className="font-bold text-white">{selectedTracks.length} / 3</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-background border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 border-b border-border pb-4">Registration Summary</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Pass Type</span>
                          <span className="font-medium text-white">{selectedPass === "3-pass" ? "3-Track Pass" : "5-Track Pass"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">League Registration</span>
                          <span className="font-medium text-green-500">Included</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-border pt-3 mt-3">
                          <span className="text-white">Total Amount</span>
                          <span className="text-primary">{selectedPass === "3-pass" ? PASSES.THREE_TRACK.priceLabel : PASSES.FIVE_TRACK.priceLabel}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full"
                        disabled={selectedPass === "3-pass" && selectedTracks.length !== 3}
                        onClick={() => router.push(`/register?pass=${selectedPass}`)}
                      >
                        Proceed to Checkout
                      </Button>
                      {selectedPass === "3-pass" && selectedTracks.length !== 3 && (
                        <p className="text-xs text-center text-red-400 mt-3">
                          Please select exactly 3 tracks to continue.
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-surface-alt rounded-lg border border-border">
                      <ShieldCheck className="w-5 h-5 text-text-secondary shrink-0" />
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Payment processing is currently in test mode. Registrations are not active yet. Selecting "Proceed to Checkout" will integrate with the backend portal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  )
}
