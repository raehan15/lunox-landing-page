"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton } from "@/components/ui/Button";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { LiquidEdge } from "@/components/ui/LiquidEdge";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/contact";
import { hasFinePointer, isPhone, motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("@/components/3d/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

const WHATSAPP = whatsappHref("Hi Lunox — I'd like to start a conversation about a project.");
const TEL = telHref();

export function CtaBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      name.trim() ? `Name: ${name.trim()}` : null,
      email.trim() ? `Email: ${email.trim()}` : null,
      "",
      message.trim() || "(no message)",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
    window.location.href = mailtoHref({
      subject: "Start a conversation with Lunox",
      body,
    });
  };

  useEffect(() => {
    setReduced(motionStore.reduced);
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        // Never mount the 3D scene on phones (portrait or landscape).
        if (e.isIntersecting && !isPhone() && !motionStore.reduced) setNear(true);
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
          className="hide-on-phone pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(110vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-60"
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
          <Reveal kind="depth" delay={0.3} className="mx-auto mt-12 w-full max-w-lg text-left">
            <form
              onSubmit={onSubmit}
              className="glass-panel-dark space-y-4 rounded-[22px] border border-white/10 p-5 md:p-7"
              noValidate
            >
              <label className="block">
                <span className="label-mono mb-2 block text-[11px] text-dark-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-[48px] w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-[15px] text-dark-text outline-none transition-colors placeholder:text-dark-muted/60 focus:border-accent/50"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="label-mono mb-2 block text-[11px] text-dark-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[48px] w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-[15px] text-dark-text outline-none transition-colors placeholder:text-dark-muted/60 focus:border-accent/50"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="label-mono mb-2 block text-[11px] text-dark-muted">What are you building?</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-dark-text outline-none transition-colors placeholder:text-dark-muted/60 focus:border-accent/50"
                  placeholder="A short note about the product, system, or problem."
                />
              </label>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <button type="submit" className="pill pill-glass pill-lg group w-full sm:w-auto">
                  <span className="pill-light" aria-hidden />
                  <span className="pill-label">
                    <span className="pill-roll" data-text="Send message">
                      Send message
                    </span>
                  </span>
                  <span className="pill-orb" aria-hidden>
                    <svg className="h-[15px] w-[15px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <PillButton href={WHATSAPP} label="WhatsApp" tone="outline-dark" size="md" external magnetic={false} />
                <PillButton href={TEL} label="Call" tone="outline-dark" size="md" magnetic={false} />
              </div>
              <p className="pt-1 text-center font-mono text-[12px] leading-relaxed text-dark-muted sm:text-left">
                Email{" "}
                <a href={mailtoHref()} className="link-draw text-dark-text">
                  {CONTACT_EMAIL}
                </a>
                <span className="mx-2 text-white/20" aria-hidden>
                  ·
                </span>
                <a href={TEL} className="link-draw text-dark-text">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </p>
            </form>
          </Reveal>
        </div>
        <div className="grain" aria-hidden />
      </div>
    </section>
  );
}
