import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuBrainCircuit, LuFactory } from "react-icons/lu";
import { VscAzure } from "react-icons/vsc";
import { TbSql } from "react-icons/tb";
import { SiApachespark, SiClaude, SiDatabricks, SiReact } from "react-icons/si";
import photo from "../assets/ashish.webp";

/*
 * Interactive portrait.
 *  - idle            -> black & white, tinted with the site's green theme
 *  - hover the photo -> fades to full colour
 *  - hover the FACE  -> "AI is on the way" (light type + scanning ring)
 *  - hover the SIDES -> tech logos float out (AI, Azure, Databricks, Claude, ADF, SQL, React, PySpark)
 * Touch: tap a zone (or use the buttons under the photo). Zones are in normalised photo coordinates.
 */

const ASPECT = 1.6434; // photo height / width
const FACE = { cx: 0.5189, cy: 0.1349, rx: 0.1114, ry: 0.0873 };
const BODY = [
  [0.7585, 0.2239], [0.4792, 0.221], [0.4491, 0.229], [0.4132, 0.2515], [0.3991, 0.2778], [0.3792, 0.3577], [0.384, 0.3944], [0.3425, 0.473], [0.3396, 0.5068], [0.3217, 0.5327], [0.3387, 0.6659], [0.3595, 0.6762], [0.367, 0.7331], [0.1623, 0.8772], [0.0962, 0.9994], [0.567, 0.9994], [0.6236, 0.8204], [0.7463, 0.7026], [0.7717, 0.5832], [0.7595, 0.5752], [0.7641, 0.5488], [0.7566, 0.527], [0.8, 0.5029], [0.8386, 0.4633], [0.866, 0.4581], [0.8764, 0.4489], [0.8604, 0.3806], [0.8623, 0.3628], [0.835, 0.3329], [0.8085, 0.2853], [0.801, 0.2572], [0.7811, 0.2354],
];

const LOGOS = [
  { name: "AI", Icon: LuBrainCircuit, color: "#4ade80", side: "left", y: 9 },
  { name: "Azure", Icon: VscAzure, color: "#38a4f8", side: "right", y: 22 },
  { name: "Databricks", Icon: SiDatabricks, color: "#ff5a3c", side: "left", y: 31 },
  { name: "Claude", Icon: SiClaude, color: "#e8845f", side: "right", y: 43 },
  { name: "Data Factory", Icon: LuFactory, color: "#2dd4bf", side: "left", y: 53 },
  { name: "SQL", Icon: TbSql, color: "#f5b942", side: "right", y: 64 },
  { name: "React", Icon: SiReact, color: "#61dafb", side: "left", y: 75 },
  { name: "PySpark", Icon: SiApachespark, color: "#f2762e", side: "right", y: 85 },
];

