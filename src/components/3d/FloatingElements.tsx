"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { BoxGeometry, EdgesGeometry, Group, Mesh, ShaderMaterial, Vector3 } from "three";
import { motionStore } from "@/lib/motion";

export type SphereSource = "hero" | "cta";
export type SphereQuality = "high" | "low";

/**
 * Chrome is all about what it reflects. Instead of downloading an HDR map we
 * evaluate a small studio environment in the shader: a dark room with a blue
 * light on the left, a cool edge light on the right and two softboxes. As the
 * cube tumbles, those reflections sweep across the bevels.
 */
const VERT = /* glsl */ `
varying vec3 vWN;
varying vec3 vWP;
void main(){
  vec4 wp=modelMatrix*vec4(position,1.0);
  vWP=wp.xyz;
  vWN=normalize(mat3(modelMatrix)*normal);
  gl_Position=projectionMatrix*viewMatrix*wp;
}
`;

const FRAG = /* glsl */ `
uniform vec3 uLight;
varying vec3 vWN;
varying vec3 vWP;

const vec3 ACCENT=vec3(0.19,0.36,1.0); // #315BFF
const vec3 ICE=vec3(0.66,0.8,1.0);

vec3 studio(vec3 R){
  float up=R.y*0.5+0.5;
  // Dark room, slightly lifted overhead so flat faces never go black.
  vec3 c=mix(vec3(0.012,0.02,0.05),vec3(0.14,0.2,0.46),smoothstep(0.25,1.0,up));
  // Left: electric blue ambient light.
  c+=ACCENT*smoothstep(0.2,-0.9,R.x)*1.05;
  // Right: narrow cool strip light.
  c+=ICE*smoothstep(0.18,0.03,abs(R.x-0.72))*smoothstep(0.95,0.5,abs(R.y))*1.5;
  // Overhead softbox.
  c+=vec3(1.0)*smoothstep(0.34,0.2,abs(R.x+0.1+uLight.x*0.2))*smoothstep(0.16,0.05,abs(R.y-0.82))*1.6;
  // Front-left window.
  c+=vec3(0.95,0.97,1.0)*smoothstep(0.16,0.07,abs(R.x+0.55))*smoothstep(0.42,0.3,abs(R.y-0.1))*smoothstep(-0.2,0.3,R.z)*1.1;
  // Floor stays dark for contrast.
  c*=mix(0.45,1.0,smoothstep(-0.7,0.15,R.y));
  return c;
}

void main(){
  vec3 N=normalize(vWN);
  vec3 V=normalize(cameraPosition-vWP);
  vec3 R=reflect(-V,N);
  float ndv=max(dot(N,V),0.0);
  float fres=pow(1.0-ndv,3.5);

  vec3 col=studio(R)*0.95;
  // Brushed-metal body tone and a lift on grazing angles.
  col=mix(col,col*vec3(0.78,0.86,1.12),0.5);
  col+=ICE*fres*0.55;
  gl_FragColor=vec4(col,1.0);
}
`;

type Props = { source?: SphereSource; quality?: SphereQuality };

function EdgeFrame({ size, opacity }: { size: number; opacity: number }) {
  const ref = useRef<Group>(null);
  const geo = useMemo(() => new EdgesGeometry(new BoxGeometry(size, size, size)), [size]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g || motionStore.reduced) return;
    const d = Math.min(delta, 0.05);
    g.rotation.y -= d * 0.18;
    g.rotation.x -= d * 0.08;
  });
  return (
    <group ref={ref} rotation={[0.5, 0.6, 0]}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#8fa8ff" transparent opacity={opacity} />
      </lineSegments>
    </group>
  );
}

export function GlassSphere({ source = "hero", quality = "high" }: Props) {
  const groupRef = useRef<Group>(null);
  const cubeRef = useRef<Mesh>(null);
  const time = useRef(0);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uLight: { value: new Vector3(0, 0, 1) } },
      }),
    []
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, rawDelta) => {
    const group = groupRef.current;
    const cube = cubeRef.current;
    if (!group || !cube) return;
    const delta = Math.min(rawDelta, 0.05);
    const reduced = motionStore.reduced;
    const progress = source === "hero" ? motionStore.heroProgress : motionStore.ctaProgress;

    if (!reduced) {
      time.current += delta;
      // A slow tumble that never repeats the same pose twice in a row.
      cube.rotation.y += delta * (0.32 + Math.abs(motionStore.velocity) * 0.004);
      cube.rotation.x = 0.55 + Math.sin(time.current * 0.45) * 0.28;
      cube.rotation.z = Math.sin(time.current * 0.3) * 0.18;
    } else {
      cube.rotation.set(0.5, 0.7, 0.1);
    }

    const px = reduced ? 0 : motionStore.pointerX;
    const py = reduced ? 0 : motionStore.pointerY;
    (material.uniforms.uLight.value as Vector3).set(px, -py, 1);

    group.rotation.x += (py * 0.12 - group.rotation.x) * 0.05;
    group.rotation.y += (px * 0.16 - group.rotation.y) * 0.05;

    let tx = reduced ? 0 : px * 0.16;
    let ty = (reduced ? 0 : -py * 0.1) + (reduced ? 0 : Math.sin(time.current * 0.9) * 0.08);
    let tz = 0;
    let ts = 1;
    if (source === "hero") {
      tz = -progress * 2.2;
      ty += progress * 0.5;
      ts = 1 - progress * 0.12;
    } else {
      tz = -(1 - progress) * 1.6;
      ts = 0.9 + progress * 0.1;
    }
    group.position.x += (tx - group.position.x) * 0.06;
    group.position.y += (ty - group.position.y) * 0.06;
    group.position.z += (tz - group.position.z) * 0.08;
    group.scale.setScalar(group.scale.x + (ts - group.scale.x) * 0.08);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox
        ref={cubeRef}
        args={[1.75, 1.75, 1.75]}
        radius={0.24}
        smoothness={quality === "low" ? 3 : 6}
        material={material}
      />
      {quality === "high" && <EdgeFrame size={2.6} opacity={0.28} />}
    </group>
  );
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
