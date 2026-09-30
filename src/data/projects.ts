export type ProjectCategory =
  | "AI Products"
  | "Agentic AI"
  | "ML & Data"
  | "Full-Stack SaaS"
  | "Research";

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
 * Canonical Lunox portfolio data.
 * Screenshots: set `image` / `visual` / `previewImage` to a path under /public.
 * Public product URLs are preserved; proprietary work has link: null.
 */
export const projects: Project[] = [
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
    slug: "hirey-care",
    title: "Hirey Multi-Tenant Admin & EVV Platform",
    type: "Full-Stack Platform",
    category: "Full-Stack SaaS",
    tagline: "Multi-tenant admin and EVV for care operations.",
    description:
      "A multi-tenant administration and Electronic Visit Verification platform built for care organizations that need reliable operational software, not spreadsheets.",
    overview:
      "HireyCare consolidates tenant administration, visit verification flows, and operational tooling into a single platform designed for multi-organization deployment.",
    architecture:
      "Multi-tenant SaaS architecture with role-based access, visit verification workflows, and operational dashboards over a shared application core.",
    features: [
      "Multi-tenant organization administration",
      "Electronic Visit Verification workflows",
      "Role-based access and operational dashboards",
      "Care operations tooling across tenants",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS"],
    results: [],
    link: "https://hireycare.com",
    featured: false,
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
    slug: "urdu-webify",
    title: "Urdu Webify",
    type: "Localization Platform",
    category: "Full-Stack SaaS",
    tagline: "Urdu-first web experiences without broken typography.",
    description:
      "Tooling and product surfaces for building readable, production-grade Urdu web experiences with correct typography and layout behavior.",
    overview:
      "Urdu Webify addresses the practical gaps in shipping Urdu interfaces — typography, directionality, and layout — as an engineering product rather than a one-off theme.",
    features: [
      "Urdu typography and layout tooling",
      "RTL-aware interface patterns",
      "Content workflows for Urdu web products",
    ],
    stack: ["Next.js", "TypeScript", "CSS", "Typography Systems"],
    results: [],
    link: null,
    featured: false,
    status: "internal",
    image: null,
    visualTreatment: "multi-panel",
  },
  {
    slug: "legal-rag-assistant",
    title: "Legal RAG Assistant",
    type: "AI System",
    category: "AI Products",
    tagline: "Document-grounded answers for legal research workflows.",
    description:
      "A retrieval-augmented generation system that answers from a controlled legal document corpus with citations and guardrails against unsupported claims.",
    overview:
      "Built for teams that need grounded answers from their own materials — not open-ended chat that invents statute or case law.",
    architecture:
      "Ingestion and chunking pipeline, vector retrieval, grounded generation with citation surfaces, and evaluation against hallucination-sensitive prompts.",
    features: [
      "Private document ingestion and indexing",
      "Citation-backed retrieval answers",
      "Prompt and response guardrails",
      "Reviewable research assistant UX",
    ],
    stack: ["Python", "LangChain", "Vector DB", "LLMs", "PostgreSQL"],
    results: [],
    link: null,
    featured: false,
    status: "proprietary",
    image: null,
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "recommendation-engine",
    title: "Amazon-Scale Recommendation Engine",
    type: "ML System",
    category: "ML & Data",
    tagline: "Recommendation pipelines for large catalog surfaces.",
    description:
      "A recommendation system architecture designed for large product catalogs — candidate generation, ranking, and evaluation loops oriented around real retrieval constraints.",
    overview:
      "Focuses on the engineering of recommendation at scale: data pipelines, candidate sets, ranking stages, and measurable offline/online evaluation — not a toy demo.",
    architecture:
      "Feature and interaction pipelines feeding candidate generation and ranking stages, with evaluation harnesses for offline metrics and iterative model updates.",
    features: [
      "Candidate generation and ranking stages",
      "Feature pipelines over interaction data",
      "Offline evaluation harnesses",
      "Iterative model and ranking updates",
    ],
    stack: ["Python", "ML Pipelines", "PostgreSQL", "Redis", "Cloud"],
    results: [],
    link: null,
    featured: false,
    status: "research",
    image: null,
    visualTreatment: "technical",
  },
  {
    slug: "video-frame-prediction",
    title: "Video Frame Prediction",
    type: "Research System",
    category: "Research",
    tagline: "Predicting future frames from temporal visual context.",
    description:
      "A research-grade video frame prediction system exploring temporal models that forecast upcoming frames from prior visual context.",
    features: [
      "Temporal frame prediction models",
      "Training and evaluation pipelines",
      "Visual forecasting experiments",
    ],
    stack: ["Python", "PyTorch", "Computer Vision"],
    results: [],
    link: null,
    featured: false,
    status: "research",
    image: null,
    visualTreatment: "technical",
  },
  {
    slug: "ai-medical-diagnostic-chatbot",
    title: "AI Medical Diagnostic Chatbot",
    type: "AI Product",
    category: "AI Products",
    tagline: "Structured clinical dialogue with constrained outputs.",
    description:
      "A medical diagnostic conversation system designed for structured intake and constrained recommendations — with clear boundaries around clinical decision support.",
    features: [
      "Structured diagnostic dialogue flows",
      "Constrained model outputs for safety",
      "Clinician-oriented review surfaces",
    ],
    stack: ["Python", "LLMs", "RAG", "Next.js"],
    results: [],
    link: null,
    featured: false,
    status: "proprietary",
    image: null,
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "secure-distributed-data-platform",
    title: "Secure Distributed Data Platform",
    type: "Infrastructure",
    category: "ML & Data",
    tagline: "Air-gapped data infrastructure for constrained environments.",
    description:
      "A secure distributed data platform engineered for air-gapped and high-constraint environments where public cloud assumptions do not apply.",
    overview:
      "Proprietary infrastructure work for environments that require isolated deployment, controlled data movement, and hardened operational practices. Client identity and private endpoints are not disclosed.",
    architecture:
      "Distributed data services with isolation boundaries, controlled replication, and operational tooling designed for offline or restricted network contexts.",
    features: [
      "Air-gapped / constrained-network deployment",
      "Distributed data services with isolation controls",
      "Hardened operational and access patterns",
    ],
    stack: ["Distributed Systems", "PostgreSQL", "Containers", "Hardened Linux"],
    results: [],
    link: null,
    featured: false,
    status: "proprietary",
    image: null,
    visualTreatment: "technical",
  },
  {
    slug: "deepfake-detection",
    title: "Deepfake Detection",
    type: "ML System",
    category: "ML & Data",
    tagline: "Detecting synthetic media with model-backed signals.",
    description:
      "A deepfake detection system that inspects media for synthetic artifacts and surfaces model-backed confidence signals for human review.",
    features: [
      "Media ingestion and preprocessing",
      "Model-backed synthetic media signals",
      "Reviewer-facing detection outputs",
    ],
    stack: ["Python", "Computer Vision", "ML Inference"],
    results: [],
    link: null,
    featured: false,
    status: "research",
    image: null,
    visualTreatment: "technical",
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
  {
    slug: "rustagaari-resort",
    title: "Rustagaari Resort Management",
    type: "Desktop Application",
    category: "Full-Stack SaaS",
    tagline: "Offline-first resort operations on the desktop.",
    description:
      "An offline-first resort management desktop application with reservation calendars, invoicing, and local SQLite persistence.",
    features: [
      "Interactive room reservation calendar",
      "Automated invoicing",
      "Local SQLite offline database",
    ],
    stack: ["Electron", "Express.js", "SQLite", "JavaScript"],
    results: [],
    link: null,
    featured: false,
    status: "internal",
    image: "/images/resort_main.png",
    visualTreatment: "photo",
  },
];

export const WORK_FILTERS = [
  "All",
  "AI Products",
  "Agentic AI",
  "ML & Data",
  "Full-Stack SaaS",
  "Research",
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
