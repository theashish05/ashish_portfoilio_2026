import { useEffect } from "react";
import {
  dataAbout,
  meta,
  workTimeline,
  skills,
  otherTools,
  services,
} from "../data/content";
import Reveal from "../components/Reveal";
import ZoomSection from "../components/ZoomSection";
import SkillGauge from "../components/SkillGauge";
import ResumeButtons from "../components/ResumeButtons";

export default function About() {
  useEffect(() => {
    document.title = `About | ${meta.title}`;
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-32 pb-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-4">Profile</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text">About me</h1>
        <div className="h-px w-24 bg-gradient-to-r from-spark to-transparent mt-6" />
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mt-16">
        <Reveal>
          <h2 className="font-display text-xl text-spark">{dataAbout.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted leading-relaxed text-lg">{dataAbout.aboutme}</p>
          <ResumeButtons className="mt-8" />
        </Reveal>
      </div>

      <ZoomSection className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mt-20 pt-16 border-t border-line">
        <h2 className="font-display text-xl text-spark">Work timeline</h2>
        <div className="space-y-4">
          {workTimeline.map((job, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-xl border border-line glass"
            >
              <div>
                <p className="font-display text-text">{job.jobtitle}</p>
                <p className="text-sm text-muted">{job.where}</p>
              </div>
              <span className="font-mono text-xs text-spark px-3 py-1 rounded-full border border-spark/30">
                {job.date}
              </span>
            </div>
          ))}
        </div>
      </ZoomSection>

      {/* anchor sits on a non-transformed wrapper so #skills scrolls to the right place */}
      <div id="skills" className="mt-20 scroll-mt-24">
      <ZoomSection className="pt-16 border-t border-line">
        <h2 className="font-display text-xl text-spark">Skills</h2>
        <p className="text-sm text-muted mt-2 mb-8 max-w-xl">
          Core skills from my resume, strongest first.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
          {skills.map((s, i) => (
            <SkillGauge key={s.name} name={s.name} value={s.value} index={i} />
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint mt-12 mb-4">
          Also work with
        </p>
        <div className="flex flex-wrap gap-2">
          {otherTools.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full border border-line glass text-xs font-mono text-muted hover:text-spark hover:border-spark/50 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </ZoomSection>
      </div>

      <ZoomSection className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mt-20 pt-16 border-t border-line">
        <h2 className="font-display text-xl text-spark">Services</h2>
        <div className="space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex gap-4">
                <span className="font-mono text-xs text-spark pt-1.5">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg text-text mb-2">{s.title}</h3>
                  <p className="text-muted leading-relaxed">{s.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </ZoomSection>
    </div>
  );
}
