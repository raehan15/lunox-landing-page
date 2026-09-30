"use client";

import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import gsap from "gsap";
import { blobPath } from "@/lib/liquid";
import { motionStore } from "@/lib/motion";

type LiquidBlobProps = {
  className?: string;
  style?: CSSProperties;
  seed?: number;
  amp?: number;
  points?: number;
  speed?: number;
  phaseRef?: MutableRefObject<number>;
  tone?: "dark" | "light" | "none";
  rim?: boolean;
  children?: ReactNode;
};

/**
 * A slowly morphing organic surface. Backdrop blur and clip-path live on the
 * same element so the blur samples what is actually behind the shape.
 */
export function LiquidBlob({
  className = "",
  style,
  seed = 0,
  amp = 0.08,
  points = 7,
  speed = 0.35,
  phaseRef,
  tone = "dark",
  rim = true,
  children,
}: LiquidBlobProps) {
  const id = `lb${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);
  const initial = blobPath(seed, { points, amp, seed });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let visible = true;
    let t = seed;
    let lastPhase = Number.NaN;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    io.observe(host);

    const tick = (_time: number, delta: number) => {
      if (!visible) return;
      const phase = phaseRef ? phaseRef.current : 0;
      if (motionStore.reduced && phase === lastPhase) return;
      if (!motionStore.reduced) t += (Math.min(delta, 50) / 1000) * speed;
      lastPhase = phase;
      const d = blobPath(t + phase, { points, amp, seed });
      clipRef.current?.setAttribute("d", d);
      rimRef.current?.setAttribute("d", d);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, [amp, phaseRef, points, seed, speed]);

  const surface =
    tone === "dark" ? "liquid-glass-dark" : tone === "light" ? "liquid-glass-light" : "";

  return (
    <div ref={hostRef} className={`pointer-events-none absolute ${className}`} style={style} aria-hidden>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path ref={clipRef} d={initial} />
          </clipPath>
        </defs>
      </svg>
      <div
        className={`absolute inset-0 ${surface}`}
        style={{ clipPath: `url(#${id})`, WebkitClipPath: `url(#${id})` }}
      >
        {children}
      </div>
      {rim && (
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          <path
            ref={rimRef}
            d={initial}
            fill="none"
            stroke={tone === "light" ? "rgba(17,19,24,0.10)" : "rgba(255,255,255,0.16)"}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
