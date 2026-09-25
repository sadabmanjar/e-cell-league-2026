"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { Trophy, TrendingUp, TrendingDown, Minus, Activity, Filter } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { leaderboardApi, LeaderboardEntry } from "@/lib/api/leaderboard";



interface Competition {
  id: string;
  name: string;
}

import { TRACKS } from "@/data/league";

// --- Official Tracks for Filter ---
const AVAILABLE_COMPETITIONS: Competition[] = [
  { id: "all", name: "Overall Leaderboard" },
  ...TRACKS.map(t => ({ id: t.id, name: t.name })),
];

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isUpdating, setIsUpdating] = useState(false); // For visual flash
  const [selectedComp, setSelectedComp] = useState<string>("all");

  const fetchLeaderboard = async () => {
    try {
      const data = selectedComp === "all" 
        ? await leaderboardApi.getOverall()
        : await leaderboardApi.getByCompetition(selectedComp);
        
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard();
  }, [selectedComp]);

  useEffect(() => {
    // Connect to Socket.IO for live updates using environment variable
    const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3001");

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("leaderboard:update", (data) => {
      console.log("Live update received:", data);
      setIsUpdating(true);
      setLastUpdate(new Date(data.timestamp || new Date()));
      
      // Re-fetch the leaderboard data
      fetchLeaderboard().then(() => {
        // Turn off flash after a short delay
        setTimeout(() => setIsUpdating(false), 1000);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedComp]); // Re-bind socket if selectedComp changes, or keep global

  // Render Trend Icon
  const renderTrend = (trend: "up" | "down" | "steady") => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold font-heading text-white">Live Leaderboard</h1>
            </div>
            <p className="text-text-secondary max-w-lg">
              The official standings for the E-Cell League 2026. Watch the ranks shift in real-time as competition results are published.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Live Status Indicator */}
            <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              connected 
                ? isUpdating ? "bg-primary/20 border-primary text-primary" : "bg-green-950 border-green-500/30 text-green-400" 
                : "bg-surface-alt border-border text-text-secondary"
            }`}>
              {connected ? (
                <>
                  <Activity className={`w-3.5 h-3.5 ${isUpdating ? "animate-spin" : "animate-pulse"}`} />
                  {isUpdating ? "Updating Ranks..." : "Live Connection"}
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  Connecting...
                </>
              )}
            </div>
            {connected && !isUpdating && (
              <p className="text-[10px] text-text-secondary font-mono">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-text-secondary shrink-0" />
          {AVAILABLE_COMPETITIONS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedComp(comp.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedComp === comp.id 
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,77,109,0.3)]" 
                  : "bg-surface border border-border text-text-secondary hover:text-white hover:border-primary/50"
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>

        {/* Leaderboard Table / List */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden relative shadow-2xl">
          {/* Flash Overlay on Update */}
          <AnimatePresence>
            {isUpdating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary pointer-events-none z-10"
              />
            )}
          </AnimatePresence>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface-alt border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-7 md:col-span-5">E-Cell / College</div>
            <div className="hidden md:block col-span-4 text-center">
              {selectedComp === "all" ? "Performance Breakdown" : "Points Awarded"}
            </div>
            <div className="col-span-3 md:col-span-2 text-right">Total Points</div>
          </div>

          {/* Table Body */}
          <div className="min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
                <Activity className="w-8 h-8 animate-pulse mb-3 text-primary/50" />
                <p>Loading current standings...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
                <Trophy className="w-10 h-10 mb-3 opacity-20" />
                <p>No points have been awarded yet.</p>
              </div>
            ) : (
              <div className="flex flex-col relative">
                <AnimatePresence>
                  {entries.map((entry, idx) => (
                    <motion.div
                      key={entry.eCell.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        mass: 1 
                      }}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border/50 last:border-0 hover:bg-surface-alt/30 transition-colors ${
                        entry.rank === 1 ? "bg-yellow-500/5 hover:bg-yellow-500/10" :
                        entry.rank === 2 ? "bg-gray-400/5 hover:bg-gray-400/10" :
                        entry.rank === 3 ? "bg-amber-700/5 hover:bg-amber-700/10" : ""
                      }`}
                      style={{
                        zIndex: entries.length - idx // Ensures higher ranks stay on top during layout animations
                      }}
                    >
                      {/* Rank & Trend */}
                      <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
                        <div className={`text-xl font-bold font-heading flex items-center justify-center w-10 h-10 rounded-full ${
                          entry.rank === 1 ? "bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]" :
                          entry.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                          entry.rank === 3 ? "bg-amber-700/20 text-amber-500" :
                          "bg-surface-alt text-text-secondary"
                        }`}>
                          {entry.rank}
                        </div>
                        <div className="mt-1 flex justify-center">
                          {renderTrend(entry.trend || "steady")}
                        </div>
                      </div>

                      {/* E-Cell Details */}
                      <div className="col-span-7 md:col-span-5">
                        <h3 className="font-semibold text-white text-base truncate">
                          {entry.eCell.name}
                        </h3>
                        <p className="text-sm text-text-secondary truncate">
                          {entry.eCell.collegeName}
                        </p>
                      </div>

                      {/* Performance Breakdown / Breakdown */}
                      <div className="hidden md:flex col-span-4 flex-wrap items-center justify-center gap-2">
                        {selectedComp === "all" && entry.competitionScores ? (
                          entry.competitionScores.length > 0 ? (
                            entry.competitionScores.map(score => (
                              <div key={score.competitionId} className="px-2 py-1 rounded bg-background border border-border text-xs flex gap-1 items-center" title={score.competitionName}>
                                <span className="text-text-secondary max-w-[80px] truncate">{score.competitionName}:</span>
                                <span className="font-semibold text-white">+{score.points}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-text-secondary/50">—</span>
                          )
                        ) : (
                           <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                             + {entry.points || entry.totalPoints} PTS
                           </div>
                        )}
                      </div>

                      {/* Total Points */}
                      <div className="col-span-3 md:col-span-2 text-right">
                        <span className="text-xl md:text-2xl font-bold font-heading text-white">
                          {entry.totalPoints ?? entry.points}
                        </span>
                        <span className="text-xs text-text-secondary ml-1 block md:inline">PTS</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
