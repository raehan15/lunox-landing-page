"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: "01",
    title: "Discover",
    copy: "Understand the problem, users, constraints and desired outcome.",
    label: "problem → clarity",
  },
  {
    number: "02",
    title: "Design",
    copy: "Define the architecture, workflows, interfaces and technical direction.",
    label: "clarity → architecture",
  },
  {
    number: "03",
    title: "Build",
    copy: "Develop the product in focused iterations with working software throughout the process.",
    label: "architecture → product",
  },
  {
    number: "04",
    title: "Launch + Support",
    copy: "Deploy, monitor, improve and properly hand over the system.",
    label: "product → production",
  },
];

type Atom = {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  fill: string;
  stroke: string;
  dash: string;
};

const dot = (x: number, y: number): Atom => ({
  x,
  y,
  width: 14,
  height: 14,
  rx: 7,
  fill: "rgba(255,255,255,0.55)",
  stroke: "rgba(255,255,255,0)",
  dash: "4 4",
});

const ARCH: [number, number, number, number][] = [
  [220, 40, 160, 56],
  [60, 170, 140, 64],
  [230, 170, 140, 64],
  [400, 170, 140, 64],
  [130, 310, 150, 64],
  [320, 310, 150, 64],
];

/** The same six shapes, re-arranged for each stage. */
const STATES: Atom[][] = [
  [dot(96, 92), dot(468, 70), dot(512, 290), dot(118, 332), dot(292, 392), dot(430, 196)],
  ARCH.map(([x, y, width, height]) => ({
    x,
    y,
    width,
    height,
    rx: 12,
    fill: "rgba(255,255,255,0)",
    stroke: "rgba(255,255,255,0.4)",
    dash: "5 5",
  })),
  ARCH.map(([x, y, width, height], i) => ({
    x,
    y,
    width,
    height,
    rx: 12,
    fill: i === 2 ? "rgba(49,91,255,0.16)" : "rgba(255,255,255,0.05)",
    stroke: i === 2 ? "rgba(49,91,255,0.9)" : "rgba(255,255,255,0.22)",
    dash: "600 0",
  })),
  [
    { x: 100, y: 40, width: 400, height: 310, rx: 18, fill: "rgba(12,16,24,1)", stroke: "rgba(255,255,255,0.16)", dash: "2000 0" },
    { x: 116, y: 86, width: 88, height: 248, rx: 10, fill: "rgba(255,255,255,0.05)", stroke: "rgba(255,255,255,0)", dash: "600 0" },
    { x: 216, y: 86, width: 268, height: 112, rx: 10, fill: "rgba(49,91,255,0.4)", stroke: "rgba(49,91,255,0.9)", dash: "600 0" },
    { x: 216, y: 210, width: 128, height: 124, rx: 10, fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0)", dash: "600 0" },
    { x: 356, y: 210, width: 128, height: 124, rx: 10, fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0)", dash: "600 0" },
    { x: 250, y: 372, width: 100, height: 32, rx: 16, fill: "rgba(49,91,255,1)", stroke: "rgba(49,91,255,0)", dash: "600 0" },
  ],
];

const LINKS = [
  "M300,96 C300,133 130,133 130,170",
  "M300,96 L300,170",
  "M300,96 C300,133 470,133 470,170",
  "M300,234 C300,272 205,272 205,310",
  "M300,234 C300,272 395,272 395,310",
];

const toAttr = (a: Atom) => ({
  x: a.x,
  y: a.y,
  width: a.width,
  height: a.height,
  rx: a.rx,
  fill: a.fill,
  stroke: a.stroke,
  "stroke-dasharray": a.dash,
});

