"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Project,
  WORK_FILTERS,
  WorkFilter,
  getFeaturedProjects,
  getProjectsByFilter,
} from "@/data/projects";
import { ProductVisual } from "@/components/work/ProductVisual";
import { ArrowIcon, IconButton, PillButton } from "@/components/ui/Button";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { clamp, hasFinePointer, motionStore, scrollToTarget, smoothstep } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Featured: one product owns the stage; scroll (desktop) or swipe      */
/* (touch) moves a continuous position through the set.                 */
/* ------------------------------------------------------------------ */

function FeaturedStage({ items }: { items: Project[] }) {
  const n = items.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const target = useRef(0);
  const phase = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (i: number) => {
      const next = clamp(i, 0, n - 1);
      const st = stRef.current;
      if (st) {
        scrollToTarget(st.start + (next / Math.max(1, n - 1)) * (st.end - st.start), 0);
      } else {
        target.current = next;
      }
    },
    [n]
  );

  // Pin + scroll mapping on desktop; the position holds on each product before moving on.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 700px)", () => {
      if (motionStore.reduced) return;
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${(n - 1) * 95}%`,
        pin: true,
        onUpdate: (self) => {
          const raw = self.progress * (n - 1);
          const seg = Math.min(Math.floor(raw), n - 2);
          const frac = raw - seg;
          target.current = seg + smoothstep(0.22, 0.78, frac);
        },
      });
      stRef.current = st;
      return () => {
        stRef.current = null;
        st.kill();
      };
    });
    return () => mm.revert();
  }, [n]);

  // Render loop: smooth the position and write styles directly.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const visuals = Array.from(root.querySelectorAll<HTMLElement>("[data-feat-visual]"));
    const texts = Array.from(root.querySelectorAll<HTMLElement>("[data-feat-text]"));
    const numbers = root.querySelector<HTMLElement>("[data-feat-numbers]");
    const fill = root.querySelector<HTMLElement>("[data-feat-fill]");
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-feat-dot]"));
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px" });
    io.observe(root);
    let last = -1;

    const tick = () => {
      if (!visible) return;
      const k = motionStore.reduced ? 1 : 0.085;
      pos.current += (target.current - pos.current) * k;
      if (Math.abs(target.current - pos.current) < 0.0005) pos.current = target.current;
      const p = pos.current;
      if (p === last) return;
      last = p;
      phase.current = p * 1.6;

      visuals.forEach((el, i) => {
        const d = i - p;
        const a = Math.min(Math.abs(d), 1.4);
        const x = d * 34;
        const s = 1 - Math.min(a, 1) * 0.16;
        const blur = a * 14;
        const op = clamp(1 - a * 1.15, 0, 1);
        // At rest use no transform at all so the mockup is rasterised crisply.
        el.style.transform =
          a < 0.002
            ? "none"
            : `translate3d(${x}%, ${Math.abs(d) * 3}%, ${-a * 160}px) rotateY(${-d * 16}deg) scale(${s})`;
        el.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : "none";
        el.style.opacity = op.toFixed(3);
        el.style.visibility = op < 0.01 ? "hidden" : "visible";
        el.style.zIndex = String(10 - Math.round(a * 5));
      });

      texts.forEach((el, i) => {
        const lines = el.querySelectorAll<HTMLElement>("[data-feat-line]");
        lines.forEach((line, j) => {
          // Stagger by scaling the distance, so every line is exactly at rest when d = 0.
          const d = (i - p) * (1 + j * 0.18);
          const a = Math.abs(d);
          if (a < 0.004) {
            line.style.transform = "none";
            line.style.opacity = "1";
            line.style.filter = "none";
            return;
          }
          line.style.transform = `translate3d(0, ${d * 70}px, 0)`;
          line.style.opacity = clamp(1 - a * 2.4, 0, 1).toFixed(3);
          line.style.filter = a > 0.03 ? `blur(${Math.min(a * 16, 10).toFixed(1)}px)` : "none";
        });
        el.style.visibility = Math.abs(i - p) > 0.9 ? "hidden" : "visible";
      });

      if (numbers) numbers.style.transform = `translate3d(0, ${-p * 100}%, 0)`;
      if (fill) fill.style.transform = `scaleX(${n > 1 ? (p / (n - 1)).toFixed(4) : 1})`;
      dots.forEach((dot, i) => {
        const w = 1 - Math.min(Math.abs(i - p), 1);
        dot.style.width = `${10 + w * 34}px`;
        dot.style.backgroundColor = w > 0.5 ? "var(--accent)" : "rgba(17,19,24,0.18)";
      });

      const idx = Math.round(p);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, [n]);

  // Arrow keys while the stage is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const r = root.getBoundingClientRect();
      if (r.bottom < window.innerHeight * 0.3 || r.top > window.innerHeight * 0.7) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(activeRef.current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = drag.current;
    drag.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    go(activeRef.current + (dx < 0 ? 1 : -1));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer() || motionStore.reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <div
      ref={rootRef}
      className="relative bg-paper [@media(min-width:1024px)_and_(min-height:700px)]:flex [@media(min-width:1024px)_and_(min-height:700px)]:h-screen [@media(min-width:1024px)_and_(min-height:700px)]:items-center"
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      <div className="container-site relative w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Visual stage */}
          <div className="relative lg:order-2 lg:col-span-8">
            <LiquidBlob
              className="-inset-x-[10%] -inset-y-[14%] hidden lg:block"
              tone="light"
              seed={3.3}
              amp={0.07}
              phaseRef={phase}
              speed={0.18}
              rim={false}
            />
            <div
              ref={stageRef}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (drag.current = null)}
              onPointerMove={onPointerMove}
              className="relative aspect-[4/3] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing sm:aspect-[16/11]"
              style={{ perspective: 1600, ["--px" as string]: 0, ["--py" as string]: 0 }}
            >
              {items.map((p, i) => (
                <div
                  key={p.slug}
                  data-feat-visual
                  className="absolute inset-0 overflow-hidden rounded-[22px] border border-ink/10 shadow-[0_40px_90px_-40px_rgba(17,19,24,0.55)] will-change-[transform,filter,opacity] md:rounded-[28px]"
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <ProductVisual project={p} variant="stage" />
                </div>
              ))}
            </div>
          </div>

          {/* Text — every product's copy is stacked in one cell and crossfades line by line. */}
          <div className="relative lg:order-1 lg:col-span-4">
            <div className="mb-8 flex items-end justify-between gap-6 lg:mb-10">
              <div className="flex items-end gap-3">
                <span className="heading relative block h-[1em] overflow-hidden text-[56px] leading-none tracking-[-0.05em] text-ink md:text-[72px]">
                  <span data-feat-numbers className="block will-change-transform">
                    {items.map((_, i) => (
                      <span key={i} className="block h-[1em]">
                        {pad(i + 1)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="label-mono pb-2 text-ink-muted">/ {pad(n)}</span>
              </div>
              <div className="flex gap-2">
                <IconButton direction="prev" label="Previous product" onClick={() => go(activeRef.current - 1)} />
                <IconButton direction="next" label="Next product" onClick={() => go(activeRef.current + 1)} />
              </div>
            </div>

            <div className="grid">
              {items.map((p, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={p.slug}
                    data-feat-text
                    className="[grid-area:1/1]"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${n}: ${p.title}`}
                    aria-hidden={!isActive}
                    style={{ visibility: i === 0 ? "visible" : "hidden" }}
                  >
                    <p data-feat-line className="label-mono mb-4 flex items-center gap-2 text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      {p.category}
                    </p>
                    <h3 data-feat-line className="heading mb-3 text-[32px] leading-[1.02] tracking-[-0.04em] text-ink md:text-[44px]">
                      {p.title}
                    </h3>
                    <p data-feat-line className="mb-4 text-[17px] font-medium text-ink md:text-[18px]">
                      {p.tagline}
                    </p>
                    <p data-feat-line className="mb-6 text-[15px] leading-[1.7] text-ink-muted">
                      {p.description}
                    </p>
                    <div data-feat-line className="mb-6 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((t) => (
                        <span key={t} className="rounded-full border border-light-border px-2.5 py-1 font-mono text-[12px] text-ink-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.results.length > 0 && (
                      <ul data-feat-line className="mb-6 space-y-1">
                        {p.results.map((r) => (
                          <li key={r} className="text-[14px] text-ink">
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div data-feat-line className="flex flex-wrap items-center gap-3"
                      ref={(el) => {
                        el?.toggleAttribute("inert", !isActive);
                      }}
                    >
                      <PillButton href={`/work/${p.slug}`} label="View case study" tone="solid" size="md" />
                      {p.link ? (
                        <PillButton
                          href={p.link}
                          label="Visit live site"
                          tone="outline"
                          size="md"
                          external
                        />
                      ) : (
                        <span className="label-mono px-2 text-ink-muted">
                          {p.status === "proprietary" ? "Proprietary" : "Internal"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Morphing progress */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose product">
                {items.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show ${p.title}`}
                    onClick={() => go(i)}
                    className="group grid h-11 min-w-[28px] place-items-center"
                  >
                    <span data-feat-dot className="block h-1.5 w-2.5 rounded-full bg-ink/20 transition-colors group-hover:bg-ink/40" />
                  </button>
                ))}
              </div>
              <span className="relative h-px flex-1 overflow-hidden bg-ink/10">
                <span data-feat-fill className="absolute inset-0 origin-left scale-x-0 bg-ink" />
              </span>
              <span className="label-mono hidden text-[11px] text-ink-muted lg:inline">Scroll · Drag · ← →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* More work: editorial index with a preview that follows the cursor.  */
/* ------------------------------------------------------------------ */

const MORE_PREVIEW = 3;

function MoreWork() {
  const [filter, setFilter] = useState<WorkFilter>("All");
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  // Skip featured (already in the carousel). Prefer live products first.
  const filtered = getProjectsByFilter(filter)
    .filter((p) => !p.featured)
    .slice()
    .sort((a, b) => Number(!!b.link) - Number(!!a.link));
  const visible = expanded ? filtered : filtered.slice(0, MORE_PREVIEW);
  const hiddenCount = Math.max(0, filtered.length - MORE_PREVIEW);

  useEffect(() => {
    setExpanded(false);
  }, [filter]);

  // After the list grows or shrinks, pinned sections below (Process, etc.)
  // must recalculate their start/end or they fire mid-page.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(id);
  }, [expanded, filter]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    quick.current = {
      x: gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" }),
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (!hasFinePointer()) return;
    quick.current?.x(e.clientX + 28);
    quick.current?.y(e.clientY - 120);
  };

  return (
    <div className="container-site relative pb-24 pt-24 md:pb-36 md:pt-32">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <MaskLines as="h3" className="heading text-[40px] leading-[0.98] tracking-[-0.04em] text-ink md:text-[64px]" lines={["More work"]} />
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
          {WORK_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-[40px] rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 md:min-h-0 md:px-3.5 md:py-1.5 ${
                filter === f
                  ? "border-ink bg-ink text-white"
                  : "border-light-border bg-transparent text-ink-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul
        key={`${filter}-${expanded}`}
        className="border-t border-light-border"
        onPointerMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        {visible.map((p, i) => (
          <li
            key={p.slug}
            className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both] border-b border-light-border"
            style={{ animationDelay: `${i * 45}ms` }}
            onMouseEnter={() => setHovered(p)}
          >
            <div className="group relative grid grid-cols-[88px_1fr_auto] items-center gap-4 py-5 md:grid-cols-[48px_1fr_minmax(0,1fr)_auto_40px] md:gap-6 md:py-7">
              <Link
                href={`/work/${p.slug}`}
                onFocus={() => setHovered(null)}
                className="relative aspect-[4/3] w-[88px] overflow-hidden rounded-[10px] border border-light-border md:hidden"
                aria-label={`${p.title} case study`}
              >
                <ProductVisual project={p} />
              </Link>
              <span className="label-mono hidden text-ink-muted md:block">{pad(i + 1)}</span>
              <div className="min-w-0">
                <Link
                  href={`/work/${p.slug}`}
                  className="heading block truncate text-[19px] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-[28px]"
                >
                  {p.title}
                </Link>
                <span className="mt-1 block truncate text-[14px] text-ink-muted md:hidden">{p.category}</span>
              </div>
              <span className="hidden truncate text-[14px] text-ink-muted md:block">{p.category}</span>
              <div className="flex shrink-0 items-center justify-end gap-3">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-accent"
                    aria-label={`Open live site for ${p.title}`}
                  >
                    <span className="link-draw">Live</span>
                    <ArrowIcon className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" plain />
                  </a>
                ) : (
                  <span className="hidden font-mono text-[12px] text-ink-muted md:inline">
                    {p.status === "proprietary" ? "Proprietary" : "Internal"}
                  </span>
                )}
              </div>
              <Link
                href={`/work/${p.slug}`}
                aria-label={`View ${p.title} case study`}
                className="grid h-9 w-9 place-items-center rounded-full border border-light-border text-ink transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
              >
                <ArrowIcon className="h-3.5 w-3.5" plain />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-light-border bg-white/70 px-5 py-2.5 text-[14px] font-medium text-ink transition-all duration-300 hover:border-ink/30"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
            <span
              className={`grid h-7 w-7 place-items-center rounded-full border border-light-border transition-transform duration-500 ${
                expanded ? "rotate-45" : "group-hover:rotate-90"
              }`}
              aria-hidden
            >
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 1v10M1 6h10" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Cursor preview (fine pointers only) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        aria-hidden
      >
        <div
          className={`aspect-[4/3] w-[340px] overflow-hidden rounded-[18px] border border-ink/10 shadow-[0_30px_70px_-30px_rgba(17,19,24,0.6)] transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hovered ? "scale-100 opacity-100 blur-0" : "scale-75 opacity-0 blur-md"
          }`}
        >
          {hovered && <ProductVisual key={hovered.slug} project={hovered} />}
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  const featured = getFeaturedProjects();

  return (
    <section id="work" data-nav-theme="light" className="relative scroll-mt-20 bg-paper">
      <div className="container-site pb-6 pt-24 md:pb-10 md:pt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal kind="drift">
              <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
                <span className="h-px w-8 bg-accent" aria-hidden />
                Selected work
              </p>
            </Reveal>
            <MaskLines
              className="heading text-[52px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[72px] md:text-[96px]"
              lines={["Built for", "real problems."]}
            />
          </div>
          <Reveal kind="blur" delay={0.15} className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-[16px] text-ink-muted md:text-[17px]">
              From AI products and automation systems to full-stack platforms and data-intensive
              software.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="pt-10 lg:pt-0">
        <FeaturedStage items={featured} />
      </div>

      <MoreWork />
    </section>
  );
}
