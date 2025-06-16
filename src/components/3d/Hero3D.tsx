"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { FloatingLogo, CodeParticles } from "./FloatingElements";

// Detect if device is mobile
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={isMobile ? 0.2 : 0.5} // Slower rotation on mobile
      />

      {/* Simplified lighting for mobile */}
      {isMobile ? (
        <>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
        </>
      ) : (
        <>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
        </>
      )}

      <FloatingLogo />
      <CodeParticles />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
        performance={{ min: 0.5 }} // Allow lower framerates
        gl={{
          powerPreference: isMobile ? "low-power" : "high-performance",
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
