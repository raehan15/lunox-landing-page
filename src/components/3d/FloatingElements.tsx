"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, MeshTransmissionMaterial } from "@react-three/drei";
import { Mesh } from "three";

export function FloatingLogo() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.1}
          thickness={3.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#8b5cf6"
        />
      </mesh>
    </Float>
  );
}

export function CodeParticles() {
  const particlesRef = useRef<Mesh[]>([]);

  useFrame((state) => {
    particlesRef.current.forEach((particle: Mesh, i: number) => {
      if (particle) {
        particle.position.y = Math.sin(state.clock.elapsedTime + i) * 2;
        particle.rotation.z = state.clock.elapsedTime * 0.5;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 20 }, (_, i) => (
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
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
