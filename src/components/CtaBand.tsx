"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton } from "@/components/ui/Button";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { hasFinePointer, motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("@/components/3d/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

const MAILTO = "mailto:the.lunox.co@gmail.com?subject=Start%20a%20conversation%20with%20Lunox";

export function CtaBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(motionStore.reduced);
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" }
    );
    io.observe(section);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "center center",
        onUpdate: (self) => {
          motionStore.ctaProgress = self.progress;
        },
      });
      if (motionStore.reduced) return;
      gsap.fromTo(
        "[data-cta-glow]",
        { opacity: 0.2, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.6 },
        }
      );
      gsap.fromTo(
        "[data-cta-sphere]",
        { yPercent: 18, scale: 0.85 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.8 },
        }
      );
    }, section);

    return () => {
      io.disconnect();
      ctx.revert();
      motionStore.ctaProgress = 0;
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!hasFinePointer() || motionStore.reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-nav-theme="dark"
      onPointerMove={onPointerMove}
      className="relative scroll-mt-20 bg-dark text-dark-text"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%", ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      <LiquidEdge color="var(--dark)" seed={5.2} />
      <div className="relative flex min-h-[100svh] items-center overflow-hidden py-28 md:py-36">
        <div
          data-cta-glow
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50% 45% at 50% 55%, rgba(49,91,255,0.18), transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(480px circle at var(--mx) var(--my), rgba(120,145,255,0.09), transparent 65%)" }}
          aria-hidden
        />
        <div
          className="dot-grid pointer-events-none absolute inset-0 opacity-50"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 50% 45% at 50% 55%, #000 10%, transparent 72%)",
            maskImage: "radial-gradient(ellipse 50% 45% at 50% 55%, #000 10%, transparent 72%)",
          }}
          aria-hidden
        />

        {/* The sphere returns, quieter, behind the type. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(110vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-60"
          aria-hidden
        >
        <div data-cta-sphere className="relative h-full w-full">
          {near && !reduced ? (
            <Hero3D source="cta" visible={visible} quality="low" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Image src="/sphere-fallback.svg" alt="" width={360} height={360} className="w-[55%] opacity-70" />
            </div>
          )}
          <div
            className="absolute bottom-[14%] left-[10%] h-[26%] w-[26%]"
            style={{ translate: "calc(var(--px) * -20px) calc(var(--py) * -16px)", transition: "translate 1s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <LiquidBlob className="inset-0" seed={6.2} amp={0.11} speed={0.3} />
          </div>
        </div>
        </div>

        <div className="container-site relative z-10 text-center">
          <Reveal kind="blur">
            <p className="label-mono mb-8 inline-flex items-center gap-3 text-dark-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
              Contact
            </p>
          </Reveal>
          <MaskLines
            className="heading mx-auto text-[48px] leading-[0.94] tracking-[-0.05em] sm:text-[72px] md:text-[104px] lg:text-[128px]"
            lines={["Have something", <span key="w" className="text-dark-muted">worth building?</span>]}
          />
          <Reveal kind="rise" delay={0.2}>
            <p className="mx-auto mt-8 max-w-md text-[17px] text-dark-muted md:text-[18px]">
              Tell us what you&apos;re trying to build, automate or improve.
            </p>
          </Reveal>
          <Reveal kind="depth" delay={0.3} className="mt-12 flex flex-col items-center gap-6">
            <PillButton href={MAILTO} label="Start a conversation" tone="glass" size="lg" />
            <a href="mailto:the.lunox.co@gmail.com" className="link-draw font-mono text-[14px] text-dark-muted transition-colors hover:text-dark-text">
              the.lunox.co@gmail.com
            </a>
          </Reveal>
        </div>
        <div className="grain" aria-hidden />
      </div>
    </section>
  );
}
