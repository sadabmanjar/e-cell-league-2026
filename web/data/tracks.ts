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
  tagline: string;
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
  owner: {
    name: string
    phone: string;
  }

  coOwner: {
    name: string
    phone: string
  }
}

export const tracksData: TrackData[] = [
  {
    slug: "biziq",
    number: "01",
    title: "BizIQ",
    originalEvent: "Entrepreneurs Quiz",
    iconName: "BrainCircuit",
      owner: {
    name: "Vansh Agrawal",
    phone: "+91 6307023247",
  },
  coOwner: {
    name: "Ananya Lodhi",
    phone: "+91 9238193024",
  },
    shortDescription: "Test your team's knowledge of the startup ecosystem, business history, and entrepreneurial fundamentals.",
    tagline:"Where business minds battle.....",
    overview: "BizIQ is an entrepreneurship quiz that evaluates teams on their awareness of business landscapes, startup ecosystems, iconic founders, funding rounds, and entrepreneurial history. Fast-paced and intellectually rigorous.",
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
      "Each team must consist of exactly 2 members.",
      "The use of electronic devices during the quiz is strictly prohibited",
      "The Quizmaster’s decision will be final and binding.",
      "Negative marking may apply in specific rounds, as announced by the Quizmaster.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "pitch-lab",
    number: "02",
    title: "The Pitch Lab",
    originalEvent: "B-Plan Challenge",
    iconName: "Lightbulb",
    owner: {
    name: "Prabhdeep Singh Kalsi",
    phone: "+91 7869528561",
  },
  coOwner: {
    name: "",
    phone: "",
  },
    shortDescription: "Present a high-growth startup idea to a panel of mock investors and defend your vision.",
    overview: "Anyone can have an idea. Few can sell one. The Pitch Lab is the League’s startup pitch competition, where participants turn a promising idea into a compelling business proposition backed by market research, a viable revenue model, and a clear go-to-market strategy. Participants will pitch their ideas and defend their business potential before a panel of judges.",
    tagline:" Platfrom to Launch Ideas into bigger opportunities.",
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
      "1–2 members from each E-Cell can participate.",
      "Pitches must be completed within the prescribed time limit; overruns will be stopped.",
      "Ideas must be original or demonstrate significant improvement over an existing model.",
      "Participants should be prepared to substantiate their market research, business model, and go-to-market strategy."
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "madverse",
    number: "03",
    title: "mADverse",
    originalEvent: "Advertisement Showcase",
    iconName: "Presentation",
   owner: {
    name: "Ritika Yadav",
    phone: "+91 9651027150",
  },
  coOwner: {
    name: "Hanshika Dhurve",
    phone: "+91 7898837972",
  },
    shortDescription: "Create a compelling and creative advertising campaign for a product on the spot.",
    overview: "mADverse is a high-energy marketing challenge that tests creativity, quick thinking, persuasive communication, and stage presence. Teams will be given a product two days before the event and must create a creative 1-minute marketing video showcasing the product through an engaging tagline, jingle, skit, or promotional concept. The challenge puts teams’ storytelling, branding, and marketing skills to the test.",
    tagline:"Let your creativity prove you are a MAD genius.",
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
      "2–3 members from each team must participate.",
      "Props must be improvised using available materials",
      "Each team must submit a 1-minute video as part of the challenge.",
      "Content must not be offensive, discriminatory, or inappropriate.",
      "Performance time limits will be strictly enforced, and the judges' decision will be final and binding.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "codex",
    number: "04",
    title: "CODEX",
    originalEvent: "Hackathon",
    iconName: "Code",
         owner: {
    name: "Samridh Sen",
    phone: "+91 8770473662",
  },
  coOwner: {
    name: "",
    phone: "",
  },
    shortDescription: "Build a working technical prototype to solve a specific problem statement within 6 hours.",
    overview: "CODEX is 6-hours hack-a-thon designed to challenge participants to transform ideas into functional solutions. Participants will be given a real-world problem statement and must develop a software or hardware solution within the time limit.The challenge focuses on technical execution, innovation, practical utility, problem-solving, and the ability to build and deliver a working solution under pressure and within a strict time constraint.",
    tagline: "Turn problems into prototype.",
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
      "Exactly 2–4 members from each team must participate.",
      "All core logic and development must be completed during the event.",
      "Open-source libraries and APIs are permitted.",
      "The final submission must include a working demonstration of the solution.",
    ],
    scoring: "Top 6 finishing teams earn League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts.",
  },
  {
    slug: "dress-a-founder",
    number: "05",
    title: "Dress-A-Founder",
    originalEvent: "Dress-A-Founder",
    iconName: "UserCheck",
         owner: {
    name: "Dilip Gupta",
    phone: "+91 9693028104",
  },
  coOwner: {
    name: "Satyam Patel",
    phone: "+91 9301240930",
  },
    shortDescription: "Shape the public persona of a hypothetical founder and manage a PR crisis under pressure.",
    overview: "Dress-A-Founder is a unique founder-impersonation challenge where participants step into the shoes of a renowned founder. Participants must dress and present themselves as the chosen founder while demonstrating their knowledge of the founder’s journey, business, vision, achievements, challenges, and entrepreneurial story. The challenge tests research, confidence, creativity, communication, and the ability to convincingly embody a founder’s persona.",
    tagline:"Embody the founder. Pitch the vision.",
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
      "Exactly 1 member from each E-Cell can participate.",
      "Participants must portray a founder and demonstrate in-depth knowledge of their entrepreneurial journey and business.",
      "Each participant will get 2 minutes for the presentation and 5 Minutes for Q&A.",
      "Responses and presentations must remain realistic and relevant to the chosen founder."
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
