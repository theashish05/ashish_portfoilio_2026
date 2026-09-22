import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, children }) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-spark mb-4">{eyebrow}</p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text">{title}</h1>
      <div className="h-px w-24 bg-gradient-to-r from-spark to-transparent mt-6" />
      {children && <p className="text-muted mt-6 max-w-2xl leading-relaxed">{children}</p>}
    </Reveal>
  );
}
