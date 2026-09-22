import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Fireflies, Leaves, pageScrollProgress, usePointerRef } from "./nature";

function Rig({ pointer }) {
  useFrame((state) => {
    const p = pageScrollProgress();
    const cam = state.camera;
    // scrolling down dollies the camera through the forest (zoom in); up zooms back out
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 9 - p * 6.5, 0.05);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, pointer.current.x * 0.7, 0.03);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, pointer.current.y * 0.45 - p * 1.2, 0.03);
    cam.lookAt(0, -p * 1.2, 0);
  });
  return null;
}

function Scene({ mobile }) {
  const pointer = usePointerRef();
  return (
    <>
      <Fireflies count={mobile ? 40 : 90} spreadX={18} spreadY={11} spreadZ={16} size={8} seed={3} />
      <Fireflies count={mobile ? 12 : 26} spreadX={14} spreadY={9} spreadZ={12} size={15} color="#5eead4" seed={17} />
      <Leaves count={mobile ? 12 : 26} boxX={15} boxY={11} boxZ={12} lit={false} opacity={0.55} scale={1.1} seed={4} />
      <Rig pointer={pointer} />
    </>
  );
}

export default function NatureBackdrop({ mobile = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Scene mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
