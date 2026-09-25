"use client"
import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md" aria-label="Main Navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white tracking-tight">E-Cell <span className="text-primary">League</span> 2026</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            <Link href="/competitions" className="text-sm font-medium text-text-secondary transition-colors hover:text-white">Competitions</Link>
            <Link href="/leaderboard" className="text-sm font-medium text-text-secondary transition-colors hover:text-white">Leaderboard</Link>
            <Link href="/schedule" className="text-sm font-medium text-text-secondary transition-colors hover:text-white">Schedule</Link>
            <Link href="/teams" className="text-sm font-medium text-text-secondary transition-colors hover:text-white">Teams</Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-text-secondary">Login</Button>
          <Button variant="default">Register Now</Button>
        </div>

        <button
          className="md:hidden text-text-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background px-4 overflow-hidden"
            id="mobile-menu"
          >
            <div className="flex flex-col space-y-4 py-6">
              <Link href="/competitions" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text-primary">Competitions</Link>
              <Link href="/leaderboard" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text-primary">Leaderboard</Link>
              <Link href="/schedule" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text-primary">Schedule</Link>
              <Link href="/teams" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text-primary">Teams</Link>
              <div className="h-px bg-border my-2" />
              <Button variant="outline" className="w-full justify-center" onClick={() => setIsOpen(false)}>Login</Button>
              <Button variant="default" className="w-full justify-center" onClick={() => setIsOpen(false)}>Register Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
