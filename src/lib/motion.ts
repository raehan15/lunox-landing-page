import type Lenis from "lenis";

/**
 * Mutable, non-reactive motion state shared between the scroll engine,
 * GSAP timelines and the R3F render loop. Never put this in React state:
 * it is written every frame.
 */
export const motionStore = {
  heroProgress: 0,
  ctaProgress: 0,
  pointerX: 0,
  pointerY: 0,
  velocity: 0,
  // Resolved at module load so child effects (which run before providers') see it.
  reduced:
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

/** True when the primary input is a mouse/trackpad (hover effects make sense). */
export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export function scrollToTarget(target: HTMLElement | number, offset = -64) {
  const lenis = getLenis();
  if (lenis && !motionStore.reduced) {
    lenis.scrollTo(target, { offset, duration: 1.3 });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: motionStore.reduced ? "auto" : "smooth" });
}
