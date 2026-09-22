import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaCloud } from "react-icons/fa";
import Tilt3D from "./Tilt3D";

const AZURE_SERVICES = ["Data Factory", "Databricks", "ADLS Gen2", "Synapse"];

function Cloud({ className = "", style }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 110" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b9dcff" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <circle cx="62" cy="66" r="30" />
        <circle cx="98" cy="46" r="38" />
        <circle cx="138" cy="62" r="32" />
        <circle cx="168" cy="74" r="20" />
        <rect x="34" y="66" width="150" height="34" rx="17" />
      </g>
    </svg>
  );
}

/* ---- panel artwork ---- */

function ReactPanel() {
  return (
    <div className="relative h-full w-full grid place-items-center bg-gradient-to-br from-spark/15 via-pulse/10 to-transparent">
      <svg viewBox="-60 -60 120 120" className="h-28 w-28 text-spark drop-shadow-[0_0_14px_rgba(74,222,128,0.55)]">
        <g style={{ animation: "spin-border 16s linear infinite" }}>
          {[0, 60, 120].map((a) => (
            <ellipse key={a} rx="50" ry="19" transform={`rotate(${a})`} fill="none" stroke="currentColor" strokeWidth="2.2" />
          ))}
        </g>
        <circle r="7" fill="currentColor" />
      </svg>
    </div>
  );
}

