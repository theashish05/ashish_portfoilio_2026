import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 42;

function randomOnSphere(radius) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function Constellation({ pointer }) {
  const group = useRef(null);
  const coreRef = useRef(null);
  const linesRef = useRef(null);

  const nodes = useMemo(() => {
    return new Array(NODE_COUNT).fill(0).map(() => ({
      pos: randomOnSphere(2.1 + Math.random() * 0.9),
      speed: 0.15 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const nodePositions = useMemo(
    () => new Float32Array(nodes.flatMap((n) => [n.pos.x, n.pos.y, n.pos.z])),
    [nodes]
  );

  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < 1.55) {
          positions.push(
            nodes[i].pos.x,
            nodes[i].pos.y,
            nodes[i].pos.z,
            nodes[j].pos.x,
            nodes[j].pos.y,
            nodes[j].pos.z
          );
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.09;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.35,
        0.04
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        group.current.rotation.y + pointer.current.x * 0.15,
        0.02
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.15;
      coreRef.current.rotation.x += delta * 0.08;
      const t = state.clock.elapsedTime;
      const s = 1 + Math.sin(t * 1.3) * 0.04;
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.35} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#e6f26a" size={0.055} sizeAttenuation transparent opacity={0.9} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4ade80" transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
}

function PointerTracker({ pointer }) {
  const { size } = useThree();
  useEffect(() => {
    const handler = (e) => {
      pointer.current.x = (e.clientX / size.width) * 2 - 1;
      pointer.current.y = (e.clientY / size.height) * 2 - 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function HeroScene({ interactive = true }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Constellation pointer={pointer} />
        {interactive && <PointerTracker pointer={pointer} />}
      </Suspense>
    </Canvas>
  );
}
