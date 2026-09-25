"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Trophy, ArrowLeft, Link as LinkIcon, Activity, Medal } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { motion } from "framer-motion";
import { ecellsApi, TeamDetail } from "@/lib/api/ecells";



export default function TeamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await ecellsApi.getPublicTeamBySlug(slug);
        setTeam(data);
      } catch (err) {
        console.error("Failed to fetch team:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchTeam();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-[60vh] text-text-secondary">
          <Activity className="w-8 h-8 animate-pulse mb-3 text-primary/50" />
          <p>Loading team profile...</p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-background text-text-primary">
        <Navigation />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Team Not Found</h1>
          <p className="text-text-secondary mb-8">The E-Cell you are looking for does not exist or has not been approved yet.</p>
          <Link href="/teams" className="text-primary hover:text-white transition-colors">
            ← Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/teams" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to all teams
        </Link>

        {/* Profile Header */}
        <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
          {/* Subtle background glow based on rank */}
          {team.rank && team.rank <= 3 && (
            <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none ${
              team.rank === 1 ? "bg-yellow-500" :
              team.rank === 2 ? "bg-gray-400" : "bg-amber-700"
            }`} />
          )}

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            {team.logo ? (
              <img src={team.logo} alt={team.name} className="w-32 h-32 rounded-full object-cover border-4 border-surface-alt shadow-xl" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-surface-alt border-4 border-border flex items-center justify-center text-5xl font-bold text-text-secondary font-heading shadow-xl">
                {team.name.charAt(0)}
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">{team.name}</h1>
              <h2 className="text-xl text-text-secondary mb-4">{team.college.name}</h2>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  {team.college.city}{team.college.state ? `, ${team.college.state}` : ""}
                </div>
                {team.socialLinks && (
                  <a href={team.socialLinks} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    Website / Socials
                  </a>
                )}
              </div>
            </div>

            {/* Stats Block */}
            <div className="flex gap-4 md:flex-col shrink-0 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-background border border-border rounded-xl p-4 text-center min-w-[120px]">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Global Rank</div>
                <div className="text-3xl font-bold font-heading text-white">
                  {team.rank ? `#${team.rank}` : "-"}
                </div>
              </div>
              <div className="flex-1 md:flex-none bg-primary/10 border border-primary/20 rounded-xl p-4 text-center min-w-[120px]">
                <div className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Total Points</div>
                <div className="text-3xl font-bold font-heading text-primary">
                  {team.totalPoints}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Stats & Competitions */}
          <div className="space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">League Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> First Places
                  </span>
                  <span className="font-bold text-white">{team.stats.wins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary flex items-center gap-2">
                    <Medal className="w-4 h-4" /> Top 3 Finishes
                  </span>
                  <span className="font-bold text-white">{team.stats.topThree}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Competitions
                  </span>
                  <span className="font-bold text-white">{team.participatingCompetitions.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Registered For</h3>
              <div className="flex flex-col gap-2">
                {team.participatingCompetitions.length > 0 ? (
                  team.participatingCompetitions.map(comp => (
                    <div key={comp} className="px-3 py-2 bg-surface-alt rounded-lg text-sm text-text-secondary border border-border/50">
                      {comp}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-secondary">No competitions registered yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Performance Breakdown */}
          <div className="md:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-6 h-full">
              <h3 className="text-lg font-bold text-white mb-6">Performance Breakdown</h3>
              
              {team.performance.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-text-secondary text-sm">
                  <Trophy className="w-8 h-8 mb-2 opacity-20" />
                  <p>No results published for this team yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {team.performance.map((perf, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex items-center justify-between p-4 bg-background border border-border rounded-xl"
                    >
                      <div>
                        <h4 className="font-semibold text-white">{perf.competitionName}</h4>
                        <div className="text-xs mt-1 flex items-center gap-2">
                          {perf.isPublished ? (
                            <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Official</span>
                          ) : (
                            <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">Draft / Pending</span>
                          )}
                          {perf.rankAchieved && (
                            <span className="text-text-secondary">Rank: {perf.rankAchieved}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold font-heading text-primary block">+{perf.pointsAwarded}</span>
                        <span className="text-[10px] text-text-secondary uppercase">Points</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
