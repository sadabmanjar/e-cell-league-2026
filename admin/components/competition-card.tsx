import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Trophy } from "lucide-react"

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
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,77,109,0.1)]">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant={status === "active" ? "default" : status === "upcoming" ? "secondary" : "outline"}
          >
            {status.toUpperCase()}
          </Badge>
          <div className="flex items-center text-primary text-sm font-semibold">
            <Trophy className="w-4 h-4 mr-1" />
            {prizePool}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex flex-col gap-2 text-sm text-text-secondary">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 opacity-70" />
            {date}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 opacity-70" />
            {participantsCount} Participants
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={status === "completed" ? "outline" : "default"} 
          className="w-full"
          onClick={onAction}
        >
          {status === "completed" ? "View Results" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}
