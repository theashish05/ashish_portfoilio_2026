import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Pointer-driven 3D tilt with a moving glare. Children can use
 * `transform: translateZ(...)` to pop out of the card.
 * `surface` paints a glass background on an inner layer (backdrop-filter
 * would otherwise flatten the 3D transform on this element).
 */
export default function Tilt3D({
  children,
  className = "",
  max = 10,
  scale = 1.03,
  glare = true,
  surface = false,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.6 });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 24 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18), transparent 55%)`;

  const onMove = (e) => {
    onPointerMove?.(e);
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const onLeave = (e) => {
    onPointerLeave?.(e);
    mx.set(0.5);
    my.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} ${className}`}
      style={{
        rotateX,
        rotateY,
        "--gx": gx,
        "--gy": gy,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {surface && (
        <span aria-hidden className="absolute inset-0 rounded-[inherit] glass pointer-events-none" />
      )}
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ backgroundImage: glareBg, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
        />
      )}
    </motion.div>
  );
}
