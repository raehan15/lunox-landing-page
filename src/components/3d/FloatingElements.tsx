"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Mesh, Group, PointLight } from "three";
import { motionStore } from "@/lib/motion";

export type SphereSource = "hero" | "cta";
export type SphereQuality = "high" | "low";

type SphereProps = {
  source?: SphereSource;
  quality?: SphereQuality;
};

export function GlassSphere({ source = "hero", quality = "high" }: SphereProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const time = useRef(0);

  const materialProps = useMemo(() => {
    if (quality === "low") {
      return {
        backside: true,
        samples: 4,
        resolution: 256,
        transmission: 0.94,
        roughness: 0.16,
        thickness: 1.8,
        ior: 1.4,
        chromaticAberration: 0.014,
        color: "#e8ecf8",
        attenuationColor: "#c5d0f0",
        attenuationDistance: 0.8,
      };
    }
    return {
      backside: true,
      samples: 10,
      resolution: 384,
      transmission: 1,
      roughness: 0.1,
      thickness: 2.8,
      ior: 1.45,
      chromaticAberration: 0.03,
      anisotropy: 0.1,
      clearcoat: 1,
      attenuationDistance: 0.7,
      attenuationColor: "#d4dcf5",
      color: "#eef1f8",
    };
  }, [quality]);

  useFrame((_, rawDelta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;
    const delta = Math.min(rawDelta, 0.05);
    const reduced = motionStore.reduced;
    const progress = source === "hero" ? motionStore.heroProgress : motionStore.ctaProgress;

    if (!reduced) {
      time.current += delta;
      mesh.rotation.y += delta * (0.12 + Math.abs(motionStore.velocity) * 0.004);
      mesh.rotation.x = Math.sin(time.current * 0.3) * 0.08;
    }

    const px = reduced ? 0 : motionStore.pointerX;
    const py = reduced ? 0 : motionStore.pointerY;
    // ≤ ~6° tilt toward the pointer, a little parallax drift.
    group.rotation.x += (py * 0.1 - group.rotation.x) * 0.06;
    group.rotation.y += (px * 0.1 - group.rotation.y) * 0.06;

    const float = reduced ? 0 : Math.sin(time.current * 0.8) * 0.05;
    let tx = px * 0.14;
    let ty = -py * 0.1 + float;
    let tz = 0;
    let ts = 1;
    if (source === "hero") {
      // Recede into depth as the curtain rises.
      tz = -progress * 2.2;
      ty += progress * 0.5;
      ts = 1 - progress * 0.12;
    } else {
      // Arrive from depth as the final scene settles.
      tz = -(1 - progress) * 1.6;
      ts = 0.9 + progress * 0.1;
    }
    tx = reduced ? 0 : tx;
    group.position.x += (tx - group.position.x) * 0.06;
    group.position.y += (ty - group.position.y) * 0.06;
    group.position.z += (tz - group.position.z) * 0.08;
    const s = group.scale.x + (ts - group.scale.x) * 0.08;
    group.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={quality === "low" ? 1.3 : 1.5}>
        <icosahedronGeometry args={[1, quality === "low" ? 0 : 1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

/** Accent light that follows the cursor so reflections slide across the glass. */
export function PointerLight() {
  const ref = useRef<PointLight>(null);
  useFrame(() => {
    const l = ref.current;
    if (!l) return;
    const tx = motionStore.reduced ? -3 : motionStore.pointerX * 4;
    const ty = motionStore.reduced ? 1.4 : -motionStore.pointerY * 3;
    l.position.x += (tx - l.position.x) * 0.08;
    l.position.y += (ty - l.position.y) * 0.08;
  });
  return <pointLight ref={ref} position={[-3, 1.4, 2.4]} intensity={1.3} color="#315BFF" />;
}

export function DisposeOnUnmount() {
  const { gl, scene } = useThree();
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        // @ts-expect-error geometry may exist
        if (obj.geometry) obj.geometry.dispose?.();
        // @ts-expect-error material may exist
        if (obj.material) {
          // @ts-expect-error material dispose
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          // @ts-expect-error material dispose
          else obj.material.dispose?.();
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);
  return null;
}
