"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

interface MagneticProps {
  children: ReactNode;
  /** Pull radius in pixels beyond the element bounds. */
  radius?: number;
  /** 0–1: how far the element travels toward the pointer. */
  strength?: number;
  className?: string;
}

/**
 * Wraps a target so it drifts toward the pointer while hovered.
 * Pointer-fine only: on touch it renders as a plain wrapper, and it is inert
 * under prefers-reduced-motion.
 */
export function Magnetic({ children, radius = 24, strength = 0.32, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  if (reduced) return <span className={className}>{children}</span>;

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    const max = Math.max(rect.width, rect.height) / 2 + radius;
    x.set(Math.max(-max, Math.min(max, offsetX)) * strength);
    y.set(Math.max(-max, Math.min(max, offsetY)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
