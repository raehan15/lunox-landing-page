export type ProjectCategory =
  | "AI Products"
  | "Agentic AI"
  | "RAG"
  | "Full-Stack SaaS"
  | "Mobile";

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
  /** Extra product shots (e.g. mobile app store frames) */
  gallery?: string[];
  /** Alias for image */
  visual?: string | null;
  /** Alias for image */
  previewImage?: string | null;
  visualTreatment: VisualTreatment;
}

/**
 * Live portfolio — only products with a working public link are shown.
 * Procedural mockups in ProductVisual stay as fallbacks when `image` is null.
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
    image: "/images/products/kitabbot.png",
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "hirey-ai",
    title: "HIREY-AI",
    type: "Agentic Platform",
    category: "Agentic AI",
    tagline: "The IRL social network for people who connect people.",
    description:
      "Real meetings and real conversations in one network an AI can search. Find people, post needs, and schedule meetings — or let an agent call the API.",
    overview:
      "HiRey is built around real-world meetings: a people network your agent can join, with search, needs, and scheduling for jobs, cofounders, investors, and more.",
    architecture:
      "Web product for people, products, media, and needs, plus an agent API so tools can search and act without turning recruiters into prompt engineers.",
    features: [
      "IRL people network searchable by humans and agents",
      "Ask Rey or bring your own AI (Claude, Codex, and others)",
      "Agent API keys and capability calls without a full account",
      "Feed, people, products, needs, and meeting surfaces",
    ],
    stack: ["Next.js", "Agent API", "LLMs", "PostgreSQL"],
    results: [],
    link: "https://hirey.ai",
    featured: true,
    status: "public",
    image: "/images/products/hirey-ai.png",
    visualTreatment: "dashboard",
  },
  {
    slug: "estimatrix",
    title: "Estimatrix",
    type: "SaaS Product",
    category: "Full-Stack SaaS",
    tagline: "Send a same-day proposal and get paid.",
    description:
      "Capture the lead, price the job, and send a branded proposal before you leave the driveway — then schedule and collect in the same stack.",
    overview:
      "Estimatrix is estimating and proposal software for contractors and service teams: same-day branded proposals, follow-up that does not slip, and collection on the same job.",
    architecture:
      "Web app plus installable desktop and mobile clients for field and office teams, with jobs, clients, pricing, scheduling, and invoicing in one product.",
    features: [
      "Same-day branded proposals",
      "Follow-up that does not slip",
      "Collect on the same job",
      "Web, desktop, and mobile apps",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Mobile", "Cloud"],
    results: [],
    link: "https://estimatrix.io",
    featured: true,
    status: "public",
    image: "/images/products/estimatrix.png",
    visualTreatment: "browser",
  },
  {
    slug: "moqah",
    title: "Moqah",
    type: "Product Platform",
    category: "Full-Stack SaaS",
    tagline: "Event ticketing and discovery for your city.",
    description:
      "Event ticketing and discovery that is easy for attendees and flexible for organizers — browse, list, sell tickets, and run the dashboard from one product.",
    overview:
      "Moqah is a live event platform: public discovery, ticket purchase flows, and organizer dashboards for spending, payments, views, and earnings.",
    architecture:
      "Consumer-facing web application with event listing, ticketing, and organizer analytics backed by application and content services.",
    features: [
      "Event browsing and discovery",
      "Ticket types, promo codes, and checkout",
      "Organizer dashboard and sales analytics",
      "Responsive web application",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Cloud"],
    results: [],
    link: "https://moqah.pk/",
    featured: true,
    status: "public",
    image: "/images/products/moqah.png",
    visualTreatment: "browser",
  },
  {
    slug: "tattoovisionai",
    title: "TattooVisionAI",
    type: "AI Product",
    category: "AI Products",
    tagline: "See your tattoo on your body before you commit.",
    description:
      "Upload a photo, answer two questions, and preview the design on your real skin. Photos are deleted after the preview.",
    overview:
      "TattooVisionAI is an AI tattoo preview product: one free preview with no card, then a paid pack — for people who want to see the ink on their body first.",
    architecture:
      "Client capture and preview, model inference for placement and style, and delivery of design packs without long-term photo storage.",
    features: [
      "On-body tattoo preview from a real photo",
      "AI-assisted design and style exploration",
      "Photos deleted after preview",
      "One free preview, then paid packs",
    ],
    stack: ["Next.js", "TypeScript", "Python", "Computer Vision", "Cloud Inference"],
    results: [],
    link: "https://tattoovisionai.com",
    featured: true,
    status: "public",
    image: "/images/products/tattoovisionai.png",
    visualTreatment: "ai-pipeline",
  },
  {
    slug: "preptra",
    title: "PrepTra",
    type: "Mobile App",
    category: "Mobile",
    tagline: "Crack the CSS exam code with 25 years of paper analysis.",
    description:
      "PrepTra turns CSS past papers from 2000–2025 into a focused prep system: recurring topics, repeated questions, AI MCQs at Easy / Medium / Hard, and curated study resources.",
    overview:
      "A CSS exam prep app for compulsory and optional subjects — past papers, mock tests with instant feedback, and adaptive practice. Historical patterns are a prep aid, not a prediction of future papers.",
    architecture:
      "Mobile app over curated past-paper corpora, topic-frequency analysis, and AI-generated practice MCQs with explanations and progress tracking.",
    features: [
      "CSS past papers from 2000–2025 with topic and theme patterns",
      "AI MCQs at Easy, Medium, and Hard",
      "Mock tests with instant correct-answer feedback",
      "Compulsory and optional CSS subjects",
      "Curated research papers, articles, videos, and PDFs",
    ],
    stack: ["Mobile", "AI MCQs", "Past-paper analysis", "Flutter"],
    results: [],
    link: "https://play.google.com/store/apps/details?id=com.preptra.app",
    featured: true,
    status: "public",
    image: "/images/products/preptra-1.jpg",
    gallery: [
      "/images/products/preptra-1.jpg",
      "/images/products/preptra-2.jpg",
      "/images/products/preptra-3.jpg",
    ],
    visualTreatment: "photo",
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

/**
 * Stored for later — not shown on the site until they have a live public link.
 */
