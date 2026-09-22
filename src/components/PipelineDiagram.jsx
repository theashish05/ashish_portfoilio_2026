import { Fragment, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaChartLine, FaCheck, FaDatabase, FaFileAlt, FaFileCode, FaFilter, FaGlobe,
  FaLayerGroup, FaProjectDiagram, FaServer, FaTable,
} from "react-icons/fa";
import { SiAnthropic, SiApachespark, SiJson } from "react-icons/si";

const ICONS = {
  source: FaServer,
  bronze: FaLayerGroup,
  silver: FaLayerGroup,
  gold: FaLayerGroup,
  analytics: FaChartLine,
  api: FaGlobe,
  adf: FaProjectDiagram,
  lake: FaDatabase,
  spark: SiApachespark,
  delta: FaTable,
  sql: FaFileCode,
  logs: FaFileAlt,
  json: SiJson,
  aggregate: FaFilter,
  llm: SiAnthropic,
  summary: FaCheck,
};

function Connector({ index }) {
  return (
    <div
      aria-hidden
      className="relative flex-none self-center h-9 w-px lg:h-px lg:w-8 bg-gradient-to-b lg:bg-gradient-to-r from-spark/20 via-spark/60 to-spark/20"
      style={{ "--flow-len": "36px", transform: "translateZ(10px)" }}
    >
      <span
        className="lg:hidden absolute -left-[2.5px] top-0 h-[6px] w-[6px] rounded-full bg-spark shadow-[0_0_8px_var(--color-spark)] flow-dot-y"
        style={{ animationDelay: `${index * 0.35}s` }}
      />
      <span
        className="hidden lg:block absolute -top-[2.5px] left-0 h-[6px] w-[6px] rounded-full bg-spark shadow-[0_0_8px_var(--color-spark)] flow-dot-x"
        style={{ "--flow-len": "32px", animationDelay: `${index * 0.35}s` }}
      />
    </div>
  );
}

function Node({ node, step }) {
  const Icon = ICONS[node.icon] || FaDatabase;
  return (
    <motion.div
      whileHover={{ z: 60, y: -8, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative flex-1 min-w-0 rounded-2xl border p-4 text-center transition-shadow duration-300 hover:shadow-[0_30px_60px_-24px_var(--accent)]"
      style={{
        "--accent": node.accent,
        transformStyle: "preserve-3d",
        borderColor: `color-mix(in srgb, ${node.accent} 45%, var(--color-line))`,
        background: `linear-gradient(160deg, color-mix(in srgb, ${node.accent} 14%, var(--color-surface)) 0%, var(--color-surface) 70%)`,
      }}
    >
      <span className="absolute top-2 left-3 font-mono text-[10px] text-faint">{String(step).padStart(2, "0")}</span>
      <div
        className="mx-auto grid place-items-center h-12 w-12 rounded-xl"
        style={{
          transform: "translateZ(38px)",
          color: node.accent,
          background: `color-mix(in srgb, ${node.accent} 18%, transparent)`,
          boxShadow: `0 10px 26px -10px ${node.accent}`,
        }}
      >
        <Icon size={22} />
      </div>
      <p className="mt-3 font-display text-sm text-text" style={{ transform: "translateZ(22px)" }}>
        {node.label}
      </p>
      <p className="mt-1 text-xs text-muted leading-snug" style={{ transform: "translateZ(14px)" }}>
        {node.sub}
      </p>
      {node.badges && (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5" style={{ transform: "translateZ(26px)" }}>
          {node.badges.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
              style={{ color: node.accent, borderColor: `color-mix(in srgb, ${node.accent} 45%, transparent)` }}
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Isometric-style pipeline: the whole diagram rests tilted and levels out /
 * follows the pointer on hover, and each node lifts off the plane when hovered.
 */
export default function PipelineDiagram({ nodes }) {
  const ref = useRef(null);
  const rx = useMotionValue(12);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(4 - py * 10);
    ry.set(px * 12);
  };
  const onLeave = () => {
    rx.set(12);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative rounded-3xl border border-line/70 bg-surface-2/40 p-4 sm:p-6"
      style={{ perspective: 1300 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row items-stretch gap-0"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {nodes.map((n, i) => (
          <Fragment key={n.label}>
            <Node node={n} step={i + 1} />
            {i < nodes.length - 1 && <Connector index={i} />}
          </Fragment>
        ))}
      </motion.div>
      <p className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.25em] text-faint">
        hover the diagram — nodes lift off the plane
      </p>
    </div>
  );
}
