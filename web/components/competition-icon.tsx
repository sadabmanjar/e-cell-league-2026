import * as React from "react"
import { cn } from "@/lib/utils"
import { Trophy, Code, Briefcase, Lightbulb, TrendingUp, Zap, Target, Users } from "lucide-react"

export type CompetitionType = "hackathon" | "b-plan" | "case-study" | "pitch" | "trading" | "default";

export interface CompetitionIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: CompetitionType;
  size?: "sm" | "default" | "lg";
}

export function CompetitionIcon({ type, size = "default", className, ...props }: CompetitionIconProps) {
  const Icon = React.useMemo(() => {
    switch (type) {
      case "hackathon": return Code;
      case "b-plan": return Briefcase;
      case "case-study": return Target;
      case "pitch": return Lightbulb;
      case "trading": return TrendingUp;
      default: return Trophy;
    }
  }, [type]);

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    default: "w-12 h-12 p-2.5",
    lg: "w-16 h-16 p-3.5",
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-lg bg-surface border border-border text-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <Icon className="w-full h-full" />
    </div>
  )
}
