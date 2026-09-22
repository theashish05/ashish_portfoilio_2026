import { useEffect, useState } from "react";

/**
 * Determines whether the current device should receive the full
 * 3D / heavy-animation experience, or a lighter fallback.
 */
export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    isMobile: false,
    prefersReducedMotion: false,
    canRender3D: true,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const evaluate = () => {
      const isMobile = mq.matches;
      const prefersReducedMotion = reducedMq.matches;
      const lowConcurrency =
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency <= 4;

      setCapability({
        isMobile,
        prefersReducedMotion,
        canRender3D:
          !prefersReducedMotion && !(isMobile && coarsePointer.matches && lowConcurrency),
      });
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    reducedMq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      reducedMq.removeEventListener("change", evaluate);
    };
  }, []);

  return capability;
}
