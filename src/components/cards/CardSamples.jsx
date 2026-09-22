import { useEffect, useId, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { FaBolt, FaCheck, FaHeart, FaLeaf, FaRegHeart, FaStar } from "react-icons/fa";
import Tilt3D from "../Tilt3D";

/* ---------- crisp vector art (sharp at any resolution) ---------- */

function MountainArt({ className = "" }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className={`absolute inset-0 h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#062e22" />
          <stop offset="1" stopColor="#1f7a52" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#${id})`} />
      <circle cx="304" cy="58" r="26" fill="#f6f3a6" opacity="0.92" />
      <circle cx="304" cy="58" r="44" fill="#f6f3a6" opacity="0.12" />
      <path d="M0 172 L70 92 L122 142 L192 60 L262 150 L322 102 L400 172 V220 H0Z" fill="#14532d" />
      <path d="M0 192 L92 132 L152 172 L232 112 L302 176 L400 142 V220 H0Z" fill="#166534" />
      <path d="M0 212 Q100 182 200 202 T400 196 V220 H0Z" fill="#052e16" />
    </svg>
  );
}

function Pine({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M0 -78 L22 -40 H10 L30 -6 H-30 L-10 -40 H-22Z" />
      <rect x="-4" y="-6" width="8" height="16" fill="#3f2a17" />
    </g>
  );
}

/* ---------- 1. Holographic tilt ---------- */

export function HoloCard() {
  return (
    <Tilt3D max={14} scale={1.04} className="group h-full rounded-3xl overflow-hidden border border-line bg-surface shadow-2xl shadow-black/30">
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <MountainArt />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 20%, rgba(74,222,128,.55) 36%, rgba(56,189,248,.55) 50%, rgba(230,242,106,.55) 64%, transparent 80%)",
          backgroundSize: "240% 240%",
          backgroundPosition: "var(--gx) var(--gy)",
          mixBlendMode: "color-dodge",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent" style={{ transform: "translateZ(40px)" }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-spark">Holographic</span>
        <h3 className="font-display text-2xl text-white mt-1">Emerald Ridge</h3>
        <p className="text-sm text-white/70 mt-1">Move your cursor — the foil follows.</p>
      </div>
    </Tilt3D>
  );
}

/* ---------- 2. Glass profile ---------- */

export function GlassProfileCard() {
  return (
    <div className="relative h-full rounded-3xl overflow-hidden border border-line bg-surface">
      <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-spark/40 blur-3xl" />
      <div className="absolute -bottom-12 -right-8 h-52 w-52 rounded-full bg-pulse/40 blur-3xl" />
      <Tilt3D max={9} scale={1.02} className="absolute inset-4 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-6 flex flex-col items-center text-center">
        <div
          className="grid place-items-center h-20 w-20 rounded-full bg-gradient-to-br from-spark to-pulse font-display text-2xl text-[#03130a] shadow-[0_0_30px_rgba(74,222,128,0.5)]"
          style={{ transform: "translateZ(50px)" }}
        >
          AA
        </div>
        <h3 className="font-display text-xl text-text mt-4" style={{ transform: "translateZ(30px)" }}>Ashish Acharya</h3>
        <p className="text-sm text-muted" style={{ transform: "translateZ(20px)" }}>Azure Data Engineer</p>
        <div className="grid grid-cols-3 gap-3 w-full mt-6 text-center" style={{ transform: "translateZ(26px)" }}>
          {[["4", "yrs exp"], ["3", "pipelines"], ["2", "certs ↗"]].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-white/[0.06] py-2.5">
              <p className="font-display text-lg text-spark">{v}</p>
              <p className="text-[10px] text-muted">{l}</p>
            </div>
          ))}
        </div>
        <button className="mt-auto w-full rounded-full bg-spark py-2.5 text-sm font-medium text-[#03130a] hover:bg-spark-dim transition-colors" style={{ transform: "translateZ(34px)" }}>
          Connect
        </button>
      </Tilt3D>
    </div>
  );
}

/* ---------- 3. 3D flip ---------- */

