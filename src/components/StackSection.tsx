"use client";

import { useState } from "react";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

const STACK = [
  {
    title: "Frontend",
    tools: [
      { name: "Next.js", note: "App Router products with server components and edge-ready delivery." },
      { name: "React", note: "Interface architecture for complex product surfaces." },
      { name: "TypeScript", note: "End-to-end typing across APIs, schemas, and clients." },
      { name: "Tailwind CSS", note: "Token-driven UI systems without stylesheet sprawl." },
      { name: "Framer Motion", note: "Restrained motion for hierarchy and feedback." },
    ],
  },
  {
    title: "Backend",
    tools: [
      { name: "Node.js", note: "High-throughput APIs and background job workers." },
      { name: "Python", note: "Services, data pipelines, and ML-adjacent backends." },
      { name: "PostgreSQL", note: "Relational systems of record with serious query needs." },
      { name: "Prisma", note: "Typed schema migrations and application data access." },
      { name: "Redis", note: "Caching, rate limits, and lightweight queues." },
      { name: "Supabase", note: "Auth, realtime, and Postgres when it fits the product." },
    ],
  },
  {
    title: "AI & Data",
    tools: [
      { name: "OpenAI / Anthropic", note: "Foundation models behind grounded product workflows." },
      { name: "LangChain", note: "Agent orchestration, tools, and retrieval chains." },
      { name: "RAG Pipelines", note: "Private corpora with citation-aware generation." },
      { name: "Vector DBs", note: "Embedding stores for retrieval at product scale." },
      { name: "n8n", note: "Self-hosted automation between systems of record." },
    ],
  },
  {
    title: "Cloud / Infrastructure",
    tools: [
      { name: "Docker", note: "Reproducible environments from local to production." },
      { name: "AWS", note: "Containers, storage, IAM, and production networking." },
      { name: "Vercel", note: "Edge delivery for web products when appropriate." },
      { name: "GitHub Actions", note: "CI/CD for tests, previews, and releases." },
      { name: "Electron", note: "Offline-first desktop systems when the browser is not enough." },
    ],
  },
];

const LAG = [0.6, 1.1, 1.6, 2.1];

export function StackSection() {
  const [active, setActive] = useState<{ col: string; name: string; note: string } | null>(null);

  return (
    <section id="stack" data-nav-theme="light" className="relative scroll-mt-20 bg-paper pb-24 pt-20 md:pb-36 md:pt-28">
      <LiquidEdge color="var(--paper)" seed={3.7} />
      <div className="container-site">
        <div className="mb-14 md:mb-20">
          <Reveal kind="drift">
            <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
              <span className="h-px w-8 bg-accent" aria-hidden />
              Stack
            </p>
          </Reveal>
          <MaskLines
            className="heading text-[44px] leading-[0.96] tracking-[-0.045em] text-ink sm:text-[64px] md:text-[84px]"
            lines={["The stack behind", <span key="w" className="text-ink-muted">the work.</span>]}
          />
        </div>

        <Reveal kind="drift" stagger={0.08} className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STACK.map((col, i) => (
            <div
              key={col.title}
              className="vel-lag flex flex-col border-t border-light-border pt-6"
              style={{ ["--lag-k" as string]: LAG[i] }}
            >
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="label-mono text-ink">{col.title}</h3>
                <span className="label-mono text-[11px] text-ink-muted">{String(col.tools.length).padStart(2, "0")}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {col.tools.map((tool) => {
                  const on = active?.col === col.title && active.name === tool.name;
                  return (
                    <li key={tool.name}>
                      <button
                        type="button"
                        data-glow
                        onMouseEnter={() => setActive({ col: col.title, name: tool.name, note: tool.note })}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive({ col: col.title, name: tool.name, note: tool.note })}
                        onClick={() => setActive({ col: col.title, name: tool.name, note: tool.note })}
                        onBlur={() => setActive(null)}
                        aria-describedby={on ? `stack-note-${i}` : undefined}
                        className={`glow-border min-h-[44px] rounded-full border px-4 py-2 text-[14px] transition-all duration-300 md:min-h-0 md:px-3.5 ${
                          on
                            ? "border-ink bg-ink text-white"
                            : "border-light-border bg-white/70 text-ink hover:-translate-y-0.5"
                        }`}
                      >
                        {tool.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p id={`stack-note-${i}`} className="mt-5 min-h-[3rem] text-[13px] leading-snug text-ink-muted" aria-live="polite">
                {active?.col === col.title && (
                  <span key={active.name} className="block animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                    {active.note}
                  </span>
                )}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
