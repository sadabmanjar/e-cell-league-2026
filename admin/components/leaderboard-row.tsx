import * as React from "react"
import { cn } from "@/lib/utils"

export interface LeaderboardRowProps {
  rank: number;
  name: string;
  points: number;
  college: string;
  trend?: "up" | "down" | "neutral";
}

export function LeaderboardRow({ rank, name, points, college, trend = "neutral" }: LeaderboardRowProps) {
  return (
    <div className="flex items-center p-4 border-b border-border hover:bg-surface-alt transition-colors">
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full font-bold mr-4",
        rank === 1 ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50" : 
        rank === 2 ? "bg-gray-400/20 text-gray-300 border border-gray-400/50" :
        rank === 3 ? "bg-amber-700/20 text-amber-600 border border-amber-700/50" :
        "bg-surface text-text-secondary border border-border"
      )}>
        {rank}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-text-primary truncate">{name}</p>
        <p className="text-sm text-text-secondary truncate">{college}</p>
      </div>
      
      <div className="flex items-center gap-3 text-right ml-4">
        <div className="flex flex-col">
          <span className="font-bold text-primary">{points.toLocaleString()}</span>
          <span className="text-xs text-text-secondary uppercase">Points</span>
        </div>
        
        {trend !== "neutral" && (
          <div className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full",
            trend === "up" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
          )}>
            {trend === "up" ? "↑" : "↓"}
          </div>
        )}
      </div>
    </div>
  )
}
