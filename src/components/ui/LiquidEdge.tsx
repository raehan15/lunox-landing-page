"use client";

import { MutableRefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDGE_H, EDGE_W, edgePath } from "@/lib/liquid";
import { clamp, motionStore, smoothstep } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type LiquidEdgeProps = {
  color: string;
  /** External 0..1 progress (e.g. hero curtain). Otherwise tracks its section entering. */
  progressRef?: MutableRefObject<number>;
  className?: string;
  seed?: number;
};

/**
 * Organic leading edge for a surface that rises over the previous scene.
 * Sits directly above its parent section and shares its fill colour.
 */
export function LiquidEdge({
  color,
  progressRef,
  className = "h-[80px] md:h-[150px]",
  seed = 0,
}: LiquidEdgeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const path = pathRef.current;
    if (!host || !path) return;

    const own = { p: 0 };
    let st: ScrollTrigger | undefined;
    if (!progressRef && host.parentElement) {
      st = ScrollTrigger.create({
        trigger: host.parentElement,
        start: "top bottom",
        end: "top 25%",
        onUpdate: (self) => {
          own.p = self.progress;
        },
      });
    }

    let smoothed = 0;
    let last = "";
    const tick = () => {
      const target = progressRef ? progressRef.current : own.p;
      smoothed += (target - smoothed) * 0.14;
      if (motionStore.reduced) smoothed = target;
      const rise = smoothstep(0, 0.22, smoothed);
      const settle = 1 - smoothstep(0.4, 1, smoothed);
      const wobble = clamp(Math.abs(motionStore.velocity) * 0.004, 0, 0.18);
      const bulge = motionStore.reduced ? 0 : clamp(rise * settle + wobble * rise, 0, 1);
      const d = edgePath(bulge, seed + smoothed * 2.4);
      if (d !== last) {
        last = d;
        path.setAttribute("d", d);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st?.kill();
    };
  }, [progressRef, seed]);

  return (
    <div
      ref={hostRef}
      className={`pointer-events-none absolute inset-x-0 z-[1] ${className}`}
      style={{ bottom: "calc(100% - 1px)" }}
      aria-hidden
    >
      <svg
        className="block h-full w-full"
        viewBox={`0 0 ${EDGE_W} ${EDGE_H}`}
        preserveAspectRatio="none"
      >
        <path ref={pathRef} fill={color} d={edgePath(0, seed)} />
      </svg>
    </div>
  );
}
