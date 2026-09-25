/**
 * E-CELL LEAGUE — Official League Configuration
 * Season 1 · One Day Event
 *
 * This file is the SINGLE SOURCE OF TRUTH for all official league information.
 * All data here is sourced directly from the Official League Handbook.
 * Do NOT modify these values without updating the handbook.
 */

// ── League Identity ────────────────────────────────────────────────────────────

export const LEAGUE = {
  name: "E-Cell League",
  tagline: "It's Not Just a League. It's a Launch Pad",
  season: "Season 1",
  format: "One Day Event",
  totalTeams: 12,
  totalTracks: 5,
  teamSizeMin: 6,
  teamSizeMax: 12,
  registrationMethod: "First-come, first-served",
  prizePool: 50000,
} as const;

// ── Official Tracks ────────────────────────────────────────────────────────────

export interface OfficialTrack {
  id: string;         // DB slug / identifier
  number: string;     // Display number e.g. "01"
  name: string;       // Official display name e.g. "BizIQ"
  originalEvent: string; // Original event name e.g. "Entrepreneurs Quiz"
  teamSizeMin: number;
  teamSizeMax: number;
  teamSizeLabel: string; // e.g. "2 members"
  maxPoints: number;  // 60 per track
}

export const TRACKS: OfficialTrack[] = [
  {
    id: "biziq",
    number: "01",
    name: "BizIQ",
    originalEvent: "Entrepreneurs Quiz",
    teamSizeMin: 2,
    teamSizeMax: 2,
    teamSizeLabel: "2 members",
    maxPoints: 60,
  },
  {
    id: "pitch-lab",
    number: "02",
    name: "The Pitch Lab",
    originalEvent: "B-Plan Challenge",
    teamSizeMin: 1,
    teamSizeMax: 2,
    teamSizeLabel: "1–2 members",
    maxPoints: 60,
  },
  {
    id: "madverse",
    number: "03",
    name: "mADverse",
    originalEvent: "Ad-Mad Show",
    teamSizeMin: 2,
    teamSizeMax: 3,
    teamSizeLabel: "2–3 members",
    maxPoints: 60,
  },
  {
    id: "codex",
    number: "04",
    name: "CODEX",
    originalEvent: "Hackathon",
    teamSizeMin: 4,
    teamSizeMax: 4,
    teamSizeLabel: "4 members",
    maxPoints: 60,
  },
  {
    id: "dress-a-founder",
    number: "05",
    name: "Dress-A-Founder",
    originalEvent: "Dress-A-Founder",
    teamSizeMin: 1,
    teamSizeMax: 1,
    teamSizeLabel: "1 member",
    maxPoints: 60,
  },
];

// ── League Passes ──────────────────────────────────────────────────────────────

export const PASSES = {
  THREE_TRACK: {
    id: "3-pass",
    label: "3-Track League Pass",
    price: 1000,
    priceLabel: "₹1,000",
    trackCount: 3,
    maxPoints: 180,
    features: [
      "Choose and compete in any 3 tracks",
      "Max earnable: 180 League Points",
      "Certificate of Participation",
    ],
    restrictions: [
      "Team-level pass — non-transferable",
      "Non-refundable once purchased",
      "Track selection is FIXED after registration",
      "Selection cannot be changed afterward",
    ],
  },
  FIVE_TRACK: {
    id: "5-pass",
    label: "5-Track League Pass",
    price: 1300,
    priceLabel: "₹1,300",
    trackCount: 5,
    maxPoints: 300,
    features: [
      "Access to all 5 tracks",
      "Max earnable: 300 League Points",
      "Priority check-in on event day",
      "Certificate of Participation",
    ],
    restrictions: [
      "Team-level pass — non-transferable",
      "Non-refundable once purchased",
    ],
  },
} as const;

// ── Official Points System ─────────────────────────────────────────────────────

export interface PointsEntry {
  rank: number;
  label: string;
  points: number;
}

