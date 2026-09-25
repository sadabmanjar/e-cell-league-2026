"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  School, 
  UserCheck, 
  Trophy, 
  Calendar, 
  LineChart, 
  Award,
  Megaphone,
  Settings,
  ShieldAlert,
  X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/registrations", label: "Registrations", icon: UserCheck },
  { href: "/ecells", label: "E-Cells", icon: School },
  { href: "/participants", label: "Participants", icon: Users },
  { href: "/competitions", label: "Competitions", icon: Trophy },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/results", label: "Results", icon: LineChart },
  { href: "/leaderboard", label: "Leaderboard", icon: Award },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
  { href: "/users", label: "Users & Roles", icon: ShieldAlert },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname()

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-border flex-shrink-0">
        <span className="font-bold text-white text-lg tracking-tight">E-Cell League<span className="text-primary">.Admin</span></span>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1 text-text-secondary hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href || pathname.startsWith(route.href + '/')
          const Icon = route.icon
          
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-text-secondary hover:bg-surface-alt hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-text-secondary")} />
              {route.label}
            </Link>
          )
        })}
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex-shrink-0 flex flex-col h-screen sticky top-0 hidden md:flex" aria-label="Admin Navigation">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-surface flex-shrink-0 flex flex-col h-screen"
              aria-label="Mobile Admin Navigation"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
