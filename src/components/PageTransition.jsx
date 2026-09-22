import { motion, useReducedMotion } from "framer-motion";

// Pages zoom in as they arrive and drift outward as they leave.
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  const zoom = reduce ? 1 : undefined;
  return (
    <motion.div
      initial={{ opacity: 0, scale: zoom ?? 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: zoom ?? 1.05, y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "50% 30%" }}
    >
      {children}
    </motion.div>
  );
}
