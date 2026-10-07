export type ProjectCategory =
  | "AI Products"
  | "Agentic AI"
  | "RAG"
  | "Full-Stack SaaS";

export type ProjectStatus = "public" | "proprietary" | "internal" | "research";

export type VisualTreatment =
  | "browser"
  | "dashboard"
  | "multi-panel"
  | "ai-pipeline"
  | "technical"
  | "photo";

export interface Project {
  slug: string;
  title: string;
  type: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  overview?: string;
  architecture?: string;
  features: string[];
  stack: string[];
  results: string[];
  link: string | null;
  featured: boolean;
  status: ProjectStatus;
  /** Preferred preview image path — replace with a real screenshot when available */
  image?: string | null;
  /** Alias for image */
  visual?: string | null;
  /** Alias for image */
  previewImage?: string | null;
  visualTreatment: VisualTreatment;
}

/**
 * Canonical Lunox portfolio data. Only products with a working public link.
 * Screenshots: set `image` / `visual` / `previewImage` to a path under /public.
 */
export const projects: Project[] = [
  {
    slug: "kitabbot",
    title: "Kitab Bot",
    type: "RAG Product",
    category: "RAG",
    tagline: "Textbook answers with the page number, for students on every major syllabus.",
    description:
      "Kitab Bot is a production study assistant for students on the Federal, Punjab, Edexcel, and Cambridge syllabi. A student selects the board, class, and subject, asks a question from that textbook, and receives an answer drawn from the book, with the page number. The same page can be opened and checked.",
    overview:
      "Students use it before an exam for definitions, laws, and numericals, on a phone, without an account. When the evidence is weak, the assistant says the topic is not covered instead of guessing.",
    architecture:
      "The system indexes 51 official textbooks, about 13,600 pages. Each page is stored as a semantic embedding and a keyword index. A question is searched in both, limited to the selected book. The two result lists are merged, and a reranker keeps only the pages that match strongly. The answer is written solely from those pages. Repeated questions on the same book are served from a local cache when the wording is effectively the same.",
    features: [
      "Board, class, and subject selection across Federal, Punjab, Edexcel, and Cambridge",
      "Answers drawn from the textbook, with a checkable page number",
      "Hybrid semantic and keyword retrieval with a reranker",
      "Says so when a topic is not covered, rather than guessing",
      "Cache for repeated questions on the same book",
      "Phone-first, no account needed",
    ],
    stack: ["RAG", "Embeddings", "Hybrid Search", "Reranking", "LLMs"],
    results: [
      "51 official textbooks indexed, about 13,600 pages",
      "On questions within the selected textbook, the cited page is correct about 98% of the time",
    ],
    link: "https://kitabbot.fly.dev/",
    featured: true,
    status: "public",
    image: null,
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "hirey-ai",
    title: "HIREY-AI",
    type: "Agentic Platform",
    category: "Agentic AI",
    tagline: "Agentic candidate screening for modern hiring teams.",
    description:
      "An agentic screening system that qualifies candidates, structures evaluation, and accelerates hiring workflows without turning recruiters into prompt engineers.",
    overview:
      "HIREY-AI orchestrates screening agents over resumes, role criteria, and interview context so teams get consistent, reviewable shortlists instead of ad-hoc manual filtering.",
    architecture:
      "Multi-agent orchestration over document ingestion, criteria matching, structured scoring, and recruiter-facing review surfaces with audit-friendly outputs.",
    features: [
      "Agentic screening loops against role criteria",
      "Structured candidate evaluation summaries",
      "Recruiter review and shortlist workflows",
      "Integrations into hiring pipelines",
    ],
    stack: ["Python", "LangChain", "LLMs", "PostgreSQL", "Next.js"],
    results: [],
    link: "https://hirey.ai",
    featured: true,
    status: "public",
    image: null,
    visualTreatment: "dashboard",
  },
  {
    slug: "estimatrix",
    title: "Project Price Pro / Estimatrix",
    type: "SaaS Product",
    category: "Full-Stack SaaS",
    tagline: "Estimating and proposal software for service businesses.",
    description:
      "A full-stack estimating and CRM-adjacent product for contractors and service teams who need branded proposals, job pricing, and operational follow-through in one system.",
    overview:
      "Estimatrix helps remodelers, trades, and field teams capture work, produce estimates, and move from bid to scheduled delivery without bolting together disconnected tools.",
    architecture:
      "Product application for estimating and proposals, relational data for jobs and clients, and workflows that connect pricing, scheduling, and invoicing surfaces.",
    features: [
      "Project estimating and branded proposals",
      "Job and client workflows for service businesses",
      "Pricing and operational follow-through",
      "Web product surfaces for field and office teams",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Cloud"],
    results: [],
    link: "https://estimatrix.io",
    featured: true,
    status: "public",
    image: null,
    visualTreatment: "browser",
  },
  {
    slug: "moqah",
    title: "Moqah",
    type: "Product Platform",
    category: "Full-Stack SaaS",
    tagline: "Event discovery and listing for local experiences.",
    description:
      "A public event discovery and listing platform for browsing, finding, and exploring local events and experiences.",
    overview:
      "Moqah is presented as a live product surface — browsing, listing, and discovery flows for events — rather than an abstract marketing site.",
    architecture:
      "Consumer-facing web application with event listing, discovery, and detail experiences backed by application and content services.",
    features: [
      "Event browsing and discovery",
      "Listing and detail experiences",
      "Public product surface for local events",
      "Responsive web application",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Cloud"],
    results: [],
    link: "https://moqah.pk/",
    featured: true,
    status: "public",
    image: null,
    visualTreatment: "browser",
  },
  {
    slug: "tattoovisionai",
    title: "TattooVisionAI",
    type: "AI Product",
    category: "AI Products",
    tagline: "See how a tattoo looks before the needle.",
    description:
      "An AI-powered tattoo visualization product that helps people preview designs on their own body before committing to ink.",
    overview:
      "TattooVisionAI combines computer vision and generative design tooling so users can try placements, styles, and compositions in a guided product experience rather than guessing from flat mockups.",
    architecture:
      "Client application for capture and preview, a model inference path for placement and style transfer, and a delivery layer for design packs and high-resolution assets.",
    features: [
      "On-body tattoo preview and placement",
      "AI-assisted design generation and style exploration",
      "Ready-to-ink design packs with digital delivery",
      "Product flows for artists and studios",
    ],
    stack: ["Next.js", "TypeScript", "Python", "Computer Vision", "Cloud Inference"],
    results: [],
    link: "https://tattoovisionai.com",
    featured: true,
    status: "public",
    image: null,
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "ideas-foundation",
    title: "IDEAS Foundation",
    type: "Web Platform",
    category: "Full-Stack SaaS",
    tagline: "The public website for IDEAS Foundation.",
    description:
      "The public web presence for IDEAS Foundation, built and shipped by Lunox as a live site.",
    features: [
      "Public website live at ideasfoundation.pk",
      "Responsive layout across phone and desktop",
    ],
    stack: ["Next.js", "TypeScript", "Cloud"],
    results: [],
    link: "https://www.ideasfoundation.pk/",
    featured: false,
    status: "public",
    image: null,
    visualTreatment: "browser",
  },
  {
    slug: "finlo",
    title: "Finlo",
    type: "SaaS Product",
    category: "Full-Stack SaaS",
    tagline: "Offline-ready personal finance tracking.",
    description:
      "A secure personal finance tracker with wallet budgeting, authentication, and interactive visualizations.",
    features: [
      "Wallet budgeting and tracking",
      "Authenticated account flows",
      "Interactive finance visualizations",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    results: [],
    link: "https://finlo-wallet.vercel.app/",
    featured: false,
    status: "public",
    image: "/images/finlo_main.png",
    visualTreatment: "photo",
  },
  {
    slug: "goofy-guesser",
    title: "Goofy Guesser",
    type: "Full-Stack Game",
    category: "Full-Stack SaaS",
    tagline: "Realtime collaborative Wordle-style play.",
    description:
      "A realtime collaborative Wordle-style game with group leaderboards, synchronized daily challenges, and persistent state.",
    features: [
      "Live group leaderboards",
      "Timezone-synchronized daily challenges",
      "Persistent game state",
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    results: [],
    link: "https://goofy-guesser-game.vercel.app/",
    featured: false,
    status: "public",
    image: "/images/goofy_guesser_main.png",
    visualTreatment: "photo",
  },
];

export const WORK_FILTERS = [
  "All",
  "AI Products",
  "Agentic AI",
  "RAG",
  "Full-Stack SaaS",
] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number];

export function getProjectVisual(project: Project): string | null {
  return project.image || project.visual || project.previewImage || null;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByFilter(filter: WorkFilter): Project[] {
  if (filter === "All") return projects;
  return projects.filter((p) => p.category === filter);
}
