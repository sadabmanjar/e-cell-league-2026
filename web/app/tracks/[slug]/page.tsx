"use client";
import * as React from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { tracksData, getIconComponent } from "@/data/tracks";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Users,
  BookOpen,
  AlertTriangle,
  Phone,
  Mail,
  UserRound,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";

export default function TrackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  type CodexProblemStatement = {
  id: string;
  title: string;
  description: string;
};

type CodexTheme = {
  id: string;
  name: string;
  problemStatements: CodexProblemStatement[];
};
  const resolvedParams = React.use(params);
  const track = tracksData.find((t) => t.slug === resolvedParams.slug);
  const [codexThemes, setCodexThemes] = React.useState<CodexTheme[]>([]);
const [codexRevealed, setCodexRevealed] = React.useState(false);
const [codexRevealAt, setCodexRevealAt] = React.useState<string | null>(null);
const [codexLoading, setCodexLoading] = React.useState(false);

  if (!track) {
    notFound();
  }

  const IconComponent = getIconComponent(track.iconName);
   React.useEffect(() => {
  if (track?.slug !== "codex") return;

  const fetchCodexProblemStatements = async () => {
    try {
      setCodexLoading(true);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const response = await fetch(
        `${apiUrl}/competitions/codex/problem-statements`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CODEX problem statements");
      }

      const data = await response.json();

      setCodexRevealed(data.revealed);
      setCodexRevealAt(data.revealAt);

      if (data.revealed) {
  setCodexThemes(data.themes || []);
} else {
  setCodexThemes([]);
}
    } catch (error) {
      console.error("CODEX problem statement fetch error:", error);
    } finally {
      setCodexLoading(false);
    }
  };

  fetchCodexProblemStatements();
}, [track?.slug]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <Section className="pt-24 pb-16 bg-surface-alt border-b border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
            {React.createElement(IconComponent, { className: "w-96 h-96" })}
          </div>
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center border border-primary/30 text-primary">
                {React.createElement(IconComponent, { className: "w-8 h-8" })}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-primary mb-2 font-medium">
                  <Link href="/tracks" className="hover:underline">
                    Tracks
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-text-secondary">{track.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {track.title}
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
                  {track.tagline}
                </p>
              </div>
            </div>

            <p className="text-xl text-text-secondary max-w-3xl leading-relaxed mb-10">
              {track.overview}
            </p>
          </Container>
        </Section>

        {/* Detail Sections */}
        <Section className="bg-background">
          <Container>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      Rules
                    </h2>
                    <ul className="space-y-3">
                      {track.rules.map((rule, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
          
{/* CODEX Problem Statements */}
{track.slug === "codex" && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mt-16"
  >
    {!codexRevealed ? (
      <div className="bg-surface rounded-xl border border-border p-8 md:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <LockKeyhole className="w-72 h-72" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto mb-5 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <LockKeyhole className="w-7 h-7" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Problem Statements
          </h2>

          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed mb-6">
            The CODEX problem statements are currently locked.
            They will be revealed automatically on the event day.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border text-sm text-text-secondary">
            <LockKeyhole className="w-4 h-4 text-primary" />
            <span>Reveals on Event Day</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Problem Statements
          </h2>

          <p className="text-text-secondary">
            Explore the problem statements across different themes.
          </p>
        </div>

        {/* Themes */}
        {codexThemes.map((theme) => (
          <div key={theme.id} className="space-y-6">

            {/* Theme Header */}
            <div className="border-b border-border pb-4">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                    Theme
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {theme.name}
                  </h3>
                </div>

                <span className="text-sm text-text-secondary">
                  {theme.problemStatements.length}{" "}
                  {theme.problemStatements.length === 1
                    ? "Problem Statement"
                    : "Problem Statements"}
                </span>
              </div>
            </div>
  
            {/* Theme Problem Statements */}
            <div className="space-y-4">
              {theme.problemStatements.map((problem, index) => (
                <div
                  key={problem.id}
                  className="bg-surface rounded-xl border border-border p-6 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary mb-1">
                        {problem.id}
                      </p>

                      <h4 className="text-lg md:text-xl font-semibold text-white mb-3">
                        {problem.title}
                      </h4>

                      <p className="text-text-secondary leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    )}
  </motion.div>
)}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Track Contacts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-surface rounded-xl border border-border p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-border pb-4">
                    Track Contacts
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                        Track Owner
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                          <UserRound className="w-5 h-5" />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {track.owner.name}
                          </p>

                          <a
                            href={`tel:${track.owner.phone}`}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mt-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {track.owner.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                        Co-Owner
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                          <UserRound className="w-5 h-5" />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {track.coOwner.name}
                          </p>

                          <a
                            href={`tel:${track.coOwner.phone}`}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mt-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {track.coOwner.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {track.coOwner2 && (
                      <div>
                        <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                          Co-Owner 2
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                            <UserRound className="w-5 h-5" />
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {track.coOwner2?.name}
                            </p>

                            <a
                              href={`tel:${track.coOwner2?.phone}`}
                              className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mt-1"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {track.coOwner2?.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
