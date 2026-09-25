"use client"
import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 origin-left bg-primary z-50", className)}
      style={{ scaleX }}
    />
  )
}
