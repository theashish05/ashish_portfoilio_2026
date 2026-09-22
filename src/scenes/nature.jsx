import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- helpers ---------- */

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Window-level pointer, normalised to -1..1 (canvases are pointer-events:none). */
export function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/** 0..1 progress through the whole page. */
export function pageScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
}

/* ---------- fireflies / pollen ---------- */

const FIREFLY_VERT = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform float uSize;
  uniform float uPx;
  varying float vA;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.40 + aPhase * 6.2831) * 0.35;
    p.y += sin(uTime * 0.55 + aPhase * 9.0) * 0.28;
    p.z += cos(uTime * 0.35 + aPhase * 4.0) * 0.35;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vA = 0.5 + 0.5 * sin(uTime * 1.8 + aPhase * 30.0);
    gl_PointSize = uSize * uPx * (0.55 + vA * 0.9) * (6.0 / max(-mv.z, 0.5));
    gl_Position = projectionMatrix * mv;
  }
`;
const FIREFLY_FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * (0.25 + vA * 0.75);
    gl_FragColor = vec4(uColor, a);
  }
`;

export function Fireflies({
  count = 60,
  spreadX = 6,
  spreadY = 4,
  spreadZ = 6,
  size = 9,
  color = "#e6f26a",
  seed = 11,
}) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uPx: { value: 1 },
      uColor: { value: new THREE.Color(color) },
    }),
    [size, color]
  );

  const { positions, phases } = useMemo(() => {
    const rnd = mulberry32(seed + count);
    const p = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (rnd() - 0.5) * spreadX;
      p[i * 3 + 1] = (rnd() - 0.5) * spreadY;
      p[i * 3 + 2] = (rnd() - 0.5) * spreadZ;
      ph[i] = rnd();
    }
    return { positions: p, phases: ph };
  }, [count, spreadX, spreadY, spreadZ, seed]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uPx.value = state.gl.getPixelRatio();
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={FIREFLY_VERT}
        fragmentShader={FIREFLY_FRAG}
      />
    </points>
  );
}

/* ---------- falling leaves ---------- */

function makeLeafGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.09, 0.05, 0.1, 0.2, 0, 0.34);
  s.bezierCurveTo(-0.1, 0.2, -0.09, 0.05, 0, 0);
  const g = new THREE.ShapeGeometry(s, 8);
  g.translate(0, -0.17, 0);
  return g;
}

const LEAF_COLORS = ["#4ade80", "#22c55e", "#86efac", "#a3e635", "#65a30d", "#2dd4bf", "#d9f99d"];

export function Leaves({
  count = 24,
  boxX = 10,
  boxY = 8,
  boxZ = 8,
  lit = true,
  scale = 1,
  opacity = 1,
  seed = 5,
}) {
  const ref = useRef(null);
  const geo = useMemo(makeLeafGeometry, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const rnd = mulberry32(seed + count);
    return Array.from({ length: count }, () => ({
      x: (rnd() - 0.5) * boxX,
      y: (rnd() - 0.5) * boxY,
      z: (rnd() - 0.5) * boxZ,
      speed: 0.14 + rnd() * 0.28,
      sway: 0.35 + rnd() * 0.8,
      phase: rnd() * Math.PI * 2,
      rx: rnd() * 6,
      ry: rnd() * 6,
      rz: rnd() * 6,
      sx: 0.3 + rnd() * 1.1,
      sy: 0.3 + rnd() * 1.1,
      sz: 0.2 + rnd() * 0.8,
      s: (0.55 + rnd() * 0.8) * scale,
      color: LEAF_COLORS[Math.floor(rnd() * LEAF_COLORS.length)],
    }));
  }, [count, boxX, boxY, boxZ, scale, seed]);

  useLayoutEffect(() => {
    const c = new THREE.Color();
    data.forEach((d, i) => ref.current.setColorAt(i, c.set(d.color)));
    ref.current.instanceColor.needsUpdate = true;
  }, [data]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const mesh = ref.current;
    if (!mesh) return;
    data.forEach((d, i) => {
      d.y -= d.speed * dt;
      if (d.y < -boxY / 2) d.y = boxY / 2;
      d.rx += d.sx * dt;
      d.ry += d.sy * dt;
      d.rz += d.sz * dt;
      dummy.position.set(
        d.x + Math.sin(t * d.sway + d.phase) * 0.6,
        d.y,
        d.z + Math.cos(t * d.sway * 0.7 + d.phase) * 0.35
      );
      dummy.rotation.set(d.rx, d.ry, d.rz);
      dummy.scale.setScalar(d.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]} frustumCulled={false}>
      {lit ? (
        <meshStandardMaterial side={THREE.DoubleSide} roughness={0.7} />
      ) : (
        <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={opacity} />
      )}
    </instancedMesh>
  );
}

/* ---------- wind-swept grass ---------- */

const GRASS_VERT = /* glsl */ `
  uniform float uTime;
  varying float vH;
  varying float vR;
  void main() {
    vH = uv.y;
    vec3 p = position;
    p.x *= (1.0 - vH * 0.85);
    vec4 wp = instanceMatrix * vec4(p, 1.0);
    vR = fract(sin(dot(instanceMatrix[3].xz, vec2(12.9898, 78.233))) * 43758.5453);
    float w = sin(uTime * 1.7 + wp.x * 2.3 + wp.z * 1.9) * 0.10
            + sin(uTime * 0.9 + wp.x * 1.1) * 0.05;
    wp.x += w * vH * vH;
    wp.z += w * 0.6 * vH * vH;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * wp;
  }
`;
const GRASS_FRAG = /* glsl */ `
  varying float vH;
  varying float vR;
  void main() {
    vec3 base = mix(vec3(0.02, 0.20, 0.07), vec3(0.04, 0.28, 0.09), vR);
    vec3 tip  = mix(vec3(0.30, 0.72, 0.22), vec3(0.62, 0.86, 0.24), vR);
    gl_FragColor = vec4(mix(base, tip, vH), 1.0);
    #include <colorspace_fragment>
  }
`;

export function Grass({ count = 700, radius = 2.0, y = 0.175, pond }) {
  const ref = useRef(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.07, 0.5, 1, 4);
    g.translate(0, 0.25, 0);
    return g;
  }, []);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 } },
        vertexShader: GRASS_VERT,
        fragmentShader: GRASS_FRAG,
      }),
    []
  );

  useLayoutEffect(() => {
    const rnd = mulberry32(99);
    const d = new THREE.Object3D();
    let placed = 0;
    let guard = 0;
    while (placed < count && guard++ < count * 8) {
      const r = Math.sqrt(rnd()) * radius;
      const a = rnd() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (pond && Math.hypot(x - pond.x, z - pond.z) < pond.r + 0.05) continue;
      d.position.set(x, y, z);
      d.rotation.set(0, rnd() * Math.PI, (rnd() - 0.5) * 0.25);
      d.scale.set(1, 0.55 + rnd() * 1.0, 1);
      d.updateMatrix();
      ref.current.setMatrixAt(placed++, d.matrix);
    }
    ref.current.count = placed;
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count, radius, y, pond]);

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <instancedMesh ref={ref} args={[geo, mat, count]} frustumCulled={false} />;
}
