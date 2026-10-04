"use client";

import Image from "next/image";
import { CSSProperties, ReactNode } from "react";
import { Project, getProjectVisual } from "@/data/projects";

/**
 * Product compositions. All sizes are in container units so one component
 * serves the full-bleed Work stage, list previews and case-study headers.
 * Layers read --px/--py from any ancestor for pointer parallax.
 *
 * These are interface mockups, not screenshots — set `image` on a project
 * in src/data/projects.ts to replace them with a real capture.
 */

type Variant = "stage" | "card" | "detail";

const layer = (depth: number): CSSProperties => ({
  translate: `calc(var(--px, 0) * ${depth}px) calc(var(--py, 0) * ${depth * 0.8}px)`,
  transition: "translate 0.9s cubic-bezier(0.22,1,0.36,1)",
});

function MockTag({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`absolute bottom-[3cqw] left-[3cqw] z-20 rounded-full px-[1.6cqw] py-[0.6cqw] font-mono text-[max(9px,1.3cqw)] uppercase tracking-[0.12em] ${
        dark ? "bg-white/10 text-white/60" : "bg-ink/5 text-ink-muted"
      }`}
    >
      Interface mockup
    </span>
  );
}

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-[0.9cqw] min-h-[3px] rounded-full ${className}`} style={{ width: w }} />;
}

/* ---------- TattooVisionAI: on-body preview in a phone, style + placement controls ---------- */
function TattooVision() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0f14]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 40%, rgba(205,170,140,0.18), transparent 70%), radial-gradient(40% 40% at 85% 85%, rgba(49,91,255,0.18), transparent 70%)",
        }}
      />
      {/* Phone */}
      <div className="absolute left-1/2 top-1/2 h-[86%] w-[30%] -translate-x-1/2 -translate-y-1/2" style={layer(6)}>
        <div className="relative h-full w-full overflow-hidden rounded-[3.2cqw] border border-white/15 bg-[#16181e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="absolute left-1/2 top-[2.5%] h-[2.5%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          {/* Forearm */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <linearGradient id="skin" x1="0" x2="1">
                <stop offset="0" stopColor="#8a6a55" />
                <stop offset="0.5" stopColor="#c49a7e" />
                <stop offset="1" stopColor="#7d5e4b" />
              </linearGradient>
            </defs>
            <path d="M22,210 C24,140 30,80 36,-10 L72,-10 C76,80 80,140 84,210 Z" fill="url(#skin)" />
            {/* Line-art tattoo */}
            <g fill="none" stroke="#1a1512" strokeWidth="0.9" strokeLinecap="round" opacity="0.9">
              <path d="M55,70 C45,80 45,96 55,104 C65,96 65,80 55,70 Z" />
              <path d="M55,104 L55,140" />
              <path d="M55,118 C47,112 42,116 40,122 C47,124 52,122 55,118" />
              <path d="M55,128 C63,122 68,126 70,132 C63,134 58,132 55,128" />
              <circle cx="55" cy="88" r="3" />
            </g>
            {/* Placement box */}
            <rect x="36" y="62" width="38" height="86" rx="3" fill="none" stroke="#315BFF" strokeWidth="0.7" strokeDasharray="3 2" />
            {[
              [36, 62],
              [74, 62],
              [36, 148],
              [74, 148],
            ].map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#fff" stroke="#315BFF" strokeWidth="0.6" />
            ))}
          </svg>
          <div className="absolute inset-x-[8%] bottom-[4%] flex items-center justify-between rounded-full bg-black/50 px-[1.4cqw] py-[1cqw] backdrop-blur">
            <span className="font-mono text-[max(8px,1.2cqw)] text-white/70">Preview</span>
            <span className="h-[2.6cqw] w-[2.6cqw] rounded-full border-2 border-white/80" />
          </div>
        </div>
      </div>
      {/* Style card */}
      <div className="absolute left-[5%] top-[14%] w-[26%]" style={layer(16)}>
        <div className="glass-panel-dark rounded-[1.8cqw] p-[1.8cqw]">
          <p className="mb-[1.2cqw] font-mono text-[max(8px,1.2cqw)] uppercase tracking-widest text-white/50">Style</p>
          <div className="flex flex-wrap gap-[0.8cqw]">
            {["Fine line", "Blackwork", "Ornamental"].map((s, i) => (
              <span
                key={s}
                className={`rounded-full px-[1.2cqw] py-[0.5cqw] text-[max(8px,1.3cqw)] ${
                  i === 0 ? "bg-accent text-white" : "bg-white/10 text-white/70"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Placement card */}
      <div className="absolute bottom-[16%] right-[5%] w-[27%]" style={layer(22)}>
        <div className="glass-panel-dark rounded-[1.8cqw] p-[1.8cqw]">
          <p className="mb-[1cqw] font-mono text-[max(8px,1.2cqw)] uppercase tracking-widest text-white/50">Placement</p>
          <p className="mb-[1.4cqw] text-[max(10px,1.8cqw)] font-medium text-white">Inner forearm</p>
          <div className="relative h-[0.6cqw] min-h-[2px] rounded-full bg-white/10">
            <span className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-accent" />
            <span className="absolute left-[62%] top-1/2 h-[1.8cqw] w-[1.8cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white" />
          </div>
          <p className="mt-[1cqw] font-mono text-[max(8px,1.1cqw)] text-white/40">Scale</p>
        </div>
      </div>
      <MockTag dark />
    </div>
  );
}

