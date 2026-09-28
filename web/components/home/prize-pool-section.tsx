"use client"
import * as React from "react"
import { Trophy, Rocket, Briefcase, Handshake, Award } from "lucide-react"
import { Container, Section } from "@/components/ui/container"

// ── Bento card primitives ────────────────────────────────────────────────────

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  highlighted?: boolean
  style?: React.CSSProperties
}

function BentoCard({ children, className = "", highlighted = false, style }: BentoCardProps) {
  return (
    <div
      className={`bento-card${highlighted ? " bento-card--highlighted" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

interface IconBoxProps {
  children: React.ReactNode
  accent?: boolean
}

function IconBox({ children, accent = false }: IconBoxProps) {
  return (
    <div className={`bento-icon-box${accent ? " bento-icon-box--accent" : ""}`}>
      {children}
    </div>
  )
}

interface TagPillProps {
  children: React.ReactNode
}

function TagPill({ children }: TagPillProps) {
  return <span className="bento-tag-pill">{children}</span>
}

// ── Section ──────────────────────────────────────────────────────────────────

export function PrizePoolSection() {
  return (
    <>
      <style>{`
        /* ── Design tokens ── */
        .bento-section {
          --bento-bg: #14121c;
          --bento-card-bg: #1d1a28;
          --bento-border: 1px solid #2c2839;
          --bento-radius: 20px;
          --bento-padding: 24px;
          --bento-inner-bg: #0b0a12;
          --bento-accent: #ff4d6d;
          --bento-text: #ffffff;
          --bento-muted: #a29fb0;
          --bento-gap: 16px;
        }

        /* ── Card base ── */
        .bento-card {
          background: var(--bento-card-bg);
          border: var(--bento-border);
          border-radius: var(--bento-radius);
          padding: var(--bento-padding);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          border-color: var(--bento-accent);
        }

        @media (prefers-reduced-motion: reduce) {
          .bento-card {
            transition: none;
          }
          .bento-card:hover {
            transform: none;
          }
        }

        /* ── Highlighted (Prize Pool) card ── */
        .bento-card--highlighted {
          background: radial-gradient(
            circle at 80% 0,
            rgba(255, 77, 109, 0.28),
            transparent 60%
          ), #1d1a28;
          justify-content: center;
        }

        /* ── Grid ── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, auto);
          gap: var(--bento-gap);
          max-width: 1100px;
          margin: 0 auto;
        }

        .bento-card--prize-pool {
          grid-column: 1;
          grid-row: 1 / 3;
        }

        .bento-card--incubation  { grid-column: 2; grid-row: 1; }
        .bento-card--internship  { grid-column: 3; grid-row: 1; }
        .bento-card--networking  { grid-column: 2; grid-row: 2; }
        .bento-card--recognition { grid-column: 3; grid-row: 2; }

        @media (max-width: 820px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
          }
          .bento-card--prize-pool,
          .bento-card--incubation,
          .bento-card--internship,
          .bento-card--networking,
          .bento-card--recognition {
            grid-column: 1;
            grid-row: auto;
          }
        }

        /* ── Icon box ── */
        .bento-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(162, 159, 176, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--bento-muted);
        }

        .bento-icon-box--accent {
          background: rgba(255, 77, 109, 0.14);
          color: var(--bento-accent);
        }

        /* ── Tag pills ── */
        .bento-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .bento-tag-pill {
          font-size: 12px;
          color: var(--bento-muted);
          border: 1px solid #2c2839;
          border-radius: 999px;
          padding: 3px 10px;
          white-space: nowrap;
        }

        /* ── Prize Pool card specifics ── */
        .bento-prize-amount {
          font-size: clamp(40px, 7vw, 64px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(to bottom, #fff 30%, #9a97a8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bento-prize-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--bento-accent);
        }

        .bento-prize-pills {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bento-prize-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bento-inner-bg);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
        }

        .bento-prize-pill__amount {
          color: #ffffff;
          font-weight: 700;
        }

        .bento-prize-pill__label {
          color: var(--bento-muted);
        }

        .bento-prize-description {
          font-size: 13px;
          color: var(--bento-muted);
          line-height: 1.6;
          border-top: 1px solid #2c2839;
          padding-top: 14px;
          margin-top: 4px;
        }

        /* ── Card typography ── */
        .bento-card-title {
          font-size: 19px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }

        .bento-card-description {
          font-size: 14px;
          color: var(--bento-muted);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Section header ── */
        .bento-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--bento-accent);
          margin-bottom: 12px;
        }

        .bento-heading {
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 0 0;
          line-height: 1.15;
        }

        .bento-subtext {
          text-align: center;
          font-size: 16px;
          color: var(--bento-muted);
          max-width: 560px;
          line-height: 1.6;
          margin: 0 auto 48px auto;
        }
      `}</style>

      <section
        className="bento-section"
        style={{ background: "#14121c", padding: "72px 0" }}
        id="why-attend"
      >
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="bento-heading">Why E-Cell League?</h2>
            <p className="bento-subtext">Real capital, real opportunities, real connections.</p>
          </div>

          {/* Bento Grid */}
          <div className="bento-grid">

            {/* Card 1 — Prize Pool */}
            <BentoCard highlighted className="bento-card--prize-pool">
              <IconBox accent>
                <Trophy size={22} strokeWidth={1.8} />
              </IconBox>

              <div>
                <p className="bento-prize-label">Total Prize Pool</p>
                <p className="bento-prize-amount">₹50,000</p>
              </div>

              <div className="bento-prize-pills">
                <div className="bento-prize-pill">
                  <span className="bento-prize-pill__amount">₹25K</span>
                  <span className="bento-prize-pill__label">Champion</span>
                </div>
                <div className="bento-prize-pill">
                  <span className="bento-prize-pill__amount">₹15K</span>
                  <span className="bento-prize-pill__label">Runner-Up</span>
                </div>
                <div className="bento-prize-pill">
                  <span className="bento-prize-pill__amount">₹10K</span>
                  <span className="bento-prize-pill__label">2nd Runner-Up</span>
                </div>
              </div>

              <p className="bento-prize-description">
                Real capital for real builders. Cash prizes for the top three teams.
              </p>
            </BentoCard>

            {/* Card 2 — Incubation */}
            <BentoCard className="bento-card--incubation">
              <IconBox>
                <Rocket size={22} strokeWidth={1.8} />
              </IconBox>
              <h3 className="bento-card-title">Incubation Opportunities</h3>
              <p className="bento-card-description">
                The League Champion gets incubation support to turn promising ideas into real startups.
              </p>
              <div className="bento-tags">
                <TagPill>Mentorship</TagPill>
                <TagPill>Workspace</TagPill>
                <TagPill>Launch Support</TagPill>
              </div>
            </BentoCard>

            {/* Card 3 — Internship */}
            <BentoCard className="bento-card--internship">
              <IconBox>
                <Briefcase size={22} strokeWidth={1.8} />
              </IconBox>
              <h3 className="bento-card-title">Internship Opportunities</h3>
              <p className="bento-card-description">
                Top-performing teams get direct internship pathways with startups in our ecosystem.
              </p>
              <div className="bento-tags">
                <TagPill>Champion</TagPill>
                <TagPill>Runner-Up</TagPill>
                <TagPill>Career Opportunities</TagPill>
              </div>
            </BentoCard>

            {/* Card 4 — Startup Networking */}
            <BentoCard className="bento-card--networking">
              <IconBox>
                <Handshake size={22} strokeWidth={1.8} />
              </IconBox>
              <h3 className="bento-card-title">Startup Networking</h3>
              <p className="bento-card-description">
                Talk directly with founders and operators who have built before you.
              </p>
              <div className="bento-tags">
                <TagPill>Founder Chats</TagPill>
                <TagPill>Ecosystem Intros</TagPill>
              </div>
            </BentoCard>

            {/* Card 5 — Recognition */}
            <BentoCard className="bento-card--recognition">
              <IconBox>
                <Award size={22} strokeWidth={1.8} />
              </IconBox>
              <h3 className="bento-card-title">Recognition</h3>
              <p className="bento-card-description">
All 12 E-Cell teams receive a Certificate of Participation. Track winners earn per-track certificates, and the top three positions take home trophies and certificates.              </p>
              <div className="bento-tags">
                <TagPill>Trophy</TagPill>
                <TagPill>Certificate</TagPill>
              </div>
            </BentoCard>

          </div>
        </Container>
      </section>
    </>
  )
}
