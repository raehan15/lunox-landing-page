"use client";

import { ElementType, ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type MaskLinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** "scroll" waits for the viewport, "mount" plays immediately. */
  trigger?: "scroll" | "mount";
};

/** Lines rise out of their own masks — the heading appears to be cut from the page. */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  trigger = "scroll",
}: MaskLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionStore.reduced) return;
    const inner = el.querySelectorAll("[data-line]");
    const ctx = gsap.context(() => {
      gsap.from(inner, {
        yPercent: 112,
        rotate: 2,
        duration: 1.05,
        ease: "expo.out",
        stagger: 0.09,
        delay,
        clearProps: "transform",
        scrollTrigger:
          trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
      });
    }, el);
    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span data-line className={`block origin-left ${lineClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

type RevealKind = "rise" | "blur" | "clip" | "drift" | "depth";

const FROM: Record<RevealKind, gsap.TweenVars> = {
  rise: { y: 36, opacity: 0 },
  blur: { filter: "blur(16px)", opacity: 0, scale: 1.04 },
  clip: { clipPath: "inset(0% 0% 100% 0%)" },
  drift: { x: -56, opacity: 0 },
  depth: { scale: 0.9, opacity: 0, rotateX: 10, transformPerspective: 900 },
};

type RevealProps = {
  children: ReactNode;
  kind?: RevealKind;
  className?: string;
  delay?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  start?: string;
};

export function Reveal({
  children,
  kind = "rise",
  className = "",
  delay = 0,
  stagger,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionStore.reduced) return;
    const targets = stagger !== undefined ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...FROM[kind],
        duration: kind === "clip" ? 1.2 : 0.95,
        ease: "expo.out",
        delay,
        stagger: stagger ?? 0,
        clearProps: "filter,clipPath,transform,opacity",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, kind, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
