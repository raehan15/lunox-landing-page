"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  { label: "USER", desc: "The people and teams who use the product every day." },
  { label: "PRODUCT", desc: "Flows, interface and design system." },
  { label: "APPLICATION", desc: "Web and mobile apps the user touches." },
  { label: "BACKEND", desc: "APIs, business logic, auth and integrations." },
  { label: "DATA", desc: "Databases, storage and pipelines." },
  { label: "AI / AUTOMATION", desc: "Models, agents and automated workflows." },
  { label: "INFRASTRUCTURE", desc: "Cloud, deployment and monitoring." },
];

/** DATA and AI sit side by side: both hang off the backend. */
const ROWS: number[][] = [[0], [1], [2], [3], [4, 5], [6]];

export function SystemsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (motionStore.reduced) {
      activeRef.current = ROWS.length - 1;
      setActive(ROWS.length - 1);
      return;
    }

    const mm = gsap.matchMedia();
    mm.add(
      {
        pinned: "(min-width: 1024px) and (min-height: 700px)",
        flow: "(max-width: 1023px), (max-height: 699px)",
      },
      (c) => {
        const pinned = !!c.conditions?.pinned;
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]", section);
        const spine = section.querySelector<HTMLElement>("[data-spine]");

        if (pinned) {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          rows.forEach((row, i) => {
            tl.fromTo(
              row,
              { opacity: 0, y: 34, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
              i
            );
          });
          if (spine) tl.fromTo(spine, { scaleY: 0 }, { scaleY: 1, duration: rows.length, ease: "none" }, 0);
          tl.to({}, { duration: 0.6 });
          const total = tl.duration();
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.6,
            animation: tl,
            onUpdate: (self) => {
              const idx = Math.min(ROWS.length - 1, Math.floor(self.progress * total));
              if (idx !== activeRef.current) {
                activeRef.current = idx;
                setActive(idx);
              }
            },
          });
        } else {
          rows.forEach((row, i) => {
            gsap.from(row, {
              opacity: 0,
              y: 30,
              filter: "blur(6px)",
              duration: 0.9,
              ease: "expo.out",
              clearProps: "filter,transform,opacity",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
                onEnter: () => {
                  if (i > activeRef.current) {
                    activeRef.current = i;
                    setActive(i);
                  }
                },
              },
            });
          });
          if (spine) {
            gsap.fromTo(
              spine,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: spine.parentElement, start: "top 75%", end: "bottom 75%", scrub: 0.4 },
              }
            );
          }
        }
      },
      section
    );
    return () => mm.revert();
  }, []);

  const focusRow = hovered ?? active;
  const names = ROWS[focusRow].map((i) => LAYERS[i].label).join(" + ");
  const descs = ROWS[focusRow].map((i) => LAYERS[i].desc).join(" ");

  return (
    <section
      ref={sectionRef}
      id="systems"
      data-nav-theme="light"
      className="relative bg-paper-2 [@media(min-width:1024px)_and_(min-height:700px)]:h-screen"
      aria-labelledby="systems-heading"
    >
      <LiquidEdge color="var(--paper-2)" seed={2.4} className="h-[60px] md:h-[110px]" />
      <div className="container-site grid h-full grid-cols-1 items-center gap-10 py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-5">
          <Reveal kind="drift">
            <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
              <span className="h-px w-8 bg-accent" aria-hidden />
              Systems
            </p>
          </Reveal>
          <div id="systems-heading">
            <MaskLines
              className="heading text-[34px] leading-[1.04] tracking-[-0.04em] text-ink sm:text-[46px] md:text-[54px]"
              lines={["What does a", "Lunox system", "look like?"]}
            />
          </div>
          <Reveal kind="blur" delay={0.15}>
            <p className="mt-6 max-w-md text-[16px] text-ink-muted md:text-[17px]">
              We build connected products — not isolated pages. Each layer is deliberate, from the
              interface to infrastructure.
            </p>
            <p className="mt-3 max-w-md text-[14px] text-ink-muted">
              Read it top to bottom: what the user sees, down to what keeps it running.
            </p>
          </Reveal>

          <div className="mt-8 rounded-2xl border border-light-border bg-white/60 p-5" aria-live="polite">
            <div className="mb-4 flex gap-1.5" aria-hidden>
              {ROWS.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                    i <= focusRow ? "bg-accent" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <p className="label-mono mb-2 text-accent">
              Layer {String(focusRow + 1).padStart(2, "0")} / {String(ROWS.length).padStart(2, "0")}
            </p>
            <p key={focusRow} className="animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="heading block text-[20px] text-ink md:text-[24px]">{names}</span>
              <span className="mt-1 block text-[14px] text-ink-muted">{descs}</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto max-w-[560px] pl-12 sm:pl-14">
            <span className="absolute bottom-6 left-[19px] top-6 w-px bg-ink/10 sm:left-[23px]" aria-hidden>
              <span data-spine className="absolute inset-0 origin-top bg-accent" />
            </span>
            <ol className="space-y-3">
              {ROWS.map((row, r) => {
                const on = focusRow === r;
                return (
                  <li key={r} data-row className="relative">
                    <span
                      className={`absolute -left-12 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border font-mono text-[11px] transition-colors duration-500 sm:-left-14 sm:h-11 sm:w-11 ${
                        on ? "border-accent bg-accent text-white" : r <= active ? "border-accent/50 bg-paper-2 text-accent" : "border-light-border bg-paper-2 text-ink-muted"
                      }`}
                      aria-hidden
                    >
                      {String(r + 1).padStart(2, "0")}
                    </span>
                    <div className={row.length > 1 ? "grid gap-3 sm:grid-cols-2" : ""}>
                      {row.map((i) => (
                        <button
                          key={LAYERS[i].label}
                          type="button"
                          data-active={on}
                          onMouseEnter={() => setHovered(r)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(r)}
                          onBlur={() => setHovered(null)}
                          className={`sys-node relative block w-full rounded-2xl border px-4 py-3 text-left transition-all duration-500 sm:px-5 sm:py-3.5 ${
                            on ? "border-accent/60 bg-white shadow-soft" : "border-light-border bg-white/60 hover:bg-white"
                          }`}
                        >
                          <span className="label-mono block text-[12px] text-ink">{LAYERS[i].label}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">{LAYERS[i].desc}</span>
                        </button>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
