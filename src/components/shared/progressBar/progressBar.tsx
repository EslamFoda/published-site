import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";
import React from "react";

function ProgressBar() {
  const progressBarClassNames = cn(
    "h-1 bg-primary fixed left-0 top-0 right-0  pointer-events-none"
  );
  const { motion, useScroll, useSpring } = useMotion();
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <motion.div
      className={progressBarClassNames}
      style={{
        scaleX: springProgress,
        transformOrigin: "left",
        zIndex: 97,
      }}
    />
  );
}

export default ProgressBar;
