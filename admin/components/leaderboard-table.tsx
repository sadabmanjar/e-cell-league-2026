"use client"
import * as React from "react"
import { LeaderboardRow, LeaderboardRowProps } from "./leaderboard-row"
import { motion } from "framer-motion"

export interface LeaderboardTableProps {
  data: LeaderboardRowProps[];
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  return (
    <div className="w-full border border-border rounded-lg bg-surface overflow-hidden">
      <div className="flex items-center p-4 border-b border-border bg-surface-alt text-xs font-semibold text-text-secondary uppercase tracking-wider">
        <div className="w-10 mr-4 text-center">Rank</div>
        <div className="flex-1">Participant / Team</div>
        <div className="w-24 text-right">Points</div>
      </div>
      <div className="flex flex-col">
        {data.map((row, index) => (
          <motion.div
            key={`${row.name}-${row.rank}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <LeaderboardRow {...row} />
          </motion.div>
        ))}
        {data.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No leaderboard data available yet.
          </div>
        )}
      </div>
    </div>
  )
}
