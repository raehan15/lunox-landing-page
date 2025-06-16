"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Mesh } from "three";

// Detect if device is mobile
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function FloatingLogo() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  // Simplified material for mobile
  const materialProps = useMemo(() => {
    if (isMobile) {
      return {
        backside: true,
        samples: 4, // Reduced from 16
        resolution: 256, // Reduced from 512
        transmission: 0.8, // Slightly reduced
        roughness: 0.2,
        thickness: 2, // Reduced from 3.5
        ior: 1.3,
        chromaticAberration: 0.02, // Reduced from 0.06
        color: "#8b5cf6",
      };
    }
    return {
      backside: true,
      samples: 16,
      resolution: 512,
      transmission: 1,
      roughness: 0.1,
      thickness: 3.5,
      ior: 1.5,
      chromaticAberration: 0.06,
      anisotropy: 0.1,
      distortion: 0.1,
      distortionScale: 0.3,
      temporalDistortion: 0.5,
      clearcoat: 1,
      attenuationDistance: 0.5,
      attenuationColor: "#ffffff",
      color: "#8b5cf6",
    };
  }, []);

  return (
    <Float
      speed={isMobile ? 1 : 2} // Slower on mobile
      rotationIntensity={isMobile ? 0.5 : 1}
      floatIntensity={isMobile ? 1 : 2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, isMobile ? 0 : 1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </Float>
  );
}

export function CodeParticles() {
  const particlesRef = useRef<Mesh[]>([]);

  // Reduce particle count on mobile
  const particleCount = isMobile ? 8 : 20;

  useFrame((state) => {
    particlesRef.current.forEach((particle: Mesh, i: number) => {
      if (particle) {
        // Less frequent updates on mobile
        const updateFrequency = isMobile ? 0.3 : 1;
        particle.position.y =
          Math.sin(state.clock.elapsedTime * updateFrequency + i) * 2;
        particle.rotation.z = state.clock.elapsedTime * 0.3 * updateFrequency;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: particleCount }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
          }}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
          scale={0.1 + Math.random() * 0.2}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#0ea5e9" : "#8b5cf6"}
            emissive={Math.random() > 0.5 ? "#0ea5e9" : "#8b5cf6"}
            emissiveIntensity={isMobile ? 0.1 : 0.3} // Reduced emissive on mobile
          />
        </mesh>
      ))}
    </group>
  );
}
