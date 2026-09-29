"use client"

import * as React from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/* ------------------------------------------------------------------ */
/* Config: change these to your real data                              */
/* ------------------------------------------------------------------ */
const REGISTRATION_DEADLINE = new Date("2026-10-22T23:59:59+05:30")
const SPOTS_FILLED = 8
const TOTAL_SPOTS = 12

const STATS = [
  { value: "5", label: "Tracks" },
  { value: "12", label: "E-cells" },
  { value: "₹50K", label: "Prize Pool" },
]

const EASE = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* ------------------------------------------------------------------ */
/* Countdown                                                           */
/* ------------------------------------------------------------------ */
function Countdown() {
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now === null ? 0 : Math.max(0, REGISTRATION_DEADLINE.getTime() - now)
  const units = [
    { label: "Days", value: Math.floor(diff / 864e5) },
    { label: "Hrs", value: Math.floor((diff / 36e5) % 24) },
    { label: "Min", value: Math.floor((diff / 6e4) % 60) },
    { label: "Sec", value: Math.floor((diff / 1e3) % 60) },
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
        Registrations close in
      </p>
      <div className="flex gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-[68px] sm:min-w-[80px] rounded-xl border border-border bg-white/5 px-3 py-3 backdrop-blur-sm"
          >
            <p className="text-2xl sm:text-3xl font-bold tabular-nums text-white">
              {now === null ? "--" : String(u.value).padStart(2, "0")}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary">
              {u.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Floating glass card (desktop only, sits in 3D space)                */
/* ------------------------------------------------------------------ */
function FloatCard({
  className,
  delay = 0,
  reduce,
  children,
}: {
  className: string
  delay?: number
  reduce: boolean | null
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{ z: 120 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: reduce ? 0 : [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.8, delay: 0.6 + delay * 0.2 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute hidden lg:block rounded-2xl border border-border bg-background/60 px-5 py-4 text-left shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const reduce = useReducedMotion()

  // Mouse-driven 3D tilt for the whole stage
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-32 border-b border-border"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(155,92,240,0.22),transparent_55%),radial-gradient(circle_at_15%_85%,rgba(255,77,109,0.18),transparent_45%)]" />

        <Container className="relative z-10">
          <motion.div
            style={{
              rotateX: reduce ? 0 : rotateX,
              rotateY: reduce ? 0 : rotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto w-full max-w-6xl py-8"
          >
            {/* Floating cards */}
            <FloatCard reduce={reduce} className="left-0 top-[14%]">
              <p className="text-3xl font-bold text-white">₹50K</p>
              <p className="text-xs text-text-secondary">Total prize pool</p>
            </FloatCard>

            <FloatCard reduce={reduce} delay={1.5} className="right-0 top-[10%]">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-xs text-text-secondary">E-Cells competing</p>
            </FloatCard>

            <FloatCard reduce={reduce} delay={3} className="left-[2%] bottom-[12%]">
              <p className="text-2xl font-bold text-white">5 Tracks</p>
              <p className="text-xs text-text-secondary">Pitch to Operations</p>
            </FloatCard>

            {/* <FloatCard reduce={reduce} delay={2} className="right-[2%] bottom-[14%] min-w-[180px]">
              <p className="text-2xl font-bold text-white">
                {SPOTS_FILLED} / {TOTAL_SPOTS}
              </p>
              <p className="text-xs text-text-secondary">Spots filled</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(SPOTS_FILLED / TOTAL_SPOTS) * 100}%` }}
                  transition={{ duration: 1.4, delay: 1, ease: EASE }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </FloatCard> */}

            {/* Center content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ transformStyle: "preserve-3d" }}
              className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center"
            >
              <motion.div variants={itemVariants} style={{ z: 40 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  Season 1 · Registrations Open
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                style={{ z: 90 }}
                className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)]"
              >
                E-CELL
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  LEAGUE
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} style={{ z: 50 }}>
                <div className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-base font-medium text-primary backdrop-blur-sm lg:text-xl">
                  PUT YOUR E-CELL TO THE TEST
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                style={{ z: 30 }}
                className="max-w-xl text-base leading-relaxed text-text-secondary lg:text-lg"
              >
                12 college E-Cells. 5 tracks. One league. Compete, build and win.
              </motion.p>


              <motion.div variants={itemVariants} style={{ z: 50 }} className="pt-2">
                <Countdown />
              </motion.div>

              <motion.div
                variants={itemVariants}
                style={{ z: 40 }}
                className="flex flex-wrap justify-center gap-4 pt-4"
              >
                <Link href="/passes">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base shadow-[0_8px_30px_rgba(255,77,109,0.35)] transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    Register Your Team
                  </Button>
                </Link>
                <Link href="/league">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-base transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    View League Rules
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- STATS (separate full-width section) ---------------- */}
      <section className="relative border-b border-border py-16 lg:py-24">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <p className="text-4xl font-bold text-white lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wider text-text-secondary lg:text-base">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}