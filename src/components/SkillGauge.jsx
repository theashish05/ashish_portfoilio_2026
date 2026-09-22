import { useId } from "react";
import { motion } from "framer-motion";
import Tilt3D from "./Tilt3D";

const R = 34;
const C = 2 * Math.PI * R;

export default function SkillGauge({ name, value, index = 0 }) {
  const id = useId();
  return (
    <Tilt3D surface max={14} className="rounded-2xl border border-line p-5 text-center hover:border-spark/50 transition-colors">
      <div className="relative mx-auto h-24 w-24" style={{ transform: "translateZ(34px)" }}>
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90 drop-shadow-[0_0_10px_rgba(74,222,128,0.35)]">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4ade80" />
              <stop offset="0.6" stopColor="#2dd4bf" />
              <stop offset="1" stopColor="#e6f26a" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r={R} fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * (1 - value / 100) }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-xl text-text">
          {value}
          <span className="text-xs text-spark ml-0.5 self-center">%</span>
        </span>
      </div>
      <p className="relative mt-4 font-display text-sm text-text" style={{ transform: "translateZ(18px)" }}>
        {name}
      </p>
    </Tilt3D>
  );
}
