"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, MapPin, Trophy, Activity, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { motion } from "framer-motion";
import { ecellsApi, TeamListEntry } from "@/lib/api/ecells";



export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamListEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await ecellsApi.getPublicTeams();
        setTeams(data);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold font-heading text-white">Participating Teams</h1>
          </div>
          <p className="text-text-secondary max-w-2xl text-lg">
            Discover the E-Cells competing in the 2026 League. Click on any team to view their detailed performance and competition history.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
            <Activity className="w-8 h-8 animate-pulse mb-3 text-primary/50" />
            <p>Loading teams...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-surface border border-border rounded-2xl text-text-secondary">
            <Users className="w-10 h-10 mb-3 opacity-20" />
            <p>No teams have registered yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => (
              <Link key={team.id} href={`/teams/${team.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group h-full flex flex-col bg-surface border border-border hover:border-primary/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(255,77,109,0.15)] relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-alt border border-border flex items-center justify-center text-xl font-bold text-text-secondary font-heading">
                          {team.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
                          {team.name}
                        </h3>
                        <p className="text-sm text-text-secondary flex items-center gap-1 line-clamp-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {team.college.city}{team.college.state ? `, ${team.college.state}` : ""}
                        </p>
                      </div>
                    </div>
                    
                    {/* Rank Badge */}
                    {team.rank && (
                      <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                        team.rank === 1 ? "bg-yellow-500/20 text-yellow-500" :
                        team.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                        team.rank === 3 ? "bg-amber-700/20 text-amber-500" :
                        "bg-surface-alt text-text-secondary"
                      }`}>
                        <span className="text-[10px] uppercase font-bold leading-none mb-0.5">Rank</span>
                        <span className="text-sm font-bold font-heading leading-none">{team.rank}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-white font-medium mb-1 line-clamp-1">{team.college.name}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {team.competitions.slice(0, 3).map((comp, i) => (
                        <span key={i} className="px-2 py-1 bg-surface-alt rounded text-xs text-text-secondary">
                          {comp}
                        </span>
                      ))}
                      {team.competitions.length > 3 && (
                        <span className="px-2 py-1 bg-surface-alt rounded text-xs text-text-secondary">
                          +{team.competitions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-white font-bold font-heading">{team.totalPoints}</span>
                      <span className="text-xs text-text-secondary">PTS</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
