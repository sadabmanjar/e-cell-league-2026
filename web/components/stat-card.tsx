import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, description, trend, trendUp }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          {icon && <div className="text-primary opacity-80">{icon}</div>}
        </div>
        
        <div className="flex items-baseline gap-2 mt-2">
          <h4 className="text-3xl font-bold">{value}</h4>
          {trend && (
            <span className={cn(
              "text-xs font-semibold",
              trendUp ? "text-green-500" : "text-red-500"
            )}>
              {trendUp ? "+" : ""}{trend}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
