"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import {
  GlassSphere,
  DisposeOnUnmount,
  PointerLight,
  SphereQuality,
  SphereSource,
} from "./FloatingElements";

type Hero3DProps = {
  source?: SphereSource;
  visible: boolean;
  quality?: SphereQuality;
  reducedMotion?: boolean;
};

export function Hero3D({ source = "hero", visible, quality, reducedMotion = false }: Hero3DProps) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  const q: SphereQuality = quality ?? (small ? "low" : "high");

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        dpr={q === "low" ? [1, 1.25] : [1, 1.6]}
        frameloop={visible && !reducedMotion ? "always" : "demand"}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5.2]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 3, 5]} intensity={0.55} color="#ffffff" />
          <PointerLight />
          <pointLight position={[3, -2, -2]} intensity={0.3} color="#8aa0ff" />
          {q === "high" && <Environment preset="city" />}
          <GlassSphere source={source} quality={q} />
          <DisposeOnUnmount />
        </Suspense>
      </Canvas>
    </div>
  );
}
