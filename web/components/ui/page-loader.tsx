"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function PageLoader({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background", className)}>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <span className="text-sm font-semibold tracking-widest text-primary uppercase">E-Cell League</span>
      </motion.div>
    </div>
  )
}
