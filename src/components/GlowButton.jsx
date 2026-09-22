import { forwardRef } from "react";
import { motion } from "framer-motion";

const base =
  "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide overflow-hidden transition-colors duration-300 select-none";

const variants = {
  solid: "bg-spark text-ink hover:bg-spark-dim",
  outline: "border border-line text-text hover:border-spark hover:text-spark",
};

const GlowButton = forwardRef(function GlowButton(
  { as: Comp = "button", variant = "solid", className = "", children, ...props },
  ref
) {
  const MotionComp = motion.create ? motion.create(Comp) : motion(Comp);
  return (
    <MotionComp
      ref={ref}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionComp>
  );
});

export default GlowButton;
