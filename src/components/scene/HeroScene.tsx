import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import Particles from "./Particles";

const TECH = ["React", "Node.js", "MongoDB", "Next.js", "TypeScript", "Redis", "Docker", "AWS"];

function Orbit({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.18;
  });
  return (
    <group ref={group}>
      {TECH.slice(0, count).map((label, i) => {
        const a = (i / count) * Math.PI * 2;
        const r = 2.6 + (i % 2) * 0.45;
        return (
          <Float key={label} speed={1.6} rotationIntensity={0} floatIntensity={1.4}>
            <Html position={[Math.cos(a) * r, Math.sin(i * 1.7) * 0.9, Math.sin(a) * r]} center distanceFactor={12} zIndexRange={[5, 0]}>
              <span className="glass glow-border pointer-events-none select-none whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-[13px] text-white shadow-glow">
                {label}
              </span>
            </Html>
          </Float>
        );
      })}
    </group>
  );
}

function Core({ detail }: { detail: number }) {
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.15;
      shell.current.rotation.x += dt * 0.08;
    }
    if (ringA.current) ringA.current.rotation.z += dt * 0.35;
    if (ringB.current) ringB.current.rotation.x -= dt * 0.28;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.35, detail]} />
        <MeshDistortMaterial color="#2F7BFF" emissive="#1b2f9c" emissiveIntensity={0.7} roughness={0.15} metalness={0.8} distort={0.38} speed={2} />
      </mesh>
      <mesh ref={shell} scale={1.28}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 8, 120]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[2.5, 0.01, 8, 120]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

/** Moves the camera and scene with the pointer for a parallax feel. */
function Rig({ children, strength }: { children: React.ReactNode; strength: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * strength, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * strength * 0.6, 0.04);
    state.camera.lookAt(0, 0, 0);
    if (g.current) {
      g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, x * 0.35, 0.05);
      g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -y * 0.2, 0.05);
    }
  });
  return <group ref={g}>{children}</group>;
}

interface Props {
  active: boolean;
  mobile: boolean;
  reduce: boolean;
}

export default function HeroScene({ active, mobile, reduce }: Props) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduce ? "demand" : active ? "always" : "never"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 4]} intensity={60} color="#22D3EE" />
      <pointLight position={[-5, -3, 3]} intensity={55} color="#8B5CF6" />
      <pointLight position={[0, 0, 6]} intensity={25} color="#2F7BFF" />
      <group position={[mobile ? 0 : 1.9, 0, 0]} scale={mobile ? 0.8 : 0.9}>
        <Rig strength={mobile ? 0 : 1.2}>
          <Core detail={mobile ? 2 : 4} />
          <Orbit count={mobile ? 5 : 8} />
        </Rig>
      </group>
      <Particles count={mobile ? 450 : 1500} radius={10} />
      <Particles count={mobile ? 120 : 400} radius={6} color="#22D3EE" size={0.05} speed={-0.035} />
    </Canvas>
  );
}
