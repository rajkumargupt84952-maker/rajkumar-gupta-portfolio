import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type * as THREE from "three";

interface Props {
  count: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
  /** Squash the cloud on Y to make a wide field instead of a ball */
  flat?: number;
}

/** A slowly rotating cloud of glowing points. */
export default function Particles({ count, radius = 9, color = "#7aa8ff", size = 0.035, speed = 0.02, flat = 1 }: Props) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform point in a sphere shell
      const r = radius * (0.35 + Math.cbrt(Math.random()) * 0.65);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * flat;
      a[i * 3 + 2] = r * Math.cos(ph);
    }
    return a;
  }, [count, radius, flat]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.x += dt * speed * 0.4;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
}
