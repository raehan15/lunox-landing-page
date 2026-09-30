"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { hasFinePointer, motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Node = { id: string; label: string; x: number; y: number; depth: number };

const NODES: Node[] = [
  { id: "user", label: "USER", x: 50, y: 7, depth: 1.4 },
  { id: "product", label: "PRODUCT", x: 50, y: 22, depth: 1.1 },
  { id: "app", label: "APPLICATION", x: 50, y: 38, depth: 0.9 },
  { id: "backend", label: "BACKEND", x: 50, y: 54, depth: 0.7 },
  { id: "data", label: "DATA", x: 22, y: 72, depth: 1.2 },
  { id: "ai", label: "AI / AUTOMATION", x: 78, y: 72, depth: 1.3 },
  { id: "infra", label: "INFRASTRUCTURE", x: 50, y: 90, depth: 0.6 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
];

/** SVG y units: the stage is 5:6, so 100 x 120. */
const SY = 1.2;

function edgeD(a: Node, b: Node) {
  const ax = a.x;
  const ay = a.y * SY;
  const bx = b.x;
  const by = b.y * SY;
  if (ax === bx || ay === by) return `M${ax},${ay} L${bx},${by}`;
  const my = (ay + by) / 2;
  return `M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`;
}

const STEP = 1;
const START = 0.6;

export function SystemsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);
  const activeRef = useRef(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (motionStore.reduced) {
      section.querySelector("[data-sys-in]")?.setAttribute("stroke-dashoffset", "0");
      setActive(NODES.length - 1);
      setComplete(true);
      return;
    }

    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" },
      (c) => {
        const desktop = c.conditions?.desktop;
        const nodes = gsap.utils.toArray<HTMLElement>("[data-sys-node]", section);
        const posts = gsap.utils.toArray<HTMLElement>("[data-sys-pos]", section);
        const edges = gsap.utils.toArray<SVGPathElement>("[data-sys-edge]", section);

        gsap.set(nodes, { opacity: 0, scale: 0.6, filter: "blur(8px)" });
        gsap.set(edges, { strokeDashoffset: 1 });
        gsap.set("[data-sys-frame]", { opacity: 0, scale: 0.4 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to("[data-sys-in]", { strokeDashoffset: 0, duration: START, ease: "none" }, 0);
        NODES.forEach((_, i) => {
          const at = START + i * STEP;
          tl.to(nodes[i], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55 }, at);
          EDGES.forEach(([a, b], e) => {
            if (Math.max(a, b) === i) tl.to(edges[e], { strokeDashoffset: 0, duration: 0.6, ease: "none" }, at + 0.2);
          });
        });
        const endBuild = START + NODES.length * STEP;

        if (desktop) {
          // Hold, then the whole system folds into a single product frame for Work.
          tl.to({}, { duration: 0.8 }, endBuild);
          tl.to(posts, { left: "50%", top: "50%", duration: 1.2, ease: "power3.in" }, endBuild + 0.8);
          tl.to(nodes, { opacity: 0, scale: 0.5, duration: 1, ease: "power2.in" }, endBuild + 1);
          tl.to("[data-sys-edges]", { opacity: 0, duration: 0.8 }, endBuild + 0.8);
          tl.to("[data-sys-frame]", { opacity: 1, scale: 1, duration: 1, ease: "expo.out" }, endBuild + 1.6);
          tl.to({}, { duration: 0.4 });
        }

        const total = tl.duration();
        ScrollTrigger.create({
          trigger: section,
          start: desktop ? "top top" : "top 70%",
          end: desktop ? "+=180%" : "bottom 70%",
          pin: desktop ? section : false,
          scrub: 0.6,
          animation: tl,
          onUpdate: (self) => {
            const time = self.progress * total;
            const idx = Math.min(NODES.length - 1, Math.floor((time - START) / STEP));
            const next = time < START ? -1 : idx;
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
            setComplete(time >= endBuild - 0.1);
          },
        });

        return () => {
          gsap.set([...nodes, ...posts, ...edges], { clearProps: "all" });
        };
      },
      section
    );

    return () => mm.revert();
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer() || motionStore.reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const focus = hovered ?? active;
  const info = focus >= 0 ? NODES[focus] : null;

  return (
    <section
      ref={sectionRef}
      id="systems"
      data-nav-theme="light"
      className="relative bg-paper-2 lg:h-screen"
      aria-labelledby="systems-heading"
    >
      <LiquidEdge color="var(--paper-2)" seed={2.4} className="h-[60px] md:h-[110px]" />
      <div className="container-site grid h-full grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-0">
        <div className="lg:col-span-5">
          <Reveal kind="drift">
            <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
              <span className="h-px w-8 bg-accent" aria-hidden />
              Systems
            </p>
          </Reveal>
          <div id="systems-heading">
            <MaskLines
              className="heading text-[36px] leading-[1.02] tracking-[-0.04em] text-ink sm:text-[48px] md:text-[58px]"
              lines={["What does a", "Lunox system", "look like?"]}
            />
          </div>
          <Reveal kind="blur" delay={0.15}>
            <p className="mt-6 max-w-md text-[16px] text-ink-muted md:text-[17px]">
              We build connected products — not isolated pages. Each layer is deliberate, from the
              interface to infrastructure.
            </p>
          </Reveal>

          {/* Active layer readout */}
          <div className="mt-10 hidden lg:block" aria-live="polite">
            <div className="flex items-center gap-1.5" aria-hidden>
              {NODES.map((n, i) => (
                <span
                  key={n.id}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                    i <= active ? "bg-accent" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="label-mono text-accent">
                {info ? String(NODES.indexOf(info) + 1).padStart(2, "0") : "00"} / 07
              </span>
              <span
                key={info?.id ?? "none"}
                className="heading animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)] text-[22px] text-ink"
              >
                {info ? info.label : "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={stageRef}
            onPointerMove={onPointerMove}
            className="relative mx-auto aspect-[5/6] w-full max-w-[520px] lg:w-[min(100%,68vh)] lg:max-w-none"
            style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
          >
            <div className="dot-grid-light absolute inset-0 opacity-60 mask-radial" aria-hidden />
            <svg
              data-sys-edges
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 120"
              aria-hidden
            >
              <path
                data-sys-in
                d={`M50,-40 L50,${NODES[0].y * SY}`}
                fill="none"
                stroke="#315BFF"
                strokeWidth="0.3"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1}
              />
              {EDGES.map(([a, b], e) => {
                const lit = focus >= 0 && (a === focus || b === focus);
                const d = edgeD(NODES[a], NODES[b]);
                return (
                  <g key={e}>
                    <path
                      data-sys-edge
                      d={d}
                      fill="none"
                      stroke={lit ? "#315BFF" : "rgba(17,19,24,0.22)"}
                      strokeWidth={lit ? 0.45 : 0.28}
                      pathLength={1}
                      strokeDasharray="1"
                      style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                    />
                    {complete && !motionStore.reduced && (
                      <circle r="0.8" fill="#315BFF" opacity={lit ? 1 : 0.55}>
                        <animateMotion dur={`${2.6 + (e % 3) * 0.7}s`} repeatCount="indefinite" path={d} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {NODES.map((n, i) => (
              <div
                key={n.id}
                data-sys-pos
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div
                  style={{
                    translate: `calc(var(--px) * ${n.depth * 10}px) calc(var(--py) * ${n.depth * 8}px)`,
                    transition: "translate 0.8s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <button
                    type="button"
                    data-sys-node
                    data-active={i === focus}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className="sys-node glass-panel-light relative whitespace-nowrap rounded-full px-3.5 py-2 transition-[border-color,box-shadow] duration-500 md:px-4"
                  >
                    <span className="label-mono text-[11px] text-ink md:text-[12px]">{n.label}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* The system folds into this frame on the way into Work. */}
            <div
              data-sys-frame
              className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-[16/10] w-[82%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border border-ink/10 bg-dark shadow-product lg:block"
              aria-hidden
            >
              <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="grid h-[calc(100%-1.75rem)] grid-cols-3 gap-2 p-3">
                <div className="col-span-1 rounded-md bg-white/[0.04]" />
                <div className="col-span-2 flex flex-col gap-2">
                  <div className="h-1/3 rounded-md bg-accent/30" />
                  <div className="flex-1 rounded-md bg-white/[0.04]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
