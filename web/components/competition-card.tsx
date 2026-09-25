import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Trophy, ArrowRight } from "lucide-react"

export interface CompetitionCardProps {
  title: string;
  description: string;
  status: "upcoming" | "active" | "completed";
  participantsCount: number;
  date: string;
  prizePool: string;
  onAction?: () => void;
}

export function CompetitionCard({
  title,
  description,
  status,
  participantsCount,
  date,
  prizePool,
  onAction
}: CompetitionCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="h-full"
    >
      <Card className="group flex flex-col h-full overflow-hidden transition-colors hover:border-primary/50 relative bg-surface">
        {/* Subtle hover gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <CardHeader className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <Badge 
              variant={status === "active" ? "default" : status === "upcoming" ? "secondary" : "outline"}
            >
              {status.toUpperCase()}
            </Badge>
            <div className="flex items-center text-primary text-sm font-semibold bg-primary/10 px-2 py-1 rounded">
              <Trophy className="w-3.5 h-3.5 mr-1" />
              {prizePool}
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 relative z-10 mt-2">
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded bg-background flex items-center justify-center mr-3 border border-border group-hover:border-primary/30 transition-colors">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-white">{date}</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded bg-background flex items-center justify-center mr-3 border border-border group-hover:border-primary/30 transition-colors">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span>{participantsCount} Participants</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10 pt-6">
          <Button 
            variant={status === "completed" ? "outline" : "default"} 
            className="w-full group/btn"
            onClick={onAction}
          >
            {status === "completed" ? "View Results" : "View Details"}
            <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
