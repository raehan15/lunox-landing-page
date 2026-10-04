export interface ServiceItem {
  id: string;
  title: string;
  icon: "ai" | "web" | "mobile" | "design" | "qa" | "cloud" | "team";
  description: string;
  capabilities: string[];
  large?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "gen-ai",
    title: "Generative AI & Machine Learning Solutions",
    icon: "ai",
    large: true,
    description:
      "Production-ready AI architectures: private LLM orchestration (Claude, OpenAI, Gemini), custom multi-agent RAG pipelines, and automated background data processing. Built to cut repetitive manual operations without hallucinations.",
    capabilities: [
      "Private LLM deployment & prompt guardrails",
      "Deterministic document RAG & vector pipelines",
      "Autonomous multi-agent execution loops",
      "Custom domain model fine-tuning & evaluation",
    ],
  },
  {
    id: "custom-web",
    title: "Custom Web Applications & SaaS Platforms",
    icon: "web",
    description:
      "End-to-end engineered SaaS products, client portals, and mission-critical web platforms. Built for sub-second global page loads, multi-tenant databases, resilient subscriptions, and high-concurrency traffic.",
    capabilities: [
      "Next.js & React architectures",
      "Multi-tenant PostgreSQL design",
      "Billing, RBAC & session infrastructure",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    icon: "mobile",
    description:
      "Cross-platform iOS and Android mobile applications built with React Native and Expo. Seamless native module bridging, offline-first local synchronization, and smooth 60fps gesture interactions.",
    capabilities: [
      "React Native & Expo",
      "Offline-first sync",
      "Push & deep linking",
    ],
  },
  {
    id: "uiux-design",
    title: "UI/UX Design & Product Systems",
    icon: "design",
    description:
      "High-fashion digital experiences designed to captivate and convert. We craft deliberate design systems, interactive prototypes, and typography hierarchies tailored to modern enterprise standards.",
    capabilities: [
      "Design systems & component libraries",
      "High-fidelity prototypes",
      "Journey mapping",
    ],
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation & Enterprise Bots",
    icon: "qa",
    description:
      "Eliminate manual operational friction. We connect your disparate ERPs, CRM databases, communication tools, and APIs into self-healing, automated background workflows and interactive bots.",
    capabilities: [
      "n8n & custom webhooks",
      "Data sync pipelines",
      "Slack / Discord / Telegram bots",
    ],
  },
  {
    id: "cloud-native",
    title: "Cloud-Native Infrastructure & DevOps",
    icon: "cloud",
    description:
      "Battle-tested DevOps, Docker containerization, and elastic serverless environments. Built to effortlessly scale from launch-day traffic to hundreds of thousands of concurrent users.",
    capabilities: [
      "Docker & AWS / GCP",
      "Zero-downtime CI/CD",
      "Edge CDN & serverless",
    ],
  },
  {
    id: "dedicated-teams",
    title: "Dedicated Engineering Squads",
    icon: "team",
    description:
      "Embed a cohesive, high-velocity engineering squad directly into your product roadmap. Senior architects and full-stack builders who ship production code every single sprint.",
    capabilities: [
      "Senior full-stack & AI architects",
      "Weekly staging releases",
      "100% code ownership on handover",
    ],
  },
];
