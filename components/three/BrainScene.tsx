"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, lineGeo } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 160; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.4;
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }

    const lineVerts: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.6 && lineVerts.length < 2400) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    return { nodes: pts, lineGeo: geo };
  }, []);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.022, 5, 5), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} geometry={nodeGeo} position={pos}>
          <meshStandardMaterial
            color={i % 3 === 0 ? "#2B7CFF" : i % 3 === 1 ? "#8B5CFF" : "#27F7FF"}
            emissive={i % 3 === 0 ? "#2B7CFF" : i % 3 === 1 ? "#8B5CFF" : "#27F7FF"}
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>
      ))}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#2B7CFF" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function GlowRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (r1.current) { r1.current.rotation.z = t * 0.3; r1.current.rotation.x = t * 0.1; }
    if (r2.current) { r2.current.rotation.x = t * 0.2; r2.current.rotation.y = t * 0.15; }
    if (r3.current) { r3.current.rotation.y = t * 0.25; r3.current.rotation.z = -t * 0.12; }
  });

  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 100]} />
        <meshStandardMaterial color="#2B7CFF" emissive="#2B7CFF" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh ref={r2} rotation={[0, Math.PI / 6, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.009, 16, 100]} />
        <meshStandardMaterial color="#8B5CFF" emissive="#8B5CFF" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.007, 16, 100]} />
        <meshStandardMaterial color="#27F7FF" emissive="#27F7FF" emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </>
  );
}

export function BrainScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#2B7CFF" intensity={4} />
      <pointLight position={[-5, -5, 3]} color="#8B5CFF" intensity={3} />
      <pointLight position={[0, 0, -5]} color="#27F7FF" intensity={2} />
      <NeuralNetwork />
      <GlowRings />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#2B7CFF"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
