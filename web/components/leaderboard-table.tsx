"use client"
import * as React from "react"
import { LeaderboardRow, LeaderboardRowProps } from "./leaderboard-row"
import { motion, AnimatePresence } from "framer-motion"

export interface LeaderboardTableProps {
  data: LeaderboardRowProps[];
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  return (
    <div className="w-full border border-border rounded-lg bg-surface overflow-hidden">
      <div className="hidden md:flex items-center p-4 border-b border-border bg-surface-alt text-xs font-semibold text-text-secondary uppercase tracking-wider">
        <div className="w-10 mr-4 text-center">Rank</div>
        <div className="flex-1">Participant / Team</div>
        <div className="w-24 text-right">Points</div>
      </div>
      <motion.div layout className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {data.map((row, index) => (
            <motion.div
              key={row.name} // Keying by name instead of rank ensures layout transitions work when ranks change
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                bounce: 0.3,
                delay: index * 0.05 
              }}
              className="relative bg-background border-b border-border/50 last:border-0 z-10"
            >
              <LeaderboardRow {...row} />
            </motion.div>
          ))}
        </AnimatePresence>
        {data.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No leaderboard data available yet.
          </div>
        )}
      </motion.div>
    </div>
  )
}