/* ---------- HIREY-AI: shortlist dashboard + agent run log ---------- */
function HireyAI() {
  const rows = ["A. Rahman", "J. Okafor", "M. Silva", "L. Chen", "S. Ito"];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eef0f4]">
      <div className="absolute left-[4%] top-[7%] h-[86%] w-[70%]" style={layer(5)}>
        <div className="flex h-full w-full overflow-hidden rounded-[1.6cqw] border border-ink/10 bg-white shadow-[0_30px_60px_-30px_rgba(17,19,24,0.35)]">
          <div className="w-[20%] border-r border-ink/5 bg-[#f7f8fa] p-[1.6cqw]">
            <span className="mb-[2cqw] block h-[2.2cqw] w-[2.2cqw] rounded-[0.6cqw] bg-ink" />
            {["Roles", "Pipeline", "Shortlist", "Reports"].map((l, i) => (
              <p
                key={l}
                className={`mb-[0.6cqw] rounded-[0.6cqw] px-[0.8cqw] py-[0.6cqw] text-[max(8px,1.25cqw)] ${
                  i === 2 ? "bg-accent/10 font-medium text-accent" : "text-ink-muted"
                }`}
              >
                {l}
              </p>
            ))}
          </div>
          <div className="flex-1 p-[2cqw]">
            <div className="mb-[1.8cqw] flex items-center justify-between">
              <div>
                <p className="text-[max(10px,1.9cqw)] font-semibold text-ink">Senior Backend Engineer</p>
                <p className="text-[max(8px,1.2cqw)] text-ink-muted">Shortlist · agent-reviewed</p>
              </div>
              <span className="rounded-full bg-ink px-[1.4cqw] py-[0.6cqw] text-[max(8px,1.2cqw)] text-white">Review</span>
            </div>
            <div className="space-y-[0.9cqw]">
              {rows.map((r, i) => (
                <div
                  key={r}
                  className={`flex items-center gap-[1.4cqw] rounded-[1cqw] border px-[1.2cqw] py-[1cqw] ${
                    i === 0 ? "border-accent/30 bg-accent/[0.04]" : "border-ink/5"
                  }`}
                >
                  <span className="grid h-[3cqw] w-[3cqw] shrink-0 place-items-center rounded-full bg-ink/5 text-[max(7px,1.1cqw)] font-medium text-ink">
                    {r.split(" ")[1][0]}
                  </span>
                  <span className="w-[22%] truncate text-[max(8px,1.3cqw)] text-ink">{r}</span>
                  <span className="relative h-[0.7cqw] min-h-[3px] flex-1 overflow-hidden rounded-full bg-ink/5">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-accent/70" style={{ width: `${88 - i * 11}%` }} />
                  </span>
                  <span className="rounded-full bg-ink/5 px-[1cqw] py-[0.3cqw] text-[max(7px,1.1cqw)] text-ink-muted">
                    {i < 2 ? "Match" : i < 4 ? "Partial" : "Hold"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Agent log */}
      <div className="absolute bottom-[10%] right-[4%] w-[36%]" style={layer(20)}>
        <div className="rounded-[1.6cqw] border border-white/10 bg-[#0b0e14] p-[1.8cqw] font-mono shadow-[0_30px_60px_-20px_rgba(5,7,11,0.6)]">
          <div className="mb-[1.2cqw] flex items-center gap-[0.8cqw]">
            <span className="h-[1cqw] w-[1cqw] animate-pulse rounded-full bg-accent" />
            <span className="text-[max(8px,1.2cqw)] uppercase tracking-widest text-white/50">Agent run</span>
          </div>
          {[
            ["parse", "resume.pdf"],
            ["match", "role criteria"],
            ["score", "structured rubric"],
            ["write", "evaluation summary"],
          ].map(([k, v], i) => (
            <p key={k} className="text-[max(8px,1.25cqw)] leading-[1.9]">
              <span className={i === 3 ? "text-accent" : "text-white/40"}>{i === 3 ? "›" : "✓"}</span>{" "}
              <span className="text-white/80">{k}</span> <span className="text-white/40">{v}</span>
            </p>
          ))}
        </div>
      </div>
      <MockTag />
    </div>
  );
}

/* ---------- Estimatrix: branded proposal document + schedule card ---------- */
function Estimatrix() {
  const items = ["Demolition & prep", "Cabinetry", "Electrical", "Countertops", "Finishing"];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e9e6df]">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 30% 30%, rgba(255,255,255,0.7), transparent 70%)" }}
      />
      <div className="absolute left-[10%] top-[8%] h-[92%] w-[50%] rotate-[-2deg]" style={layer(6)}>
        <div className="h-full w-full rounded-t-[1.2cqw] bg-white p-[3cqw] shadow-[0_30px_60px_-30px_rgba(17,19,24,0.4)]">
          <div className="mb-[2.4cqw] flex items-start justify-between">
            <div>
              <span className="mb-[0.8cqw] block h-[2.4cqw] w-[2.4cqw] rounded-[0.5cqw] bg-accent" />
              <p className="text-[max(10px,2cqw)] font-semibold tracking-tight text-ink">Proposal</p>
              <p className="text-[max(8px,1.2cqw)] text-ink-muted">Kitchen remodel · Estimate</p>
            </div>
            <span className="rounded-full border border-ink/10 px-[1.2cqw] py-[0.5cqw] text-[max(7px,1.1cqw)] text-ink-muted">Draft</span>
          </div>
          <div className="border-t border-ink/10">
            {items.map((it, i) => (
              <div key={it} className="flex items-center justify-between border-b border-ink/5 py-[1.2cqw]">
                <span className="text-[max(8px,1.3cqw)] text-ink">{it}</span>
                <Bar w={`${18 + ((i * 7) % 14)}%`} className="bg-ink/15" />
              </div>
            ))}
          </div>
          <div className="mt-[2cqw] flex items-center justify-between">
            <span className="text-[max(8px,1.3cqw)] font-medium text-ink">Total</span>
            <Bar w="28%" className="h-[1.3cqw] bg-ink" />
          </div>
          <div className="mt-[2.6cqw] flex gap-[1cqw]">
            <span className="rounded-full bg-ink px-[1.6cqw] py-[0.8cqw] text-[max(8px,1.2cqw)] text-white">Send proposal</span>
            <span className="rounded-full border border-ink/10 px-[1.6cqw] py-[0.8cqw] text-[max(8px,1.2cqw)] text-ink">Edit</span>
          </div>
        </div>
      </div>
      {/* Schedule card */}
      <div className="absolute right-[7%] top-[18%] w-[30%]" style={layer(20)}>
        <div className="glass-panel-light rounded-[2cqw] p-[2cqw]">
          <p className="mb-[1.4cqw] font-mono text-[max(8px,1.1cqw)] uppercase tracking-widest text-ink-muted">Schedule</p>
          <div className="grid grid-cols-5 gap-[0.8cqw]">
            {["M", "T", "W", "T", "F"].map((d, i) => (
              <div key={i} className="text-center">
                <p className="mb-[0.6cqw] text-[max(7px,1.1cqw)] text-ink-muted">{d}</p>
                <span
                  className={`block h-[5cqw] rounded-[0.8cqw] ${
                    i === 1 || i === 2 ? "bg-accent" : i === 3 ? "bg-accent/30" : "bg-ink/5"
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="mt-[1.4cqw] text-[max(8px,1.3cqw)] text-ink">Crew booked</p>
        </div>
      </div>
      <div className="absolute bottom-[18%] right-[12%] w-[22%]" style={layer(30)}>
        <div className="rounded-[1.6cqw] bg-ink p-[1.6cqw] text-white shadow-[0_20px_40px_-16px_rgba(17,19,24,0.6)]">
          <p className="text-[max(8px,1.1cqw)] text-white/50">Status</p>
          <p className="text-[max(9px,1.5cqw)] font-medium">Approved → Scheduled</p>
        </div>
      </div>
      <MockTag />
    </div>
  );
}

/* ---------- Moqah: event listing in the browser + event detail on phone ---------- */
function Moqah() {
  const hues = ["#f0b27a", "#8fb3ff", "#c9a3e8", "#8fd1b8", "#f2c46d", "#f09a9a"];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#10131a]">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 70% 30%, rgba(49,91,255,0.2), transparent 70%)" }}
      />
      <div className="absolute left-[4%] top-[9%] h-[82%] w-[72%]" style={layer(5)}>
        <div className="flex h-full flex-col overflow-hidden rounded-[1.4cqw] border border-white/10 bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-[0.8cqw] border-b border-ink/5 bg-[#f6f6f7] px-[1.6cqw] py-[1cqw]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[1cqw] w-[1cqw] rounded-full bg-ink/15" />
            ))}
            <span className="ml-[1cqw] flex-1 rounded-[0.6cqw] bg-white px-[1.2cqw] py-[0.4cqw] text-[max(8px,1.15cqw)] text-ink-muted">
              moqah.pk
            </span>
          </div>
          <div className="flex-1 p-[2cqw]">
            <div className="mb-[1.6cqw] flex items-center justify-between">
              <p className="text-[max(10px,2cqw)] font-semibold tracking-tight text-ink">Events near you</p>
              <div className="flex gap-[0.6cqw]">
                {["This week", "Music", "Food"].map((c, i) => (
                  <span
                    key={c}
                    className={`rounded-full px-[1.2cqw] py-[0.4cqw] text-[max(7px,1.1cqw)] ${
                      i === 0 ? "bg-ink text-white" : "bg-ink/5 text-ink-muted"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[1.4cqw]">
              {hues.map((h, i) => (
                <div key={i}>
                  <div
                    className="relative mb-[0.8cqw] aspect-[4/3] overflow-hidden rounded-[1cqw]"
                    style={{ background: `linear-gradient(135deg, ${h}, ${h}55)` }}
                  >
                    <span className="absolute left-[8%] top-[8%] rounded-[0.5cqw] bg-white/90 px-[0.8cqw] py-[0.3cqw] text-[max(7px,1cqw)] font-medium text-ink">
                      {12 + i}
                    </span>
                  </div>
                  <Bar w="80%" className="mb-[0.5cqw] bg-ink/20" />
                  <Bar w="50%" className="bg-ink/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Phone detail */}
      <div className="absolute bottom-[6%] right-[5%] h-[74%] w-[22%]" style={layer(22)}>
        <div className="flex h-full flex-col overflow-hidden rounded-[2.6cqw] border border-white/15 bg-white shadow-[0_30px_60px_-16px_rgba(0,0,0,0.8)]">
          <div className="relative h-[46%]" style={{ background: `linear-gradient(160deg, ${hues[1]}, #315BFF)` }}>
            <span className="absolute bottom-[8%] left-[8%] rounded-full bg-white/90 px-[1cqw] py-[0.3cqw] text-[max(7px,1cqw)] text-ink">
              Sat · 8 PM
            </span>
          </div>
          <div className="flex flex-1 flex-col p-[1.6cqw]">
            <Bar w="85%" className="mb-[0.8cqw] h-[1.2cqw] bg-ink/80" />
            <Bar w="60%" className="mb-[1.6cqw] bg-ink/15" />
            <Bar w="90%" className="mb-[0.6cqw] bg-ink/10" />
            <Bar w="70%" className="bg-ink/10" />
            <span className="mt-auto rounded-full bg-ink py-[0.9cqw] text-center text-[max(8px,1.2cqw)] text-white">Get tickets</span>
          </div>
        </div>
      </div>
      <MockTag dark />
    </div>
  );
}

/* ---------- Generic treatments for the rest of the catalogue ---------- */
function Generic({ project }: { project: Project }) {
  const t = project.visualTreatment;
  if (t === "technical" || t === "ai-pipeline") {
    const steps = t === "technical" ? ["ingest", "transform", "model", "serve"] : ["input", "retrieve", "reason", "answer"];
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#0b0e14]">
        <div className="dot-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-[10%] flex items-center justify-between" style={layer(10)}>
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div
                className={`rounded-[1.4cqw] border px-[1.8cqw] py-[1.6cqw] font-mono text-[max(8px,1.5cqw)] ${
                  i === 2 ? "border-accent/60 bg-accent/15 text-white" : "border-white/10 bg-white/[0.04] text-white/70"
                }`}
              >
                {s}
              </div>
              {i < steps.length - 1 && <span className="mx-[1cqw] h-px flex-1 bg-gradient-to-r from-white/20 to-accent/60" />}
            </div>
          ))}
        </div>
        <p className="absolute right-[4%] top-[6%] font-mono text-[max(8px,1.2cqw)] text-white/35">{project.slug}</p>
        <MockTag dark />
      </div>
    );
  }
  if (t === "multi-panel") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#ece9e3]">
        <div className="absolute left-[8%] top-[14%] h-[72%] w-[48%] rounded-[1.6cqw] bg-white p-[2.4cqw] shadow-soft" style={layer(6)}>
          <p className="mb-[1.6cqw] text-right text-[max(12px,3cqw)] font-semibold text-ink" dir="rtl" lang="ur">
            خوش آمدید
          </p>
          {[90, 70, 80, 55].map((w, i) => (
            <Bar key={i} w={`${w}%`} className="mb-[1cqw] ml-auto bg-ink/10" />
          ))}
        </div>
        <div className="absolute right-[8%] top-[24%] h-[56%] w-[34%] rounded-[1.6cqw] bg-ink p-[2cqw]" style={layer(18)}>
          <Bar w="60%" className="mb-[1cqw] bg-accent" />
          <Bar w="80%" className="mb-[1cqw] bg-white/20" />
          <Bar w="50%" className="bg-white/10" />
        </div>
        <MockTag />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eef0f4]">
      <div className="absolute inset-[8%] grid grid-cols-12 gap-[1.4cqw]" style={layer(6)}>
        <div className="col-span-3 rounded-[1.4cqw] bg-white p-[1.6cqw]">
          <Bar w="50%" className="mb-[1.6cqw] bg-accent/60" />
          {[1, 2, 3, 4].map((i) => (
            <Bar key={i} w="90%" className="mb-[1cqw] bg-ink/10" />
          ))}
        </div>
        <div className="col-span-9 flex flex-col gap-[1.4cqw]">
          <div className="grid grid-cols-3 gap-[1.4cqw]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[1.4cqw] bg-white p-[1.6cqw]">
                <Bar w="40%" className="mb-[1.2cqw] bg-ink/10" />
                <Bar w="70%" className="h-[2cqw] bg-accent/25" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-[1cqw] rounded-[1.4cqw] bg-white p-[1.6cqw]">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[0.6cqw] bg-accent/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <MockTag />
    </div>
  );
}

const COMPOSITIONS: Record<string, () => ReactNode> = {
  tattoovisionai: () => <TattooVision />,
  "hirey-ai": () => <HireyAI />,
  estimatrix: () => <Estimatrix />,
  moqah: () => <Moqah />,
};

export function ProductVisual({
  project,
  className = "",
  variant = "card",
}: {
  project: Project;
  className?: string;
  variant?: Variant;
}) {
  const src = getProjectVisual(project);
  const compose = COMPOSITIONS[project.slug];

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ containerType: "inline-size" }}
      data-variant={variant}
      aria-hidden
    >
      {src ? (
        <div className="absolute inset-0 bg-[#e9e6df]">
          <div className="absolute inset-[6%] overflow-hidden rounded-[1.4cqw] shadow-[0_30px_60px_-30px_rgba(17,19,24,0.5)]" style={layer(8)}>
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-top"
              sizes={variant === "stage" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 480px"}
            />
          </div>
        </div>
      ) : compose ? (
        compose()
      ) : (
        <Generic project={project} />
      )}
    </div>
  );
}
