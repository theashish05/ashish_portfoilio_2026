import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { meta } from "../data/content";
import { pipelines } from "../data/pipelines";
import Reveal from "../components/Reveal";
import ZoomSection from "../components/ZoomSection";
import PageHeader from "../components/PageHeader";
import PipelineDiagram from "../components/PipelineDiagram";
import GlowButton from "../components/GlowButton";

export default function DataEngineering() {
  useEffect(() => {
    document.title = `Data Engineering | ${meta.title}`;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-32 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-spark transition-colors mb-8">
        <FaArrowLeft size={11} /> Back home
      </Link>

      <PageHeader eyebrow="Focus 02" title="Data engineering">
        Three projects, drawn as the pipelines they are. Each diagram tilts in 3D — move your cursor over it and
        hover any stage to lift it off the plane.
      </PageHeader>

      <div className="mt-20 space-y-28">
        {pipelines.map((p, i) => (
          <ZoomSection key={p.id} id={p.id} className="scroll-mt-28">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-spark">0{i + 1}</span>
              <h2 className="font-display text-2xl sm:text-3xl text-text">{p.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tech.map((t) => (
                <span key={t} className="font-mono text-[11px] px-3 py-1 rounded-full border border-spark/30 text-spark">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-muted max-w-3xl leading-relaxed mb-8">{p.summary}</p>

            <PipelineDiagram nodes={p.nodes} />

            <ul className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-4">
              {p.points.map((pt, k) => (
                <Reveal as="li" key={k} delay={k * 0.08} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-spark shadow-[0_0_8px_var(--color-spark)]" />
                  {pt}
                </Reveal>
              ))}
            </ul>
          </ZoomSection>
        ))}
      </div>

      <div className="mt-24 flex flex-wrap gap-4">
        <GlowButton as={Link} to="/about#skills" variant="solid">
          See all skills
        </GlowButton>
        <GlowButton as={Link} to="/contact" variant="outline">
          Work with me
        </GlowButton>
      </div>
    </div>
  );
}
