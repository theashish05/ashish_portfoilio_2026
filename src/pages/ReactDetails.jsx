import { Suspense, lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SiFramer, SiJavascript, SiReact, SiTailwindcss, SiThreedotjs, SiVite } from "react-icons/si";
import { meta } from "../data/content";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import Reveal from "../components/Reveal";
import ZoomSection from "../components/ZoomSection";
import PageHeader from "../components/PageHeader";
import Tilt3D from "../components/Tilt3D";
import GlowButton from "../components/GlowButton";

const AtomScene = lazy(() => import("../scenes/AtomScene"));

const stack = [
  { Icon: SiReact, name: "React 19", note: "Components, hooks, lazy loading" },
  { Icon: SiJavascript, name: "JavaScript", note: "Modern ES modules" },
  { Icon: SiVite, name: "Vite", note: "Fast dev & production builds" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", note: "Design tokens & utilities" },
  { Icon: SiFramer, name: "Framer Motion", note: "Scroll, layout & 3D tilt motion" },
  { Icon: SiThreedotjs, name: "React Three Fiber", note: "WebGL scenes in React" },
];

const builds = [
  {
    title: "AM Shopify",
    tag: "Live web app",
    text: "A shopping web app built with React and deployed on Netlify.",
    href: "https://am-shopify.netlify.app/",
  },
  {
    title: "This portfolio",
    tag: "React · Vite · R3F",
    text: "The site you're on: React 19, Tailwind v4, Framer Motion and a procedural 3D forest that adapts to the device.",
    to: "/",
  },
  {
    title: "Card templates",
    tag: "UI kit",
    text: "A gallery of HD card components — tilt, flip, spotlight, parallax — each one a small working React component.",
    to: "/cards",
  },
];

const principles = [
  ["Component-driven", "Small, reusable pieces with content kept in one data file so updates never touch layout code."],
  ["Performance-minded", "3D scenes are lazy-loaded and only run on capable devices; everything else gets a lightweight fallback."],
  ["Responsive & accessible", "Fluid layouts, keyboard-friendly controls and respect for reduced-motion preferences."],
  ["API-integrated", "Comfortable wiring UIs to REST APIs and services — the same skill that powers my data pipelines."],
];

export default function ReactDetails() {
  const { canRender3D } = useDeviceCapability();
  useEffect(() => {
    document.title = `React | ${meta.title}`;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-32 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-spark transition-colors mb-8">
        <FaArrowLeft size={11} /> Back home
      </Link>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <PageHeader eyebrow="Focus 01" title="React interfaces">
          React is where my engineering started — component-driven UIs in JavaScript. Today it's how I make data
          approachable: dashboards, portfolios and interactive tools that sit in front of the pipelines I build.
        </PageHeader>
        <div className="relative h-[280px] sm:h-[340px]">
          {canRender3D ? (
            <Suspense fallback={null}>
              <AtomScene />
            </Suspense>
          ) : (
            <div className="h-full grid place-items-center">
              <SiReact size={120} className="text-spark animate-float" />
            </div>
          )}
        </div>
      </div>

      <ZoomSection className="mt-20">
        <h2 className="font-display text-2xl text-text mb-8">The toolkit</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
          {stack.map(({ Icon, name, note }) => (
            <Tilt3D key={name} surface max={12} className="rounded-2xl border border-line p-5 hover:border-spark/50 transition-colors">
              <span className="relative grid place-items-center h-12 w-12 rounded-xl bg-spark/12 text-spark" style={{ transform: "translateZ(34px)" }}>
                <Icon size={22} />
              </span>
              <p className="relative font-display text-text mt-4" style={{ transform: "translateZ(20px)" }}>{name}</p>
              <p className="relative text-xs text-muted mt-1">{note}</p>
            </Tilt3D>
          ))}
        </div>
      </ZoomSection>

      <ZoomSection className="mt-20">
        <h2 className="font-display text-2xl text-text mb-8">Things built with React</h2>
        <div className="grid md:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
          {builds.map((b) => {
            const body = (
              <Tilt3D surface max={9} className="group h-full rounded-2xl border border-line p-6 hover:border-spark/50 transition-colors">
                <span className="relative font-mono text-[11px] px-3 py-1 rounded-full border border-line text-muted" style={{ transform: "translateZ(16px)" }}>{b.tag}</span>
                <h3 className="relative font-display text-xl text-text group-hover:text-spark transition-colors mt-4" style={{ transform: "translateZ(26px)" }}>{b.title}</h3>
                <p className="relative text-sm text-muted mt-2 leading-relaxed">{b.text}</p>
              </Tilt3D>
            );
            return b.href ? (
              <a key={b.title} href={b.href} target="_blank" rel="noreferrer" className="block">{body}</a>
            ) : (
              <Link key={b.title} to={b.to} className="block">{body}</Link>
            );
          })}
        </div>
      </ZoomSection>

      <ZoomSection className="mt-20">
        <h2 className="font-display text-2xl text-text mb-8">How I build</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {principles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <h3 className="font-display text-lg text-spark">{t}</h3>
              <p className="text-muted mt-1.5 leading-relaxed">{d}</p>
            </Reveal>
          ))}
        </div>
      </ZoomSection>

      <div className="mt-20 flex flex-wrap gap-4">
        <GlowButton as={Link} to="/cards" variant="solid">
          Browse card templates <FaArrowRight size={12} />
        </GlowButton>
        <GlowButton as={Link} to="/data-engineering" variant="outline">
          See my data pipelines
        </GlowButton>
      </div>
    </div>
  );
}
