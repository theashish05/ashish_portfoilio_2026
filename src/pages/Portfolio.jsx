import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { meta, portfolioItems } from "../data/content";
import Reveal from "../components/Reveal";

function TiltCard({ item, index }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.03,1.03,1.03)`,
    });
  };

  const reset = () => setStyle({ transform: "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)" });

  const isExternal = item.link?.startsWith("http");
  const linkProps = isExternal
    ? { href: item.link, target: "_blank", rel: "noreferrer" }
    : { to: item.link };
  const Anchor = isExternal ? "a" : Link;

  return (
    <Reveal delay={index * 0.08}>
      <Anchor
        {...linkProps}
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={style}
        className="group block rounded-2xl border border-line glass p-7 h-56 flex flex-col justify-between transition-[border-color,box-shadow] duration-300 hover:border-spark/50 hover:shadow-2xl hover:shadow-spark/10 will-change-transform"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs px-3 py-1 rounded-full border border-line text-muted">
            {item.tag}
          </span>
          <span className="font-mono text-xs text-faint">0{index + 1}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl text-text group-hover:text-spark transition-colors">
            {item.description}
          </h3>
          <span className="inline-flex items-center gap-2 text-sm text-muted mt-3 group-hover:text-spark transition-colors">
            View project
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              &rarr;
            </motion.span>
          </span>
        </div>
      </Anchor>
    </Reveal>
  );
}

export default function Portfolio() {
  useEffect(() => {
    document.title = `Portfolio | ${meta.title}`;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-32 pb-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-4">Selected work</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text">Portfolio</h1>
        <div className="h-px w-24 bg-gradient-to-r from-spark to-transparent mt-6" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {portfolioItems.map((item, i) => (
          <TiltCard key={item.description} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
