import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { LeagueIntroSection } from "@/components/home/intro-section"
import { CompetitionTracksSection } from "@/components/home/tracks-section"
import { GuidelinesPreviewSection } from "@/components/home/guidelines-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { PassesSection } from "@/components/home/passes-section"
import { PrizePoolSection } from "@/components/home/prize-pool-section"
import { TimelineSection } from "@/components/home/timeline-section"
import { LeaderboardPreviewSection } from "@/components/home/leaderboard-preview-section"
import { FAQSection } from "@/components/home/faq-section"
import { FinalCTASection } from "@/components/home/cta-section"
import { BackToTop } from "@/components/ui/back-to-top"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollProgress />
      <Navigation />
      
      <main className="flex-1">
        <HeroSection />
        <LeagueIntroSection />
        <CompetitionTracksSection />
        <GuidelinesPreviewSection />
        <HowItWorksSection />
        <PassesSection />
        <PrizePoolSection />
        <TimelineSection />
        <LeaderboardPreviewSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  )
}
