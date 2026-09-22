import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { introData, meta, skills, homeSkillCount } from "../data/content";
import GlowButton from "../components/GlowButton";
import ZoomSection from "../components/ZoomSection";
import FocusCards from "../components/FocusCards";
import SkillGauge from "../components/SkillGauge";
import ResumeButtons from "../components/ResumeButtons";
import PhotoHero from "../components/PhotoHero";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.title = `${meta.title} | ${meta.role}`;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
        {/* ambient background glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pulse/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -left-40 h-80 w-80 rounded-full bg-spark/10 blur-[120px]" />

        <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-5"
            >
              Bengaluru, India &middot; Available for work
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-text"
            >
              {introData.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="font-display text-2xl sm:text-3xl mt-3 text-gradient min-h-[2.5em]"
            >
              <Typewriter
                options={{
                  strings: introData.animated,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 12,
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="text-muted mt-6 max-w-lg leading-relaxed"
            >
              {introData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="flex flex-wrap gap-4 mt-9"
            >
              <GlowButton as={Link} to="/portfolio" variant="solid">
                My Portfolio
              </GlowButton>
              <GlowButton as={Link} to="/contact" variant="outline">
                Contact Me
              </GlowButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-12 text-xs font-mono text-faint"
            >
              {["Azure Databricks", "PySpark", "Delta Lake", "Azure Data Factory", "Python", "React"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <PhotoHero />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-faint"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-spark to-transparent" />
        </motion.div>
      </section>

      {/* Currently focused on — zooms in as you scroll down, out as you scroll up */}
      <ZoomSection className="mx-auto max-w-6xl px-5 sm:px-8 py-16 border-t border-line">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint mb-6">
          Currently focused on
        </p>
        <FocusCards />
      </ZoomSection>

      {/* Skills (from resume) */}
      <ZoomSection className="mx-auto max-w-6xl px-5 sm:px-8 py-16 border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-3">Skills</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text">What I work with</h2>
          </div>
          <Link
            to="/about#skills"
            className="text-sm text-muted hover:text-spark transition-colors"
          >
            See all skills &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
          {skills.slice(0, homeSkillCount).map((s, i) => (
            <SkillGauge key={s.name} name={s.name} value={s.value} index={i} />
          ))}
        </div>
      </ZoomSection>

      {/* Resume */}
      <ZoomSection className="mx-auto max-w-6xl px-5 sm:px-8 py-16 border-t border-line">
        <div className="rounded-3xl border border-line glass p-8 sm:p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-3">Resume</p>
          <h2 className="font-display text-2xl sm:text-3xl text-text">Want the full picture?</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            Download my latest resume — experience, projects, certifications and awards in one page.
          </p>
          <ResumeButtons className="justify-center mt-8" />
        </div>
      </ZoomSection>
    </div>
  );
}