export function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="group h-full [perspective:1200px] cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="Flip card"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
    >
      <div className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"}`}>
        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-line [backface-visibility:hidden]">
          <MountainArt />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-6">
            <FaLeaf className="text-spark mb-3" size={22} />
            <h3 className="font-display text-2xl text-white">Medallion</h3>
            <p className="text-sm text-white/70">Hover or tap to flip</p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl border border-spark/40 bg-gradient-to-br from-surface-3 to-surface p-6 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-display text-xl text-spark mb-4">Bronze → Silver → Gold</h3>
          {[["#cd7f32", "Bronze", "raw, as-landed"], ["#c0c8d4", "Silver", "cleansed & conformed"], ["#f5c542", "Gold", "analytics-ready"]].map(([c, t, d]) => (
            <div key={t} className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
              <span className="h-3 w-3 rounded-full" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
              <span className="font-display text-text">{t}</span>
              <span className="text-xs text-muted ml-auto">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Cursor spotlight ---------- */

export function SpotlightCard() {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="group relative h-full rounded-3xl border border-line bg-surface overflow-hidden p-7 flex flex-col justify-end"
      style={{ "--mx": "50%", "--my": "40%" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(360px circle at var(--mx) var(--my), rgba(74,222,128,0.22), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: 1,
          background: "radial-gradient(240px circle at var(--mx) var(--my), var(--color-spark), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">
        <span className="grid place-items-center h-12 w-12 rounded-xl bg-spark/15 text-spark mb-5"><FaBolt size={20} /></span>
        <h3 className="font-display text-2xl text-text">Spotlight</h3>
        <p className="text-sm text-muted mt-2 leading-relaxed">A soft light and a glowing edge chase your cursor across the card.</p>
      </div>
    </div>
  );
}

/* ---------- 5. Rotating gradient border ---------- */

export function AnimatedBorderCard() {
  return (
    <div className="relative h-full rounded-3xl p-[2px] overflow-hidden">
      <div
        aria-hidden
        className="absolute -inset-[60%]"
        style={{
          background: "conic-gradient(from 0deg, transparent 0 55%, var(--color-spark) 75%, var(--color-sky) 88%, transparent 100%)",
          animation: "spin-border 5s linear infinite",
        }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-2px)] bg-surface p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-spark">Live</span>
          <span className="h-2.5 w-2.5 rounded-full bg-spark animate-pulse-slow shadow-[0_0_12px_var(--color-spark)]" />
        </div>
        <div>
          <h3 className="font-display text-3xl text-text leading-tight">Pipeline<br />healthy</h3>
          <p className="text-sm text-muted mt-3">A light chases the border — great for status &amp; highlights.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 6. Pricing with shimmer ---------- */

export function PricingCard() {
  return (
    <Tilt3D max={7} scale={1.02} className="group h-full rounded-3xl border border-spark/40 bg-gradient-to-b from-surface-3 to-surface p-7 flex flex-col overflow-hidden">
      <span className="self-start rounded-full bg-spark/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-spark" style={{ transform: "translateZ(24px)" }}>Most popular</span>
      <h3 className="font-display text-2xl text-text mt-4" style={{ transform: "translateZ(30px)" }}>Lakehouse Pro</h3>
      <p className="mt-1 flex items-end gap-1" style={{ transform: "translateZ(40px)" }}>
        <span className="font-display text-5xl text-text">$49</span>
        <span className="text-sm text-muted mb-2">/ month</span>
      </p>
      <ul className="mt-5 space-y-2.5 text-sm text-muted flex-1" style={{ transform: "translateZ(18px)" }}>
        {["Unlimited pipelines", "Quality gates", "Slack alerts", "Priority support"].map((f) => (
          <li key={f} className="flex items-center gap-2.5"><FaCheck className="text-spark" size={11} />{f}</li>
        ))}
      </ul>
      <button className="relative mt-6 overflow-hidden rounded-full bg-spark py-3 text-sm font-medium text-[#03130a]" style={{ transform: "translateZ(36px)" }}>
        <span className="relative z-10">Get started</span>
        <span aria-hidden className="absolute inset-y-0 w-1/3 bg-white/50 blur-md" style={{ animation: "shimmer 2.6s ease-in-out infinite" }} />
      </button>
    </Tilt3D>
  );
}

/* ---------- 7. Animated stat + sparkline ---------- */

export function StatCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => v.toFixed(1));
  useEffect(() => {
    if (inView) animate(value, 98.7, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
  }, [inView, value]);
  const d = "M0 70 C 20 60, 30 66, 50 48 S 85 52, 105 34 S 150 40, 170 20 S 210 24, 240 8";
  return (
    <Tilt3D max={8} className="h-full rounded-3xl border border-line bg-surface p-7 flex flex-col overflow-hidden">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Pipeline success rate</p>
      <p ref={ref} className="mt-3 font-display text-6xl text-text" style={{ transform: "translateZ(40px)" }}>
        <motion.span>{text}</motion.span>
        <span className="text-3xl text-spark">%</span>
      </p>
      <p className="text-sm text-spark mt-1">▲ 2.4% vs last month</p>
      <svg viewBox="0 0 240 80" className="mt-auto w-full overflow-visible" style={{ transform: "translateZ(24px)" }}>
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4ade80" stopOpacity="0.35" />
            <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={`${d} V80 H0Z`} fill="url(#spark-fill)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 1 }} />
        <motion.path d={d} fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease: "easeOut" }} />
      </svg>
      <p className="text-[10px] text-faint mt-3">Sample data</p>
    </Tilt3D>
  );
}

/* ---------- 8. Fanning card deck ---------- */

export function DeckCard() {
  const cards = [
    { t: "React", c: "from-spark to-pulse", r: -14, x: -86 },
    { t: "Data", c: "from-pulse to-sky", r: 0, x: 0 },
    { t: "Cloud", c: "from-sky to-[#6366f1]", r: 14, x: 86 },
  ];
  return (
    <div className="group relative h-full rounded-3xl border border-line bg-surface overflow-hidden grid place-items-center">
      <div className="relative h-52 w-40">
        {cards.map((c, i) => (
          <div
            key={c.t}
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.c} shadow-2xl shadow-black/40 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:[transform:translateX(var(--x))_rotate(var(--r))_translateY(-8px)]`}
            style={{ zIndex: i, "--r": `${c.r}deg`, "--x": `${c.x}px` }}
          >
            <span className="font-display text-2xl text-[#03130a]/85">{c.t}</span>
          </div>
        ))}
      </div>
      <p className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Hover to fan</p>
    </div>
  );
}

/* ---------- 9. Product card with like burst ---------- */

export function ProductCard() {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  return (
    <Tilt3D max={7} scale={1.02} className="h-full rounded-3xl border border-line bg-surface overflow-hidden flex flex-col">
      <div className="relative h-[52%] overflow-hidden">
        <MountainArt />
        <button
          onClick={() => setLiked((l) => !l)}
          aria-label="Like"
          className="absolute top-4 right-4 grid place-items-center h-10 w-10 rounded-full bg-black/40 backdrop-blur text-white"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.span key={String(liked)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
            {liked ? <FaHeart className="text-rose-400" /> : <FaRegHeart />}
          </motion.span>
        </button>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-1 text-glow">{[0, 1, 2, 3, 4].map((i) => <FaStar key={i} size={11} />)}<span className="text-xs text-muted ml-2">4.9</span></div>
        <h3 className="font-display text-xl text-text mt-2" style={{ transform: "translateZ(20px)" }}>Trail Backpack</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-2xl text-text">$89</span>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1600); }}
            className="rounded-full bg-spark px-5 py-2.5 text-sm font-medium text-[#03130a] hover:bg-spark-dim transition-colors"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </Tilt3D>
  );
}

/* ---------- 10. Depth-parallax forest ---------- */

function Layer({ z, children, viewBox = "0 0 400 480" }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax slice"
      className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
      style={{ transform: `translateZ(${z}px)` }}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ForestCard() {
  return (
    <Tilt3D max={16} scale={1.04} className="h-full rounded-3xl border border-line bg-[#04150d]">
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden bg-gradient-to-b from-[#0a3b34] via-[#0c4a3a] to-[#062015]" />
      <Layer z={6}>
        <circle cx="290" cy="110" r="34" fill="#f6f3a6" opacity="0.9" />
        <circle cx="290" cy="110" r="70" fill="#f6f3a6" opacity="0.1" />
      </Layer>
      <Layer z={20}>
        <path d="M0 330 Q100 270 200 320 T400 300 V480 H0Z" fill="#0f5132" />
      </Layer>
      <Layer z={38}>
        {[40, 110, 190, 270, 350].map((x, i) => (
          <Pine key={x} x={x} y={380 + (i % 2) * 10} s={0.8 + (i % 3) * 0.12} fill="#166534" />
        ))}
      </Layer>
      <Layer z={68}>
        {[20, 150, 300, 390].map((x, i) => (
          <Pine key={x} x={x} y={470} s={1.5 + (i % 2) * 0.3} fill="#052e16" />
        ))}
      </Layer>
      <div className="absolute top-0 inset-x-0 p-6" style={{ transform: "translateZ(90px)" }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-spark">Parallax</span>
        <h3 className="font-display text-2xl text-white mt-1">Deep Forest</h3>
      </div>
    </Tilt3D>
  );
}

export const cardSamples = [
  { key: "holo", label: "Holographic tilt", effect: "3D tilt · foil sheen · glare", Comp: HoloCard },
  { key: "glass", label: "Glass profile", effect: "Glassmorphism · layered depth", Comp: GlassProfileCard },
  { key: "flip", label: "3D flip", effect: "Hover / tap to flip", Comp: FlipCard },
  { key: "spot", label: "Cursor spotlight", effect: "Radial light · glowing edge", Comp: SpotlightCard },
  { key: "border", label: "Rotating border", effect: "Conic-gradient animation", Comp: AnimatedBorderCard },
  { key: "pricing", label: "Pricing", effect: "Tilt · shimmer button", Comp: PricingCard },
  { key: "stat", label: "Stat + sparkline", effect: "Count-up · drawn line", Comp: StatCard },
  { key: "deck", label: "Card deck", effect: "Fan-out on hover", Comp: DeckCard },
  { key: "product", label: "Product card", effect: "Like burst · add to cart", Comp: ProductCard },
  { key: "forest", label: "Depth parallax", effect: "Layered SVG · real 3D depth", Comp: ForestCard },
];
