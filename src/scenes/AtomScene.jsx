import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Fireflies, usePointerRef } from "./nature";

const RX = 1.55;
const RY = 0.58;

function Ring({ angle, color, speed, phase }) {
  const electron = useRef(null);
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * RX, Math.sin(t) * RY, 0));
    }
    return pts;
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    if (electron.current) electron.current.position.set(Math.cos(t) * RX, Math.sin(t) * RY, 0);
  });
  return (
    <group rotation={[0, 0, angle]}>
      <Line points={points} color={color} lineWidth={1.6} transparent opacity={0.75} />
      <mesh ref={electron}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Atom() {
  const group = useRef(null);
  const pointer = usePointerRef();
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.4, 0.05);
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.24, 2]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.13} />
      </mesh>
      <Ring angle={0} color="#4ade80" speed={1.1} phase={0} />
      <Ring angle={Math.PI / 3} color="#2dd4bf" speed={1.3} phase={2} />
      <Ring angle={(2 * Math.PI) / 3} color="#e6f26a" speed={0.9} phase={4} />
    </group>
  );
}

export default function AtomScene() {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: "none" }}>
      <Suspense fallback={null}>
        <Atom />
        <Fireflies count={26} spreadX={5} spreadY={4} spreadZ={3} size={9} />
      </Suspense>
    </Canvas>
  );
}
