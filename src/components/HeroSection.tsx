"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PillButton } from "@/components/ui/Button";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { MaskLines } from "@/components/ui/Reveal";
import { PHONE_QUERY, hasFinePointer, motionStore } from "@/lib/motion";

const Hero3D = dynamic(
  () => import("@/components/3d/Hero3D").then((m) => m.Hero3D),
  { ssr: false, loading: () => <SphereFallback /> }
);

function SphereFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        src="/sphere-fallback.svg"
        alt=""
        width={420}
        height={420}
        priority
        className="h-auto w-[62%] max-w-[400px] opacity-90"
      />
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  // The 3D scene is not shown or even downloaded on phones (portrait or landscape).
  useEffect(() => {
    setReduced(motionStore.reduced);
    if (motionStore.reduced) return;
    const mq = window.matchMedia(PHONE_QUERY);
    let timer = 0;
    const apply = () => {
      window.clearTimeout(timer);
      if (mq.matches) {
        setShow3D(false);
        return;
      }
      timer = window.setTimeout(() => setShow3D(true), 250);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Intro: the scene resolves from blur, copy lifts in after the headline.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || motionStore.reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-intro-visual]", {
        scale: 1.08,
        filter: "blur(24px)",
        opacity: 0,
        duration: 1.8,
        ease: "expo.out",
        clearProps: "filter,transform,opacity",
      });
      gsap.from("[data-intro]", {
        y: 22,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.45,
        clearProps: "transform,opacity",
      });
      gsap.from("[data-intro-lens]", {
        scale: 0.6,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.3,
        clearProps: "transform,opacity",
      });
    }, el);
    return () => ctx.revert();
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
      id="hero"
      data-nav-theme="dark"
      onPointerMove={onPointerMove}
      className="relative h-full min-h-[600px] w-full overflow-hidden bg-dark text-dark-text"
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "40%", ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* Atmosphere — blurs and dims as the next surface arrives. */}
      <div data-hero-scene className="absolute inset-0 origin-center will-change-[filter,transform]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 72% 42%, rgba(49,91,255,0.16), transparent 70%), radial-gradient(40% 40% at 20% 90%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />
        <div
          className="dot-grid absolute inset-0 opacity-60"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 70% 45%, #000 10%, transparent 72%)",
            maskImage: "radial-gradient(ellipse 55% 50% at 70% 45%, #000 10%, transparent 72%)",
          }}
        />
        {/* Cursor light */}
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx) var(--my), rgba(120,145,255,0.10), transparent 65%)",
          }}
        />

        {/* Sphere stage: positioned by the outer box, moved by scroll + intro on inner layers. */}
        <div className="container-site hide-on-phone pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute left-1/2 top-[10%] aspect-square h-[min(30vh,240px)] -translate-x-1/2 sm:h-[min(34vh,330px)] lg:left-auto lg:right-0 lg:top-1/2 lg:h-auto lg:w-[min(38vw,560px)] lg:translate-x-0 lg:-translate-y-1/2 xl:w-[min(36vw,640px)]">
          <div data-hero-visual className="relative h-full w-full">
            <div data-intro-visual className="relative h-full w-full">
              {/* Bloom behind the glass */}
              <div
                className="absolute inset-[14%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 40% 38%, rgba(140,160,255,0.35), rgba(49,91,255,0.12) 45%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0">
                {show3D && !reduced ? <Hero3D source="hero" visible={visible} /> : <SphereFallback />}
              </div>

              {/* Floor reflection */}
              <div
                className="absolute bottom-[2%] left-1/2 h-[10%] w-[58%] -translate-x-1/2 rounded-[50%] blur-2xl"
                style={{ background: "radial-gradient(closest-side, rgba(170,185,255,0.22), transparent)" }}
              />
              <div className="absolute bottom-[7%] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Glass lenses — real backdrop blur over the WebGL canvas, drifting against the pointer. */}
              <div
                className="absolute bottom-[10%] left-[4%] h-[34%] w-[34%]"
                style={{
                  translate: "calc(var(--px) * -18px) calc(var(--py) * -14px)",
                  transition: "translate 0.9s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div data-intro-lens className="h-full w-full">
                  <LiquidBlob className="inset-0" seed={1.3} amp={0.1} speed={0.28} />
                </div>
              </div>
              <div
                className="absolute right-[10%] top-[8%] h-[16%] w-[16%]"
                style={{
                  translate: "calc(var(--px) * 26px) calc(var(--py) * 20px)",
                  transition: "translate 1.1s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div data-intro-lens className="h-full w-full">
                  <LiquidBlob className="inset-0" seed={4.1} amp={0.12} speed={0.4} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Copy */}
      <div className="hero-copy-wrap container-site relative z-10 flex h-full flex-col justify-end pb-[max(3rem,7vh)] pt-24 sm:pt-28 lg:justify-center lg:pb-16">
        <div className="hero-copy-inner max-w-[880px] lg:max-w-[54%]">
          <p data-intro className="label-mono mb-6 flex items-center gap-3 text-dark-muted">
            <span className="h-px w-8 bg-accent" aria-hidden />
            Software + AI engineering
          </p>

          <div data-hero-title className="hero-title origin-bottom-left will-change-transform">
            <MaskLines
              as="h1"
              trigger="mount"
              delay={0.15}
              className="heading text-[36px] leading-[0.98] tracking-[-0.045em] sm:text-[54px] md:text-[68px] lg:text-[58px] xl:text-[72px] 2xl:text-[84px]"
              lines={[
                "We build software",
                "that moves ideas",
                <span key="f" className="text-dark-muted">
                  forward.
                </span>,
              ]}
            />
          </div>

          <div data-hero-copy className="hero-actions-wrap mt-8 md:mt-10">
            <p data-intro className="hero-para mb-9 max-w-[440px] text-[16px] leading-[1.65] text-dark-muted md:text-[17px]">
              We design and build custom software, intelligent automation and AI-powered systems for
              problems that off-the-shelf software can&apos;t solve.
            </p>
            <div data-intro className="flex flex-wrap items-center gap-3">
              <PillButton href="#contact" label="Start a conversation" tone="glass" size="md" />
              <PillButton href="#work" label="Explore our work" tone="outline-dark" size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — fills as the scene transforms. */}
      <div
        data-intro
        className="absolute bottom-8 right-5 z-10 hidden items-end gap-3 sm:right-8 md:flex"
        aria-hidden
      >
        <span className="label-mono text-[11px] text-dark-muted [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-white/15">
          <span
            className="absolute inset-0 origin-top bg-accent"
            style={{ transform: "scaleY(var(--hp, 0))" }}
          />
        </span>
      </div>

      <div data-hero-veil className="pointer-events-none absolute inset-0 z-20 bg-dark opacity-0" aria-hidden />
      <div className="grain z-20" aria-hidden />
    </section>
  );
}