export const POINTS_TABLE: PointsEntry[] = [
  { rank: 1, label: "1st Place", points: 60 },
  { rank: 2, label: "2nd Place", points: 50 },
  { rank: 3, label: "3rd Place", points: 40 },
  { rank: 4, label: "4th Place", points: 30 },
  { rank: 5, label: "5th Place", points: 20 },
  { rank: 6, label: "6th Place", points: 10 },
  { rank: 7, label: "7th Place onwards", points: 0 },
];

export const MAX_POINTS_PER_TRACK = 60;
export const RANKED_POSITIONS = 6; // Top 6 teams earn points; 7th onwards = 0

// ── Misconduct Penalties ───────────────────────────────────────────────────────

export const MISCONDUCT_PENALTIES = [
  { violation: "Verbal abuse or intimidation of any participant, judge, or organiser", points: -5 },
  { violation: "Cheating, copying, or sharing answers/strategies during an active track", points: -5 },
  { violation: "Deliberate disruption of another team's performance or presentation", points: -5 },
  { violation: "Use of prohibited devices or external resources during a track", points: -5 },
  { violation: "General misbehaviour or failure to comply with organiser instructions", points: -5 },
] as const;

// ── Tie-Breaker Rules ──────────────────────────────────────────────────────────

export const TIE_BREAKERS = [
  { priority: 1, rule: "Team with more 1st place (track win) finishes ranks higher." },
  { priority: 2, rule: "Team with more 2nd place finishes ranks higher." },
  { priority: 3, rule: "Final decision rests with the organising committee." },
] as const;

// ── Prizes ─────────────────────────────────────────────────────────────────────

export const PRIZES = [
  {
    position: 1,
    title: "League Champion",
    cash: 25000,
    cashLabel: "₹25,000",
    perks: [
      "Incubation Support",
      "Internship Opportunities",
      "Startup & Founder Interactions",
      "Trophy",
      "Certificate",
    ],
  },
  {
    position: 2,
    title: "Runner-Up",
    cash: 15000,
    cashLabel: "₹15,000",
    perks: [
      "Internship Opportunities",
      "Startup & Founder Interactions",
      "Trophy",
      "Certificate",
    ],
  },
  {
    position: 3,
    title: "2nd Runner-Up",
    cash: 10000,
    cashLabel: "₹10,000",
    perks: [
      "Startup & Founder Interactions",
      "Trophy",
      "Certificate",
    ],
  },
] as const;

// ── General Guidelines ─────────────────────────────────────────────────────────

export const GUIDELINES = [
  "Only currently enrolled students holding a valid league pass may compete. Faculty and organising members are not eligible.",
  "Teams must check in at the registration desk at least 30 minutes before the event officially begins. Late check-in may result in loss of the first track slot.",
  "Team Lead is the single point of contact between the team and organising committee.",
  "All work, performances, and submissions must be original and created solely by registered team members. Plagiarism results in track disqualification and a leaderboard penalty.",
  "No external coaching, prompting, or assistance during an active track.",
  "Team members must be present at designated track area at least 10 minutes before assigned slot. No-shows result in 0 points for that track.",
  "Teams may not share answers, strategies, or materials with other teams during an active track.",
  "Judges' decisions on scoring and performance are final. Track results cannot be challenged once announced.",
  "Team composition is fixed after registration closes. Members cannot be swapped or added on event day.",
  "E-Cell reserves the right to modify the day's schedule or format due to logistical needs. All teams will be notified immediately.",
  "All participants are expected to maintain respectful conduct.",
  "Organising committee's decisions on scoring, penalties, tie-breakers and scheduling are final and non-negotiable.",
] as const;

// ── Schedule Notice ────────────────────────────────────────────────────────────

export const SCHEDULE_NOTICE = "The exact schedule for all 5 tracks will be shared with every registered team immediately after registration closes." as const;

// ── Track Model Notice ─────────────────────────────────────────────────────────

export const PARALLEL_TRACK_NOTICE = "All five tracks run in parallel on event day. Your team must assign members to each track before arrival. A participant cannot be assigned to two simultaneous tracks." as const;

