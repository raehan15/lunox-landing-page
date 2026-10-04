"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowIcon } from "@/components/ui/Button";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SERVICES, ServiceItem } from "@/data/services";
import { motionStore } from "@/lib/motion";

const DIAGRAMS: Record<ServiceItem["icon"], string[]> = {
  ai: ["Prompt", "Model", "RAG", "Output"],
  web: ["Client", "API", "Services", "Database"],
  mobile: ["App", "API", "Sync", "Store"],
  design: ["Research", "Wire", "System", "UI"],
  qa: ["Trigger", "Workflow", "Systems", "Notify"],
  cloud: ["Build", "Container", "Deploy", "Monitor"],
  team: ["Brief", "Sprint", "Review", "Ship"],
};

/** Node layouts rotate between services so the diagram visibly re-forms. */
const LAYOUTS: [number, number][][] = [
  [[20, 20], [72, 34], [30, 62], [76, 82]],
  [[16, 30], [50, 16], [82, 42], [48, 80]],
  [[24, 16], [24, 50], [74, 50], [74, 84]],
  [[18, 74], [40, 28], [66, 70], [84, 22]],
];

function curveThrough(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const my = (y0 + y1) / 2;
    d += ` C${x0},${my} ${x1},${my} ${x1},${y1}`;
  }
  return d;
}

