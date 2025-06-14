"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { FloatingLogo, CodeParticles } from "./FloatingElements";

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="city" />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <FloatingLogo />
      <CodeParticles />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
