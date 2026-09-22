export default function HeroFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-spark/30 via-pulse/20 to-glow/20 blur-2xl animate-pulse-slow" />
      <div className="relative h-40 w-40 sm:h-52 sm:w-52 rounded-3xl border border-line/80 glass rotate-12 animate-float" />
      <div className="absolute h-28 w-28 sm:h-36 sm:w-36 rounded-2xl border border-spark/40 -rotate-12 animate-float [animation-delay:1.2s]" />
    </div>
  );
}
