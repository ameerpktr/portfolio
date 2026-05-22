"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Mesh, Points } from "three";

function Orb() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.14;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.45, 3]} />
        <meshPhysicalMaterial color="#60a5fa" roughness={0.18} metalness={0.28} transmission={0.45} thickness={0.65} transparent opacity={0.72} />
      </mesh>
      <mesh scale={1.95}>
        <torusGeometry args={[1, 0.006, 12, 140]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.72} />
      </mesh>
      <mesh scale={2.25} rotation={[1.1, 0.4, 0.1]}>
        <torusGeometry args={[1, 0.004, 12, 140]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

function StarField() {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(900);
    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 28;
      positions[index + 1] = (Math.random() - 0.5) * 18;
      positions[index + 2] = (Math.random() - 0.5) * 18;
    }
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#93c5fd" size={0.018} transparent opacity={0.65} blending={AdditiveBlending} />
    </points>
  );
}

export function FintechOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.6 }} className="h-full w-full">
      <Suspense fallback={null}>
        <ambientLight intensity={0.9} />
        <pointLight position={[3, 3, 3]} intensity={24} color="#38bdf8" />
        <pointLight position={[-4, -2, 2]} intensity={14} color="#a855f7" />
        <StarField />
        <Orb />
      </Suspense>
    </Canvas>
  );
}