function inPolygon(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function zoneAt(u, v) {
  if (u < 0 || u > 1 || v < 0 || v > 1) return "side";
  const dx = (u - FACE.cx) / FACE.rx;
  const dy = (v - FACE.cy) / FACE.ry;
  if (dx * dx + dy * dy <= 1) return "face";
  if (inPolygon(u, v, BODY)) return "body";
  return "side";
}

const TEXT = "AI is on the way";

function FaceOverlay() {
  // ring diameter as a fraction of photo width (a circle, so it rotates cleanly)
  const d = 2 * Math.max(FACE.rx, FACE.ry * ASPECT) * 1.12;
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: `${FACE.cx * 100}%`, top: `${FACE.cy * 100}%`, width: `${d * 100}%`, aspectRatio: "1", x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 rounded-full border border-dashed border-spark/80"
          style={{ animation: "spin-border 14s linear infinite", boxShadow: "0 0 28px rgba(74,222,128,.45), inset 0 0 26px rgba(74,222,128,.25)" }}
        />
        <div
          className="absolute inset-[9%] rounded-full border border-white/50"
          style={{ animation: "spin-border 9s linear infinite reverse", borderTopColor: "transparent", borderBottomColor: "transparent" }}
        />
        <span className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(74,222,128,.9)]" />
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute w-px origin-top pointer-events-none bg-gradient-to-b from-spark to-white/60"
        style={{ left: `${FACE.cx * 100}%`, top: `${(FACE.cy + FACE.ry * 1.12 * 1.12) * 100 - 0.4}%`, height: "3.4%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute inset-x-0 flex justify-center pointer-events-none"
        style={{ top: `${(FACE.cy + FACE.ry * 1.12 * 1.12) * 100 + 3}%` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.45 }}
      >
        <div className="rounded-full backdrop-blur-md bg-black/45 border border-white/15 shadow-[0_0_40px_-6px_rgba(74,222,128,.6)]" style={{ padding: "1.7cqw 4.2cqw" }}>
          <p
            className="whitespace-nowrap text-white"
            style={{
              fontFamily: '"Outfit","Inter",system-ui,sans-serif',
              fontWeight: 200,
              fontSize: "6.2cqw",
              letterSpacing: "0.14em",
              textShadow: "0 0 18px rgba(74,222,128,.85), 0 0 4px rgba(255,255,255,.6)",
            }}
            aria-label={TEXT}
          >
            {TEXT.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.12 + i * 0.045, duration: 0.35 }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
            <motion.span
              aria-hidden
              className="inline-block ml-[0.15em] w-[0.08em] h-[0.9em] align-middle bg-spark"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default function PhotoHero() {
  const wrapRef = useRef(null);
  const photoRef = useRef(null);
  const [zone, setZone] = useState(null);
  const [overPhoto, setOverPhoto] = useState(false);

  const detect = (e) => {
    const r = photoRef.current?.getBoundingClientRect();
    if (!r) return;
    const u = (e.clientX - r.left) / r.width;
    const v = (e.clientY - r.top) / r.height;
    const z = zoneAt(u, v);
    setZone((cur) => (cur === z ? cur : z));
    setOverPhoto(u >= 0 && u <= 1 && v >= 0 && v <= 1);
  };

  // touch: tapping outside the portrait clears the state
  useEffect(() => {
    const away = (e) => {
      if (e.pointerType === "mouse") return;
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setZone(null);
        setOverPhoto(false);
      }
    };
    window.addEventListener("pointerdown", away);
    return () => window.removeEventListener("pointerdown", away);
  }, []);

  const face = zone === "face";
  const side = zone === "side";
  // colour comes in whenever the photo is hovered (or its touch button is on)
  const colour = face || zone === "body" || (side && overPhoto);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[560px] select-none"
      style={{ containerType: "inline-size", touchAction: "pan-y" }}
      onPointerMove={detect}
      onPointerDown={detect}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setZone(null);
          setOverPhoto(false);
        }
      }}
    >
      {/* soft green glow behind the portrait */}
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark/25 blur-[90px]" />

      {/* portrait card */}
      <div className="relative mx-auto" style={{ width: "66%" }}>
        <div
          ref={photoRef}
          role="img"
          aria-label="Portrait of Ashish Acharya. Hover it to see it in colour. Hover the face or the sides for more."
          className="relative overflow-hidden rounded-[28px] border border-spark/30 shadow-[0_30px_80px_-30px_rgba(74,222,128,.55)]"
          style={{ aspectRatio: `1 / ${ASPECT}`, containerType: "inline-size", cursor: "default" }}
        >
          <img
            src={photo}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: colour ? "grayscale(0) contrast(1.02) brightness(1)" : "grayscale(1) contrast(1.1) brightness(0.82)",
              transition: "filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {/* green theme tint over the black & white photo - fades out on hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(165deg, rgba(74,222,128,.55) 0%, rgba(13,148,136,.45) 55%, rgba(3,11,7,.7) 100%)",
              mixBlendMode: "color",
              opacity: colour ? 0 : 1,
              transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/60 via-transparent to-spark/10"
            style={{ opacity: colour ? 0 : 1, transition: "opacity 0.7s" }}
          />

          {/* dim the top a touch while the face effect plays so the text pops */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/45 via-transparent to-transparent"
            initial={false}
            animate={{ opacity: face ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <AnimatePresence>{face && <FaceOverlay key="face" />}</AnimatePresence>

          {/* fade into the page at the bottom */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-ink/70 to-transparent pointer-events-none" />
        </div>

        {/* caption + touch/keyboard fallback */}
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          <span className="hidden [@media(hover:none)]:inline">Tap</span>
          <span className="[@media(hover:none)]:hidden">Hover</span> for colour &middot; face &middot; sides
        </p>
        <div className="mt-2 flex justify-center gap-2 [@media(hover:hover)]:hidden">
          {[["body", "Colour"], ["face", "Face"], ["side", "Skills"]].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setOverPhoto(false);
                setZone((z) => (z === k ? null : k));
              }}
              className={`rounded-full border px-3 py-1 text-[11px] font-mono transition-colors ${zone === k ? "border-spark text-spark" : "border-line text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* tech logos in the side gutters */}
      {LOGOS.map(({ name, Icon, color, side: s, y }, i) => {
        const left = s === "left";
        return (
          <motion.div
            key={name}
            className="absolute z-10 pointer-events-none"
            style={{ top: `${y}%`, [left ? "left" : "right"]: `${(i % 2) * 2 + 1.5}%`, width: "min(15cqw, 68px)" }}
            initial={false}
            animate={side ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.3, x: left ? 46 : -46 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: side ? i * 0.055 : 0 }}
          >
            <div style={{ animation: "float 5s ease-in-out infinite", animationDelay: `${i * 0.45}s` }}>
              <div
                className="grid aspect-square w-full place-items-center rounded-2xl border backdrop-blur-md"
                style={{
                  color,
                  borderColor: `color-mix(in srgb, ${color} 50%, transparent)`,
                  background: `linear-gradient(150deg, color-mix(in srgb, ${color} 22%, rgba(6,16,10,.72)), rgba(6,16,10,.72))`,
                  boxShadow: `0 14px 34px -12px ${color}`,
                }}
              >
                <Icon style={{ width: "52%", height: "52%" }} />
              </div>
              <p className="mt-1.5 text-center font-mono text-[9px] leading-tight text-muted">{name}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
