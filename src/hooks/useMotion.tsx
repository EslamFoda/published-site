// hooks/useMotion.ts
import {
  motion,
  MotionValue,
  SpringOptions,
  useScroll,
  UseScrollOptions,
  useSpring,
  AnimatePresence,
  AnimatePresenceProps,
} from "framer-motion";
import { FunctionComponent, PropsWithChildren } from "react";

// Define the return type of the hook
interface UseMotionReturn {
  motion: typeof motion;
  useScroll({
    container,
    target,
    layoutEffect,
    ...options
  }?: UseScrollOptions): {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
  };
  useSpring(
    source: MotionValue<string> | MotionValue<number> | number,
    config?: SpringOptions
  ): MotionValue<number>;
  AnimatePresence: FunctionComponent<PropsWithChildren<AnimatePresenceProps>>;
}

// Create the custom hook
export function useMotion(): UseMotionReturn {
  return {
    motion,
    useScroll,
    useSpring,
    AnimatePresence,
  };
}
