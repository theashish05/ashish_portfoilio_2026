import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { meta } from "../data/content";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { cardSamples } from "../components/cards/CardSamples";

export default function Cards() {
  useEffect(() => {
    document.title = `Card Templates | ${meta.title}`;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-32 pb-24">
      <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted hover:text-spark transition-colors mb-8">
        <FaArrowLeft size={11} /> Back to portfolio
      </Link>

      <PageHeader eyebrow="UI kit" title="Card templates">
        Ten live React components — every card below is a working component with its own effect. Hover, move your
        cursor, or tap them.
      </PageHeader>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mt-16" style={{ perspective: 1400 }}>
        {cardSamples.map(({ key, label, effect, Comp }, i) => (
          <Reveal key={key} delay={(i % 3) * 0.08} as="figure">
            <div className="h-[400px]">
              <Comp />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-3">
              <span className="font-display text-text">{label}</span>
              <span className="font-mono text-[11px] text-faint text-right">{effect}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
