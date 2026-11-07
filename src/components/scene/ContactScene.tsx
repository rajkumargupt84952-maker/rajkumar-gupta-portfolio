import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import Particles from "./Particles";

function Shapes() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, state.pointer.x * 0.5, 0.04);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -state.pointer.y * 0.3, 0.04);
  });
  return (
    <group ref={g}>
      <Float speed={1.5} floatIntensity={1.6}>
        <mesh position={[-6.2, 1.6, -2]}>
          <octahedronGeometry args={[0.9]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={1.2}>
        <mesh position={[7, -2.2, -4]}>
          <torusKnotGeometry args={[0.7, 0.18, 96, 12]} />
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.28} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.4}>
        <mesh position={[5.2, 3, -4]}>
          <icosahedronGeometry args={[0.6]} />
          <meshBasicMaterial color="#2F7BFF" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ContactScene({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: false, alpha: true }}
      frameloop={reduce ? "demand" : active ? "always" : "never"}
      aria-hidden="true"
    >
      <Shapes />
      <Particles count={900} radius={11} flat={0.6} color="#8fb4ff" speed={0.015} />
    </Canvas>
  );
}
