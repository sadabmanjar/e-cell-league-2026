"use client"
import * as React from "react"
import { Container, Section } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Trophy } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "framer-motion"
import { PRIZES } from "@/data/league"

gsap.registerPlugin(ScrollTrigger)

const prizeColors = [
  { bg: "bg-yellow-500/20", text: "text-yellow-500", border: "border-yellow-500/50" },
  { bg: "bg-gray-400/20", text: "text-gray-300", border: "border-gray-400/50" },
  { bg: "bg-amber-700/20", text: "text-amber-600", border: "border-amber-700/50" },
]

export function PrizePoolSection() {
  const counterRef = React.useRef<HTMLSpanElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    if (prefersReducedMotion || !counterRef.current) return

    const counter = { val: 0 }
    
    gsap.to(counter, {
      val: 50000,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerHTML = `₹${Math.round(counter.val).toLocaleString('en-IN')}`
        }
      }
    })

    gsap.fromTo(".prize-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [prefersReducedMotion])

  return (
    <Section className="bg-surface-alt border-y border-border overflow-hidden">
      <div ref={containerRef}>
        <Container className="relative">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading 
              title="₹50,000 Prize Pool" 
              description="Real capital for real builders. Win cash prizes, incubation support, and direct connections to the startup ecosystem."
            />
            
            <div className="space-y-6 mt-8">
              {PRIZES.map((prize, i) => (
                <div key={prize.position} className="prize-item flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${prizeColors[i].bg} ${prizeColors[i].text} flex items-center justify-center border ${prizeColors[i].border} shrink-0`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{prize.title}</h4>
                    <p className="text-sm text-text-secondary">{prize.cashLabel}</p>
                    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      {prize.perks.map(perk => (
                        <li key={perk} className="text-xs text-text-secondary opacity-75">{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-6 border-t border-border pt-4">
              All 12 teams receive a Certificate of Participation. Individual track winners also receive per-track certificates.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 aspect-square rounded-full border border-primary/10 bg-primary/5 blur-3xl pointer-events-none" />
            
            <div className="w-full aspect-square bg-background rounded-full border border-primary/30 flex items-center justify-center flex-col shadow-[0_0_50px_rgba(255,77,109,0.2)] relative z-10 transition-transform duration-700 hover:scale-[1.02]">
              <span 
                ref={counterRef} 
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary tabular-nums"
              >
                ₹50,000
              </span>
              <span className="text-xl text-primary font-bold tracking-widest mt-4 uppercase">Total Prize Pool</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
    </Section>
  )
}