function PipelinePanel() {
  const slabs = [
    { c: "#cd7f32", t: "Bronze" },
    { c: "#c0c8d4", t: "Silver" },
    { c: "#f5c542", t: "Gold" },
  ];
  return (
    <div className="relative h-full w-full flex items-center justify-center gap-0 px-3 bg-gradient-to-br from-pulse/15 via-spark/10 to-transparent">
      {slabs.map((s, i) => (
        <div key={s.t} className="flex items-center">
          <div
            className="grid place-items-center h-14 w-[62px] rounded-lg border text-[10px] font-mono uppercase tracking-wider"
            style={{
              borderColor: s.c,
              color: s.c,
              background: `color-mix(in srgb, ${s.c} 14%, transparent)`,
              boxShadow: `0 8px 22px -10px ${s.c}`,
            }}
          >
            {s.t}
          </div>
          {i < slabs.length - 1 && (
            <div className="relative h-px w-5 bg-spark/40" style={{ "--flow-len": "20px" }}>
              <span
                className="absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-spark flow-dot-x"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SkyPanel({ open, inView }) {
  const state = open ? "apart" : inView ? "come" : "away";
  const cloud = (away, apart, extra = {}) => ({
    away: { opacity: 0, ...away },
    come: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], ...extra } },
    apart: { opacity: 0, ...apart, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  });
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0b4a6e]/70 via-[#0d5a73]/35 to-spark/10">
      {/* Azure reveal (behind the clouds) */}
      <motion.div
        className="absolute inset-0 grid place-items-center px-3"
        initial={false}
        animate={
          open
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.82, filter: "blur(8px)" }
        }
        transition={{ duration: 0.6, delay: open ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2.5">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-sky to-[#2563eb] text-white shadow-[0_0_28px_rgba(56,189,248,0.7)]">
              <FaCloud size={18} />
            </span>
            <span className="font-display text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-sky bg-clip-text text-transparent">
              Azure
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            {AZURE_SERVICES.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-full border border-sky/40 bg-sky/10 text-[10px] font-mono text-sky">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Clouds drift in when the section scrolls into view, part on hover */}
      <motion.div className="absolute left-[2%] top-[12%] w-[52%] drop-shadow-[0_10px_16px_rgba(56,189,248,0.3)]"
        initial="away" animate={state}
        variants={cloud({ x: -220, y: 10, scale: 0.9 }, { x: -170, y: -10, scale: 1.05 })}>
        <Cloud className="w-full" style={{ animation: "cloud-drift 9s ease-in-out infinite" }} />
      </motion.div>
      <motion.div className="absolute right-[-2%] top-[4%] w-[44%] drop-shadow-[0_10px_16px_rgba(56,189,248,0.3)]"
        initial="away" animate={state}
        variants={cloud({ x: 240, y: -10, scale: 0.9 }, { x: 190, y: -20, scale: 1.05 }, { delay: 0.25 })}>
        <Cloud className="w-full" style={{ animation: "cloud-drift 11s ease-in-out infinite reverse" }} />
      </motion.div>
      <motion.div className="absolute left-[22%] bottom-[-8%] w-[60%] drop-shadow-[0_10px_16px_rgba(56,189,248,0.3)]"
        initial="away" animate={state}
        variants={cloud({ x: -140, y: 40, scale: 0.85 }, { x: 60, y: 90, scale: 1.25 }, { delay: 0.5 })}>
        <Cloud className="w-full" style={{ animation: "cloud-drift 13s ease-in-out infinite" }} />
      </motion.div>

      <motion.span
        className="absolute bottom-2 right-3 text-[10px] font-mono uppercase tracking-widest text-white/70"
        animate={{ opacity: open ? 0 : 1 }}
      >
        hover me
      </motion.span>
    </div>
  );
}

/* ---- cards ---- */

const shell =
  "group relative h-full rounded-2xl border border-line p-5 flex flex-col transition-colors hover:border-spark/50";
const panelCls = "relative h-[168px] rounded-xl overflow-hidden border border-line/70";

function CardBody({ index, title, desc, cta }) {
  return (
    <div className="relative mt-5 flex-1 flex flex-col" style={{ transform: "translateZ(16px)" }}>
      <span className="font-mono text-xs text-spark">0{index}</span>
      <h3 className="font-display text-lg mt-2 mb-2 text-text">{title}</h3>
      <p className="text-sm text-muted leading-relaxed flex-1">{desc}</p>
      {cta && (
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-spark">
          {cta}
          <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1.5" />
        </span>
      )}
    </div>
  );
}

export default function FocusCards() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [open, setOpen] = useState(false);
  const lastPointer = useRef("mouse");

  return (
    <div ref={sectionRef} className="grid sm:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
      {/* 1 — React */}
      <Link to="/react" className="block h-full" aria-label="React interfaces — view details">
        <Tilt3D surface className={shell}>
          <div className={panelCls} style={{ transform: "translateZ(24px)" }}>
            <ReactPanel />
          </div>
          <CardBody
            index={1}
            title="React Interfaces"
            desc="Building fast, accessible, component-driven UIs with modern React — the front-end craft behind my data work."
            cta="React details"
          />
        </Tilt3D>
      </Link>

      {/* 2 — Data Engineering */}
      <Link to="/data-engineering" className="block h-full" aria-label="Data engineering — view my projects">
        <Tilt3D surface className={shell}>
          <div className={panelCls} style={{ transform: "translateZ(24px)" }}>
            <PipelinePanel />
          </div>
          <CardBody
            index={2}
            title="Data Engineering"
            desc="Medallion lakehouses, incremental MERGE loads and quality gates on Databricks, PySpark and Delta Lake."
            cta="See my pipelines"
          />
        </Tilt3D>
      </Link>

      {/* 3 — Cloud & Big Data: clouds come in, hover reveals Azure */}
      <div className="h-full">
        <Tilt3D
          surface
          className={`${shell} cursor-pointer outline-none focus-visible:border-sky`}
          role="button"
          tabIndex={0}
          aria-pressed={open}
          aria-label="Cloud and big data — reveal Azure"
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
          onClick={() => lastPointer.current !== "mouse" && setOpen((o) => !o)}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
        >
          <div className={panelCls} style={{ transform: "translateZ(24px)" }}>
            <SkyPanel open={open} inView={inView} />
          </div>
          <CardBody
            index={3}
            title="Cloud & Big Data"
            desc="Hands-on with Azure — Data Factory for orchestration, ADLS Gen2 for storage, Databricks for compute, Synapse for serving."
          />
        </Tilt3D>
      </div>
    </div>
  );
}
