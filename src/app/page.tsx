"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SystemsStrip } from "@/components/SystemsStrip";
import { WorkSection } from "@/components/WorkSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StackSection } from "@/components/StackSection";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { clamp, motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Share of the runway spent transforming the hero before the surface appears. */
const LEAD = 0.29;

export default function Home() {
  const [reduced, setReduced] = useState(false);
  const runwayRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const curtainProgress = useRef(0);

  useEffect(() => setReduced(motionStore.reduced), []);

  useEffect(() => {
    const runway = runwayRef.current;
    if (reduced || !runway) return;
    const hero = runway.querySelector<HTMLElement>("#hero");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            motionStore.heroProgress = p;
            const c = clamp((p - LEAD) / (1 - LEAD), 0, 1);
            curtainProgress.current = c;
            hero?.style.setProperty("--hp", clamp(p / LEAD, 0, 1).toFixed(3));
            if (bandRef.current) bandRef.current.style.opacity = String(Math.sin(c * Math.PI));
          },
        },
      });

      tl.to("[data-hero-title]", { scale: 0.86, y: -70, duration: 0.55 }, 0)
        .to("[data-hero-title]", { opacity: 0.15, duration: 0.4 }, 0.35)
        .to("[data-hero-copy]", { y: -36, opacity: 0, duration: 0.3 }, 0)
        .to("[data-hero-visual]", { scale: 0.78, y: 90, duration: 1 }, 0)
        .to(
          "[data-hero-scene]",
          { filter: "blur(8px) brightness(0.55)", scale: 0.94, duration: 0.75 },
          0.25
        )
        .to("[data-hero-veil]", { opacity: 0.55, duration: 0.6 }, 0.4);
    }, runway);

    ScrollTrigger.sort();
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
      motionStore.heroProgress = 0;
    };
  }, [reduced]);

  return (
    <main className="relative w-full overflow-x-clip">
      <div ref={runwayRef} className={reduced ? "relative" : "relative h-[240vh]"}>
        <div className={reduced ? "relative h-screen" : "sticky top-0 z-0 h-screen w-full"}>
          <HeroSection />
        </div>
      </div>

      <div className={`relative z-10 bg-paper ${reduced ? "" : "-mt-[100vh]"}`}>
        {!reduced && (
          <>
            {/* Band where the old scene smears as the new surface pushes through it. */}
            <div
              ref={bandRef}
              className="pointer-events-none absolute inset-x-0 bottom-full h-[36vh] opacity-0"
              style={{ background: "linear-gradient(to top, rgba(5,7,11,0.7), transparent)" }}
              aria-hidden
            />
            <LiquidEdge color="var(--paper)" progressRef={curtainProgress} className="h-[16vh]" seed={0.6} />
          </>
        )}
        <ServicesSection />
        <SystemsStrip />
        <WorkSection />
        <ProcessSection />
        <StackSection />
        <CtaBand />
        <Footer />
      </div>
    </main>
  );
}
