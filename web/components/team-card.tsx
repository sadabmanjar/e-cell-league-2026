import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isLeader?: boolean;
}

export interface TeamCardProps {
  teamName: string;
  members: TeamMember[];
  college: string;
  status: "pending" | "approved" | "rejected";
}

export function TeamCard({ teamName, members, college, status }: TeamCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-1">{teamName}</h3>
            <p className="text-sm text-text-secondary">{college}</p>
          </div>
          <Badge 
            variant={status === "approved" ? "default" : status === "rejected" ? "destructive" : "outline"}
          >
            {status.toUpperCase()}
          </Badge>
        </div>
        
        <div className="space-y-3 mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Team Members</h4>
          {members.map(member => (
            <div key={member.id} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0 last:pb-0">
              <span className="font-medium text-text-primary flex items-center gap-2">
                {member.name}
                {member.isLeader && <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">Leader</Badge>}
              </span>
              <span className="text-text-secondary">{member.role}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