function ServiceFlow({ index, compact = false }: { index: number; compact?: boolean }) {
  const service = SERVICES[index];
  const nodes = DIAGRAMS[service.icon];
  const pts = LAYOUTS[index % LAYOUTS.length];
  const d = curveThrough(pts);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionStore.reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-flow-path]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" }
      );
      gsap.fromTo(
        "[data-flow-node]",
        { opacity: 0, scale: 0.7, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.14,
          delay: 0.1,
          clearProps: "filter",
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="relative aspect-square w-full" aria-hidden>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
        <path d={d} fill="none" stroke="rgba(17,19,24,0.12)" strokeWidth="0.3" strokeDasharray="0.8 1.2" />
        <path
          data-flow-path
          d={d}
          fill="none"
          stroke="#315BFF"
          strokeWidth="0.45"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
        />
        {!compact && (
          <circle r="0.9" fill="#315BFF">
            <animateMotion dur="3.4s" repeatCount="indefinite" path={d} />
          </circle>
        )}
      </svg>
      {nodes.map((n, i) => (
        <span
          key={`${service.id}-${n}`}
          data-flow-node
          className="glass-panel-light absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1.5 font-mono text-[12px] text-ink md:text-[13px]"
          style={{ left: `${pts[i][0]}%`, top: `${pts[i][1]}%` }}
        >
          <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
          {n}
        </span>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const shown = preview ?? active;
  const phase = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // The liquid surface re-forms between services; the background light follows the open row.
  useEffect(() => {
    const tween = gsap.to(phase, {
      current: shown * 1.7,
      duration: motionStore.reduced ? 0 : 1.4,
      ease: "power3.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [shown]);

  useEffect(() => {
    const place = () => {
      const row = rowRefs.current[active];
      const glow = glowRef.current;
      if (!row || !glow) return;
      glow.style.transform = `translate3d(0, ${row.offsetTop + row.offsetHeight / 2}px, 0)`;
    };
    place();
    const t = window.setTimeout(place, 650);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section id="services" data-nav-theme="light" className="relative scroll-mt-20 bg-paper pb-24 pt-20 md:pb-36 md:pt-28">
      <div className="container-site">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal kind="drift">
              <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
                <span className="h-px w-8 bg-accent" aria-hidden />
                Services
              </p>
            </Reveal>
            <MaskLines
              className="heading text-[52px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[72px] md:text-[96px] lg:text-[112px]"
              lines={["What we", "build."]}
            />
          </div>
          <Reveal kind="blur" delay={0.2} className="lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-[16px] text-ink-muted md:text-[17px]">
              Lunox works across software products, AI systems, automation, and infrastructure — end
              to end, from architecture through handover.
            </p>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div ref={listRef} className="relative lg:col-span-7" onMouseLeave={() => setPreview(null)}>
            <div
              ref={glowRef}
              className="pointer-events-none absolute -left-[20%] top-0 h-[420px] w-[140%] -translate-y-1/2 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                background: "radial-gradient(50% 45% at 30% 50%, rgba(49,91,255,0.09), transparent 70%)",
                marginTop: -210,
              }}
              aria-hidden
            />
            <div className="border-t border-light-border">
              {SERVICES.map((service, i) => {
                const open = i === active;
                const distance = Math.abs(i - active);
                const dim = open ? 1 : preview === i ? 0.9 : Math.max(0.32, 0.62 - distance * 0.07);
                return (
                  <div
                    key={service.id}
                    ref={(el) => {
                      rowRefs.current[i] = el;
                    }}
                    className="relative border-b border-light-border"
                  >
                    {open && (
                      <span className="absolute -left-px bottom-0 top-0 w-[2px] origin-top animate-[grow_0.7s_cubic-bezier(0.16,1,0.3,1)] bg-accent" aria-hidden />
                    )}
                    <button
                      type="button"
                      id={`svc-${service.id}`}
                      aria-expanded={open}
                      aria-controls={`svc-panel-${service.id}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setPreview(i)}
                      onFocus={() => setPreview(i)}
                      onBlur={() => setPreview(null)}
                      className={`group flex w-full items-baseline gap-4 pl-4 text-left transition-[padding,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-6 md:pl-6 ${
                        open ? "pb-4 pt-7" : "py-4 md:py-5"
                      }`}
                      style={{ opacity: dim }}
                    >
                      <span className={`label-mono w-7 shrink-0 transition-colors ${open ? "text-accent" : "text-ink-muted"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`heading flex-1 text-ink transition-[font-size,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          open
                            ? "text-[26px] leading-[1.05] md:text-[38px] lg:text-[44px]"
                            : "text-[18px] leading-snug group-hover:translate-x-1.5 md:text-[22px]"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span
                        className={`relative ml-2 mt-1 grid h-8 w-8 shrink-0 place-items-center self-start rounded-full border transition-all duration-500 ${
                          open ? "rotate-45 border-accent bg-accent text-white" : "border-light-border text-ink"
                        }`}
                        aria-hidden
                      >
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M6 1v10M1 6h10" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`svc-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`svc-${service.id}`}
                      className="expand"
                      data-open={open}
                    >
                      <div>
                        <div className="pb-8 pl-[60px] pr-4 md:pl-[84px] md:pr-12">
                          <p className="max-w-[560px] text-[15px] leading-[1.7] text-ink-muted md:text-[16px]">
                            {service.description}
                          </p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {service.capabilities.map((cap, c) => (
                              <li
                                key={cap}
                                className="rounded-full border border-light-border bg-white/60 px-3 py-1.5 text-[13px] text-ink transition-all duration-700"
                                style={{
                                  transitionDelay: open ? `${180 + c * 70}ms` : "0ms",
                                  opacity: open ? 1 : 0,
                                  transform: open ? "none" : "translateY(8px)",
                                }}
                              >
                                {cap}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8 w-full max-w-[340px] lg:hidden">
                            {open && <ServiceFlow index={i} compact />}
                          </div>
                          <a
                            href="#contact"
                            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink"
                            tabIndex={open ? 0 : -1}
                          >
                            <span className="link-draw">Scope this build</span>
                            <ArrowIcon className="text-accent" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Composition that re-forms for whichever service is shown */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <LiquidBlob
                  className="-inset-[8%]"
                  tone="light"
                  seed={2.2}
                  amp={0.09}
                  phaseRef={phase}
                  speed={0.22}
                />
                <div className="relative p-[12%]">
                  <ServiceFlow index={shown} />
                </div>
                <span className="heading pointer-events-none absolute -bottom-6 right-0 text-[120px] leading-none tracking-[-0.06em] text-ink/[0.06]" aria-hidden>
                  {String(shown + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="label-mono mt-10 flex items-center gap-3 text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {preview !== null && preview !== active ? "Preview" : "Flow"} · {SERVICES[shown].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
