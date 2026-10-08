"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../layout/ThemeProvider";

const PARTICLE_COUNT = 80;
const MAX_DISTANCE = 2.5;

function NetworkNodes({ theme }: { theme: "dark" | "light" }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  const particleVelocities = useMemo(() => {
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });
    }
    return velocities;
  }, []);

  const [positions] = useState(() => particlesPosition.slice());

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positionsArray[i * 3] += particleVelocities[i].x;
      positionsArray[i * 3 + 1] += particleVelocities[i].y;
      positionsArray[i * 3 + 2] += particleVelocities[i].z;

      // Bounce back
      if (Math.abs(positionsArray[i * 3]) > 7.5) particleVelocities[i].x *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 7.5) particleVelocities[i].y *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 7.5) particleVelocities[i].z *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect lines if close
    const linePositions = [];
    let vertexCount = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
          linePositions.push(
            positionsArray[i * 3],
            positionsArray[i * 3 + 1],
            positionsArray[i * 3 + 2],
            positionsArray[j * 3],
            positionsArray[j * 3 + 1],
            positionsArray[j * 3 + 2]
          );
          vertexCount += 2;
        }
      }
    }

    linesRef.current.geometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const nodeColor = theme === "dark" ? "#22d3ee" : "#2563eb";
  const lineColor = theme === "dark" ? "#3b82f6" : "#4f46e5";

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={nodeColor} transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color={lineColor} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export function AINetworkBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-1000">
      {!isMobile ? (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <NetworkNodes theme={theme} />
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      )}
    </div>
  );
}