// ── FAQ ────────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    value: "q1",
    title: "What is E-Cell League?",
    content: "E-Cell League is a one-day multi-track entrepreneurship competition exclusively for 12 registered E-Cell teams. Points are earned across tracks, aggregated on a live leaderboard, and the team topping the standings wins the League Championship.",
  },
  {
    value: "q2",
    title: "How many teams can participate?",
    content: "Only 12 teams can participate. Registration is first-come, first-served. Once 12 teams have registered, registrations close.",
  },
  {
    value: "q3",
    title: "How many members can register?",
    content: "Each team must have a minimum of 6 members and a maximum of 12 members. Registrations with fewer than 6 members will not be accepted.",
  },
  {
    value: "q4",
    title: "What are the five tracks?",
    content: "The five official tracks are: BizIQ (Entrepreneurs Quiz), The Pitch Lab (B-Plan Challenge), mADverse (Ad-Mad Show), CODEX (Hackathon), and Dress-A-Founder.",
  },
  {
    value: "q5",
    title: "What are the track team sizes?",
    content: "BizIQ: 2 members. The Pitch Lab: 1–2 members. mADverse: 2–3 members. CODEX: 4 members. Dress-A-Founder: 1 member. All tracks run in parallel, so members must be pre-assigned.",
  },
  {
    value: "q6",
    title: "What is the 3-Track League Pass?",
    content: "The 3-Track League Pass (₹1,000) allows your team to compete in any 3 tracks of your choice. Maximum earnable is 180 League Points. Track selection must be confirmed during registration and CANNOT be changed afterward.",
  },
  {
    value: "q7",
    title: "What is the 5-Track League Pass?",
    content: "The 5-Track League Pass (₹1,300) gives your team access to all 5 tracks. Maximum earnable is 300 League Points. It also includes priority check-in on event day.",
  },
  {
    value: "q8",
    title: "Can I change my tracks after registration?",
    content: "No. For the 3-Track Pass, track selection is confirmed during registration and cannot be changed afterward. An authorized admin must explicitly approve any changes.",
  },
  {
    value: "q9",
    title: "How does the League points system work?",
    content: "After each track, the top 6 finishing teams receive League Points: 1st = 60pts, 2nd = 50pts, 3rd = 40pts, 4th = 30pts, 5th = 20pts, 6th = 10pts. 7th place onwards = 0 points. All tracks run in parallel. Every team's points from all competed tracks are summed.",
  },
  {
    value: "q10",
    title: "How does the live leaderboard work?",
    content: "The leaderboard updates in real time as each track's results are confirmed by judges. All 12 teams are visible including those with 0 points. Misconduct deductions are reflected immediately. The final leaderboard is locked once all 5 track results are published.",
  },
  {
    value: "q11",
    title: "What happens in case of a tie?",
    content: "Tie-Breaker 1: Team with more 1st place (track win) finishes ranks higher. Tie-Breaker 2: Team with more 2nd place finishes ranks higher. Tie-Breaker 3: Final decision rests with the organising committee.",
  },
  {
    value: "q12",
    title: "What are misconduct penalties?",
    content: "Any misconduct results in −5 points deducted from the team's leaderboard total. Violations include: verbal abuse, cheating/sharing answers, disrupting another team, using prohibited devices, and general misbehaviour. Repeated violations may result in full disqualification. Negative points can reduce a team's total below zero.",
  },
  {
    value: "q13",
    title: "When will the exact schedule be shared?",
    content: "The exact schedule for all 5 tracks will be shared with every registered team immediately after registration closes. Multiple tracks run in parallel, and members cannot be in two tracks simultaneously.",
  },
  {
    value: "q14",
    title: "Who can participate?",
    content: "Only currently enrolled students holding a valid league pass may compete. Faculty and organising members are not eligible.",
  },
  {
    value: "q15",
    title: "What are the check-in requirements?",
    content: "Teams must check in at the registration desk at least 30 minutes before the event officially begins. Late check-in may result in loss of the first track slot. Team members must be present at their designated track area at least 10 minutes before their assigned slot.",
  },
] as const;
