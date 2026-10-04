"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { GlassSphere, DisposeOnUnmount, SphereQuality, SphereSource } from "./FloatingElements";
import { motionStore } from "@/lib/motion";

type Hero3DProps = {
  source?: SphereSource;
  visible: boolean;
  quality?: SphereQuality;
  reducedMotion?: boolean;
};

/** Stops rendering entirely when off screen, covered by the next section, or the tab is hidden. */
function FrameGate({ source, visible, reduced }: { source: SphereSource; visible: boolean; reduced: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop);
  useEffect(() => {
    const apply = () => {
      const covered = source === "hero" && motionStore.heroProgress > 0.97;
      const run = visible && !covered && !document.hidden;
      setFrameloop(run ? (reduced ? "demand" : "always") : "never");
    };
    apply();
    const id = window.setInterval(apply, 250);
    document.addEventListener("visibilitychange", apply);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", apply);
    };
  }, [source, visible, reduced, setFrameloop]);
  return null;
}

export function Hero3D({ source = "hero", visible, quality, reducedMotion = false }: Hero3DProps) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  const q: SphereQuality = quality ?? (small ? "low" : "high");

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        gl={{ antialias: q === "high", powerPreference: "high-performance", alpha: true, stencil: false }}
        dpr={q === "low" ? [1, 1.25] : [1, 1.5]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6.4]} fov={45} />
          <GlassSphere source={source} quality={q} />
          <FrameGate source={source} visible={visible} reduced={reducedMotion} />
          <DisposeOnUnmount />
        </Suspense>
      </Canvas>
    </div>
  );
}