export const archivedProjects: Project[] = [
  {
    slug: "hirey-care",
    title: "Hirey Multi-Tenant Admin & EVV Platform",
    type: "Full-Stack Platform",
    category: "Full-Stack SaaS",
    tagline: "Multi-tenant admin and EVV for care operations.",
    description:
      "A multi-tenant administration and Electronic Visit Verification platform built for care organizations that need reliable operational software, not spreadsheets.",
    features: [
      "Multi-tenant organization administration",
      "Electronic Visit Verification workflows",
      "Role-based access and operational dashboards",
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
    slug: "urdu-webify",
    title: "Urdu Webify",
    type: "Localization Platform",
    category: "Full-Stack SaaS",
    tagline: "Urdu-first web experiences without broken typography.",
    description:
      "Tooling and product surfaces for building readable, production-grade Urdu web experiences with correct typography and layout behavior.",
    features: ["Urdu typography and layout tooling", "RTL-aware interface patterns"],
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
    category: "RAG",
    tagline: "Document-grounded answers for legal research workflows.",
    description:
      "A retrieval-augmented generation system that answers from a controlled legal document corpus with citations and guardrails against unsupported claims.",
    features: [
      "Private document ingestion and indexing",
      "Citation-backed retrieval answers",
      "Prompt and response guardrails",
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
    category: "AI Products",
    tagline: "Recommendation pipelines for large catalog surfaces.",
    description:
      "A recommendation system architecture designed for large product catalogs — candidate generation, ranking, and evaluation loops.",
    features: ["Candidate generation and ranking stages", "Feature pipelines over interaction data"],
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
    category: "AI Products",
    tagline: "Predicting future frames from temporal visual context.",
    description:
      "A research-grade video frame prediction system exploring temporal models that forecast upcoming frames from prior visual context.",
    features: ["Temporal frame prediction models", "Training and evaluation pipelines"],
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
    features: ["Structured diagnostic dialogue flows", "Constrained model outputs for safety"],
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
    category: "Full-Stack SaaS",
    tagline: "Air-gapped data infrastructure for constrained environments.",
    description:
      "A secure distributed data platform engineered for air-gapped and high-constraint environments where public cloud assumptions do not apply. Client identity and private endpoints are not disclosed.",
    features: [
      "Air-gapped / constrained-network deployment",
      "Distributed data services with isolation controls",
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
    category: "AI Products",
    tagline: "Detecting synthetic media with model-backed signals.",
    description:
      "A deepfake detection system that inspects media for synthetic artifacts and surfaces model-backed confidence signals for human review.",
    features: ["Media ingestion and preprocessing", "Model-backed synthetic media signals"],
    stack: ["Python", "Computer Vision", "ML Inference"],
    results: [],
    link: null,
    featured: false,
    status: "research",
    image: null,
    visualTreatment: "technical",
  },
  {
    slug: "rustagaari-resort",
    title: "Rustagaari Resort Management",
    type: "Desktop Application",
    category: "Full-Stack SaaS",
    tagline: "Offline-first resort operations on the desktop.",
    description:
      "An offline-first resort management desktop application with reservation calendars, invoicing, and local SQLite persistence.",
    features: ["Interactive room reservation calendar", "Automated invoicing", "Local SQLite offline database"],
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
  "RAG",
  "Full-Stack SaaS",
  "Mobile",
] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number];

export function getProjectVisual(project: Project): string | null {
  return project.image || project.visual || project.previewImage || null;
}

/** Only projects with a public live link are eligible for the site UI. */
function isLive(project: Project): boolean {
  return Boolean(project.link);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured && isLive(p));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug) ?? archivedProjects.find((p) => p.slug === slug);
}

export function getProjectsByFilter(filter: WorkFilter): Project[] {
  const live = projects.filter(isLive);
  if (filter === "All") return live;
  return live.filter((p) => p.category === filter);
}
