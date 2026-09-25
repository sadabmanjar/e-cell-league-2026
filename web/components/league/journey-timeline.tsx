"use client"
import * as React from "react"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function LeagueJourney() {
  const container = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  const journeySteps = [
    { title: "Registration", desc: "Colleges secure their League Passes and onboard their E-Cells." },
    { title: "Track Selection", desc: "E-Cells assign teams to the 5 competition tracks." },
    { title: "Competition Phase", desc: "Teams compete in hackathons, pitches, and quizzes to secure a Competition Result." },
    { title: "Point Conversion", desc: "Competition Results are converted into Official League Points for the college." },
    { title: "Overall Leaderboard", desc: "League Points determine the college's Overall Leaderboard Position." },
    { title: "Crowning the Champion", desc: "The college with the most points wins the E-Cell League Cup." }
  ]

  useGSAP(() => {
    if (!container.current || !lineRef.current) return;

    // Animate the line drawing down
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    )

    // Animate each step fading in
    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(step,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, { scope: container })

  return (
    <div ref={container} className="relative py-12 max-w-4xl mx-auto">
      {/* Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" />
      
      {/* Animated Foreground Line */}
      <div 
        ref={lineRef}
        className="absolute left-1/2 top-0 w-1 bg-primary -translate-x-1/2 z-0" 
      />

      <div className="space-y-24 relative z-10">
        {journeySteps.map((step, i) => {
          const isEven = i % 2 === 0
          return (
            <div 
              key={i} 
              ref={el => { stepsRef.current[i] = el }}
              className={`flex items-center justify-between w-full ${isEven ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="w-5/12" />
              
              <div className="w-12 h-12 rounded-full bg-surface border-4 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,77,109,0.3)]">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              
              <div className={`w-5/12 ${isEven ? "text-right pr-8" : "text-left pl-8"}`}>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
