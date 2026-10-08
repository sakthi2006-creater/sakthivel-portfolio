"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Float, OrbitControls } from "@react-three/drei";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

function ParticleUniverse() {
  const pointsRef = useRef<THREE.BufferGeometry | null>(null);
  const matRef = useRef<THREE.PointsMaterial | null>(null);

  const positions = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.35) * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.opacity = 0.65 + Math.sin(t * 0.6) * 0.15;
      matRef.current.size = 0.03 + (Math.sin(t * 0.8) * 0.005 + 0.01);
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial ref={matRef} transparent depthWrite={false} color="#27F7FF" size={0.025} opacity={0.65} />
      </points>
    </group>
  );
}

function OrbitalRings() {
  const group = useRef<THREE.Group | null>(null);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    group.current.rotation.x = 0.2 + Math.sin(t * 0.35) * 0.08 + mouse.y * 0.12;
    group.current.rotation.y = t * 0.16 + mouse.x * 0.15;
    group.current.rotation.z = Math.cos(t * 0.22) * 0.06;
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
          <ringGeometry args={[5.6 + i * 1.1, 5.9 + i * 1.1, 256]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#2B7CFF" : "#27F7FF"}
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* energy halo */}
      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function AICoreScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2.2, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      shadows={false}
    >
      <AdaptiveDpr />
      <color attach="background" args={["#050611"]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 2]} intensity={0.6} />
      <Environment preset="night" />

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />

      <Float floatIntensity={0.45} rotationIntensity={0.35} speed={0.9}>
        <OrbitalRings />
      </Float>

      <ParticleUniverse />

      {/* Soft vignette */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[30, 18]} />
        <meshBasicMaterial color="#000" transparent opacity={0.12} />
      </mesh>
    </Canvas>
  );
}