export function ProcessSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const ctx = gsap.context(() => {
      const atoms = gsap.utils.toArray<SVGRectElement>("[data-atom]");
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.7 } });
      const hold = 0.5;

      // Discover → Design
      tl.to("[data-ring]", { opacity: 0, attr: { r: 150 }, duration: 0.6 }, hold);
      atoms.forEach((a, i) => tl.to(a, { attr: toAttr(STATES[1][i]) }, hold + i * 0.03));
      tl.to("[data-links]", { opacity: 1, duration: 0.4 }, hold + 0.4);
      tl.fromTo("[data-link]", { attr: { "stroke-dashoffset": 0.2 } }, { attr: { "stroke-dashoffset": 0 }, duration: 0.5 }, hold + 0.4);

      // Design → Build
      const b = hold * 2 + 0.7;
      atoms.forEach((a, i) => tl.to(a, { attr: toAttr(STATES[2][i]) }, b + i * 0.03));
      tl.to("[data-link]", { attr: { stroke: "rgba(49,91,255,0.75)", "stroke-dasharray": "1 0" } }, b);
      tl.fromTo("[data-code]", { opacity: 0, x: -8 }, { opacity: 1, x: 0, stagger: 0.02, duration: 0.4 }, b + 0.3);

      // Build → Ship
      const s = b + 0.7 + hold;
      tl.to("[data-code]", { opacity: 0, duration: 0.3 }, s);
      tl.to("[data-links]", { opacity: 0, duration: 0.3 }, s);
      atoms.forEach((a, i) => tl.to(a, { attr: toAttr(STATES[3][i]), duration: 0.8 }, s + 0.1 + i * 0.04));
      tl.fromTo("[data-ship]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, s + 0.6);
      tl.to({}, { duration: hold });

      const marks = [0, hold + 0.35, b + 0.35, s + 0.4].map((t) => t / tl.duration());

      if (motionStore.reduced) {
        tl.progress(1);
        activeRef.current = STAGES.length - 1;
        setActive(STAGES.length - 1);
        return;
      }

      const onUpdate = (self: ScrollTrigger) => {
        let idx = 0;
        marks.forEach((m, i) => {
          if (self.progress >= m) idx = i;
        });
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      };

      // Pin only where the whole scene fits on screen. Phones and short
      // landscape screens scrub the same animation while scrolling normally,
      // so nothing is ever cut off.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 700px)", () => {
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: `+=${STAGES.length * 65}%`,
          pin: true,
          scrub: 0.7,
          animation: tl,
          onUpdate,
        });
      });
      mm.add("(max-width: 1023px), (max-height: 699px)", () => {
        ScrollTrigger.create({
          trigger: pin,
          start: "top 65%",
          end: "bottom 45%",
          scrub: 0.7,
          animation: tl,
          onUpdate,
        });
      });
    }, pin);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" data-nav-theme="dark" className="relative scroll-mt-20 bg-dark text-dark-text">
      <LiquidEdge color="var(--dark)" seed={1.1} />
      <div className="container-site pt-24 md:pt-32">
        <Reveal kind="drift">
          <p className="label-mono mb-5 flex items-center gap-3 text-dark-muted">
            <span className="h-px w-8 bg-accent" aria-hidden />
            Process
          </p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <MaskLines
            className="heading text-[52px] leading-[0.95] tracking-[-0.045em] sm:text-[72px] md:text-[96px] lg:col-span-7"
            lines={["How we", <span key="b" className="text-dark-muted">build.</span>]}
          />
          <Reveal kind="blur" delay={0.15} className="lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-[16px] text-dark-muted md:text-[17px]">
              Good software starts with understanding the problem before writing the first line of
              code.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={pinRef} className="flex items-center py-14 md:py-20 [@media(min-width:1024px)_and_(min-height:700px)]:min-h-screen">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <ol className="order-2 lg:order-1 lg:col-span-5 lg:self-center">
              {STAGES.map((s, i) => {
                const open = i === active;
                return (
                  <li key={s.number} className="relative border-b border-dark-border first:border-t">
                    <span
                      className="absolute -left-px bottom-0 top-0 w-[2px] origin-top bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `scaleY(${open ? 1 : 0})` }}
                      aria-hidden
                    />
                    <div className={`flex items-baseline gap-5 pl-5 transition-[padding,opacity] duration-500 ${open ? "py-5 opacity-100" : "py-3.5 opacity-40"}`}>
                      <span className={`label-mono ${open ? "text-accent" : "text-dark-muted"}`}>{s.number}</span>
                      <div className="flex-1">
                        <h3
                          className={`heading text-dark-text transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            open ? "text-[26px] md:text-[36px]" : "text-[18px] md:text-[22px]"
                          }`}
                        >
                          {s.title}
                        </h3>
                        <div className="expand" data-open={open}>
                          <div>
                            <p className="pt-2 text-[15px] text-dark-muted md:text-[16px]">{s.copy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="glass-panel-dark relative overflow-hidden rounded-[24px] p-4 md:p-6">
                <div className="dot-grid absolute inset-0 opacity-50" aria-hidden />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="grid h-5 overflow-hidden">
                    {STAGES.map((s, i) => (
                      <span
                        key={s.label}
                        className="label-mono text-[11px] text-dark-muted transition-all duration-500 [grid-area:1/1]"
                        style={{
                          opacity: i === active ? 1 : 0,
                          transform: `translateY(${(i - active) * 100}%)`,
                        }}
                      >
                        {s.label}
                      </span>
                    ))}
                  </span>
                  <span className="label-mono text-[11px] text-accent">{STAGES[active].number} / 04</span>
                </div>

                <svg className="relative z-10 mt-2 h-auto w-full" viewBox="0 0 600 440" aria-hidden>
                  <circle data-ring cx="300" cy="220" r="96" fill="none" stroke="rgba(49,91,255,0.6)" strokeWidth="1" strokeDasharray="3 6" />
                  <g data-links opacity="0">
                    {LINKS.map((d) => (
                      <path
                        key={d}
                        data-link
                        d={d}
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.2"
                        pathLength={1}
                        strokeDasharray="0.02 0.02"
                      />
                    ))}
                  </g>
                  {STATES[0].map((a, i) => (
                    <rect
                      key={i}
                      data-atom
                      x={a.x}
                      y={a.y}
                      width={a.width}
                      height={a.height}
                      rx={a.rx}
                      fill={a.fill}
                      stroke={a.stroke}
                      strokeDasharray={a.dash}
                      strokeWidth="1.2"
                    />
                  ))}
                  <g data-code opacity="0">
                    {ARCH.map(([x, y, w], i) => (
                      <g key={i}>
                        <rect x={x + 14} y={y + 18} width={w * 0.5} height="5" rx="2.5" fill={i === 2 ? "#315BFF" : "rgba(255,255,255,0.35)"} />
                        <rect x={x + 14} y={y + 32} width={w * 0.32} height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
                      </g>
                    ))}
                  </g>
                  <g data-ship opacity="0">
                    {[0, 1, 2].map((i) => (
                      <circle key={i} cx={122 + i * 14} cy={62} r="4" fill="rgba(255,255,255,0.2)" />
                    ))}
                    <rect x="232" y="106" width="140" height="10" rx="5" fill="rgba(255,255,255,0.85)" />
                    <rect x="232" y="126" width="90" height="7" rx="3.5" fill="rgba(255,255,255,0.45)" />
                    {[0, 1, 2, 3].map((i) => (
                      <rect key={i} x="130" y={104 + i * 22} width={i === 0 ? 56 : 44} height="6" rx="3" fill={i === 0 ? "#315BFF" : "rgba(255,255,255,0.2)"} />
                    ))}
                    <circle cx="272" cy="388" r="4" fill="#fff">
                      <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                    <text x="286" y="393" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="13" letterSpacing="1.5">
                      LIVE
                    </text>
                  </g>
                </svg>

                <div className="relative z-10 mt-2 flex gap-1.5" aria-hidden>
                  {STAGES.map((s, i) => (
                    <span key={s.number} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-accent" : "bg-white/10"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
