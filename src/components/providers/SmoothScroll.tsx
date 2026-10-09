"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp, motionStore } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    motionStore.reduced = reduced;
    const root = document.documentElement;

    let pointerRaf = 0;
    let lastPointer: PointerEvent | null = null;
    const flushPointer = () => {
      pointerRaf = 0;
      const e = lastPointer;
      if (!e) return;
      motionStore.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      motionStore.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-glow]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -240 || r.top > vh + 240) return;
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    const onPointer = (e: PointerEvent) => {
      lastPointer = e;
      if (!pointerRaf) pointerRaf = requestAnimationFrame(flushPointer);
    };
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      return () => {
        window.removeEventListener("pointermove", onPointer);
        cancelAnimationFrame(pointerRaf);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let vel = 0;
    let written = 0;
    // Scope the velocity variables to the one section that uses them, so a
    // change doesn't invalidate styles for the whole document.
    let velEl: HTMLElement | null = null;
    const tick = (time: number) => {
      lenis.raf(time * 1000);
      const target = clamp(lenis.velocity, -70, 70);
      vel += (target - vel) * 0.09;
      if (Math.abs(vel) < 0.02) vel = 0;
      motionStore.velocity = vel;
      if (Math.abs(vel - written) > 0.05 || (vel === 0 && written !== 0)) {
        written = vel;
        velEl = velEl && velEl.isConnected ? velEl : document.getElementById("stack");
        velEl?.style.setProperty("--vlag", (vel * -0.42).toFixed(2));
      }
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!href || window.location.pathname !== "/") return;
      const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -64, duration: 1.4 });
    };
    document.addEventListener("click", onAnchor);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    // Any change in page height (Show more, filters, rotation, late images)
    // moves every pin/scrub start point below it. Re-measure once it settles
    // so sections like "How we build" never fire early or mid-page.
    let settle = 0;
    let lastH = 0;
    const remeasure = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 160);
    };
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastH) > 2) {
        lastH = h;
        remeasure();
      }
    });
    ro.observe(document.body);
    window.addEventListener("orientationchange", remeasure);
    window.addEventListener("resize", remeasure);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", remeasure);
      window.removeEventListener("resize", remeasure);
      window.clearTimeout(settle);
      ro.disconnect();
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(pointerRaf);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.getElementById("stack")?.style.removeProperty("--vlag");
    };
  }, []);

  return <>{children}</>;
}
