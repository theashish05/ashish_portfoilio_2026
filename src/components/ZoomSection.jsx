import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked zoom: as a section scrolls up into view it zooms in from a
 * slightly smaller size; as it leaves it drifts a touch larger. Because it is
 * tied to scroll position (not a one-shot animation), swiping back up plays
 * it in reverse — zoom in going down, zoom out going up.
 */
export default function ZoomSection({ children, className = "", from = 0.88, to = 1.05, as = "section", ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [from, 1, 1, to]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const Comp = motion[as] || motion.section;

  return (
    <Comp
      ref={ref}
      style={reduce ? undefined : { scale, opacity, y, willChange: "transform, opacity" }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
