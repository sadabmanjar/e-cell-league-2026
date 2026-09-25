"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trophy, Info } from "lucide-react"

import { POINTS_TABLE } from "@/data/league"

export function PointsSystemPlaceholder() {
  const distribution = POINTS_TABLE;
  const title = "Official Points Distribution";
  const description = "Top 6 finishing teams earn League Points. Teams ranking 7th onwards earn 0 points.";

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-surface border border-border">
          <Info className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden bg-surface">
          <div className="flex items-center justify-between p-4 bg-surface-alt border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
            <span>Competition Result</span>
            <span>League Points</span>
          </div>
          <div className="flex flex-col">
            {distribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                <span className="font-medium text-text-primary">{item.label}</span>
                <span className="font-bold text-primary">{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
