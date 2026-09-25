/**
 * Official Track Detail Data — E-Cell League Season 1
 * Source: Official League Handbook
 *
 * This replaces all previous generic track descriptions.
 * The official track names, slugs, and team sizes are canonical.
 */
import { Code, Lightbulb, Presentation, BrainCircuit, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TrackData {
  slug: string;         // Matches TRACKS[n].id in league.ts
  number: string;       // Official display number e.g. "01"
  title: string;        // Official display name e.g. "BizIQ"
  originalEvent: string; // Original event name e.g. "Entrepreneurs Quiz"
  iconName: "Code" | "Lightbulb" | "Presentation" | "BrainCircuit" | "UserCheck";
  shortDescription: string;
  overview: string;
  teamSize: string;
  teamSizeMin: number;
  teamSizeMax: number;
  format: string;
  duration: string;
  preparation: string;
  process: string[];
  judgingCriteria: string[];
  rules: string[];
  scoring: string;
}

export const tracksData: TrackData[] = [
  {
    slug: "biziq",
    number: "01",
    title: "BizIQ",
    originalEvent: "Entrepreneurs Quiz",
    iconName: "BrainCircuit",
    shortDescription: "Test your team's knowledge of the startup ecosystem, business history, and entrepreneurial fundamentals.",
    overview: "BizIQ is a rapid-fire entrepreneurship quiz that evaluates teams on their awareness of business landscapes, startup ecosystems, iconic founders, funding rounds, and entrepreneurial history. Fast-paced and intellectually rigorous.",
    teamSize: "2 members",
    teamSizeMin: 2,
    teamSizeMax: 2,
    format: "Multi-round quiz format",
    duration: "Slot to be shared after registration closes",
    preparation: "Stay updated on recent funding news, iconic startup stories, business terminology, and major acquisitions.",
    process: [
      "Round 1: Written preliminary test covering general business awareness.",
      "Round 2: Top teams proceed to the on-stage finals.",
      "Finals: Includes direct questions, buzzer rounds, and audio-visual identification.",
    ],
    judgingCriteria: [
      "Accuracy of answers",
      "Speed of response (in buzzer rounds)",
      "Strategic risk-taking in negative-marking rounds",
    ],
    rules: [
      "Exactly 2 members from your team must participate.",
      "Use of electronic devices during the quiz is strictly prohibited.",
      "The quizmaster's decision is final and binding.",
      "Negative marking may apply in specific rounds as announced.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "pitch-lab",
    number: "02",
    title: "The Pitch Lab",
    originalEvent: "B-Plan Challenge",
    iconName: "Lightbulb",
    shortDescription: "Present a high-growth startup idea to a panel of mock investors and defend your vision.",
    overview: "The Pitch Lab is the ultimate test of a founder's ability to sell a vision. Teams must present a compelling, scalable startup idea backed by market research, a solid revenue model, and a clear go-to-market strategy.",
    teamSize: "1–2 members",
    teamSizeMin: 1,
    teamSizeMax: 2,
    format: "Pitch Deck Presentation (Pitch + Q&A)",
    duration: "Slot to be shared after registration closes",
    preparation: "Prepare a concise pitch deck. Focus on problem, solution, market size, competition, revenue model, and financial projections.",
    process: [
      "Pitch: Present your core business model to the panel within the allotted time.",
      "Q&A: Rigorous questioning by the judges follows the pitch.",
    ],
    judgingCriteria: [
      "Innovation and viability of the idea",
      "Market understanding and competitive analysis",
      "Clarity of the revenue model",
      "Presentation skills and handling of Q&A",
    ],
    rules: [
      "1–2 members from your team may participate.",
      "Pitches must strictly adhere to the time limit.",
      "Ideas must be original or significant improvements on existing models.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "madverse",
    number: "03",
    title: "mADverse",
    originalEvent: "Ad-Mad Show",
    iconName: "Presentation",
    shortDescription: "Create a compelling and creative advertising campaign for a product on the spot.",
    overview: "mADverse tests marketing creativity, quick thinking, and stage presence. Teams are given a product and must instantly craft a persuasive marketing pitch, complete with a jingle, tagline, and skit.",
    teamSize: "2–3 members",
    teamSizeMin: 2,
    teamSizeMax: 3,
    format: "Impromptu Ad Campaign Performance",
    duration: "Slot to be shared after registration closes",
    preparation: "Practice quick brainstorming, scriptwriting, and acting. Study memorable ad campaigns.",
    process: [
      "Prompt: Teams receive a product and target audience.",
      "Ideation: Preparation time is provided.",
      "Performance: Teams perform their advertisement within the time limit.",
    ],
    judgingCriteria: [
      "Creativity and originality",
      "Spontaneity and stage presence",
      "Clarity of the marketing message",
      "Audience engagement",
    ],
    rules: [
      "2–3 members from your team must participate.",
      "Props must be improvised from available materials.",
      "No offensive, discriminatory, or inappropriate content.",
      "Time limits for performance will be strictly enforced.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "codex",
    number: "04",
    title: "CODEX",
    originalEvent: "Hackathon",
    iconName: "Code",
    shortDescription: "Build a working technical prototype to solve a specific problem statement within the event day.",
    overview: "CODEX is the technical track of E-Cell League. Teams must develop a software or hardware solution to a problem statement. Emphasizes technical execution, practical utility, and the ability to build under pressure.",
    teamSize: "4 members",
    teamSizeMin: 4,
    teamSizeMax: 4,
    format: "Single-day development sprint",
    duration: "Slot to be shared after registration closes",
    preparation: "Set up development environments and choose tech stacks. No pre-written project logic allowed; only boilerplates and libraries.",
    process: [
      "Kickoff: Problem statement is released.",
      "Development: Teams build within the allotted event-day time.",
      "Demo: Final presentation of the working prototype to judges.",
    ],
    judgingCriteria: [
      "Technical complexity and execution",
      "UI/UX and design",
      "Relevance to the problem statement",
      "Completeness of the prototype",
    ],
    rules: [
      "Exactly 4 members from your team must participate.",
      "All core logic must be written during the event.",
      "Open-source libraries and APIs are allowed.",
      "Final submission must include a working demo.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "dress-a-founder",
    number: "05",
    title: "Dress-A-Founder",
    originalEvent: "Dress-A-Founder",
    iconName: "UserCheck",
    shortDescription: "Shape the public persona of a hypothetical founder and manage a PR crisis under pressure.",
    overview: "In this unique challenge, one team member takes on the role of shaping a founder's personal brand. You'll tackle PR scenarios, manage messaging strategy, and 'dress' the founder's image — from communication style to public positioning.",
    teamSize: "1 member",
    teamSizeMin: 1,
    teamSizeMax: 1,
    format: "Crisis Simulation & Strategy Presentation",
    duration: "Slot to be shared after registration closes",
    preparation: "Understand public relations, crisis management strategies, and personal branding in the startup world.",
    process: [
      "The Scenario: A detailed PR situation involving a founder is provided.",
      "Strategy: Time is given to develop a response and rebranding approach.",
      "Presentation: Present your strategy and face judge Q&A.",
    ],
    judgingCriteria: [
      "Effectiveness of the crisis response",
      "Empathy and tone of the messaging",
      "Strategic rebranding approach",
      "Poise under pressure during the Q&A",
    ],
    rules: [
      "Exactly 1 member from your team participates.",
      "Responses must be realistic within the scenario.",
      "Strict time limits on preparation and presentation.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
];

export function getIconComponent(name: TrackData["iconName"]): LucideIcon {
  switch (name) {
    case "Code": return Code;
    case "Lightbulb": return Lightbulb;
    case "Presentation": return Presentation;
    case "BrainCircuit": return BrainCircuit;
    case "UserCheck": return UserCheck;
    default: return Lightbulb;
  }
}
