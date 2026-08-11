"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /** Slight counter-scale so the image settles rather than snapping. */
  scaleFrom?: number;
  delay?: number;
}

/**
 * Clip-path reveal with a counter-scaling image inside. Under reduced motion
 * the image is simply present.
 */
export function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 90,
  scaleFrom = 1.08,
  delay = 0,
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  // Reserve the box before the image loads. Without this the lazy gallery
  // images shift everything below them as they arrive.
  const ratio = { aspectRatio: `${width} / ${height}` };

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("h-full w-full object-cover object-top", imageClassName)}
    />
  );

  if (reduced) {
    return (
      <div className={cn("overflow-hidden", className)} style={ratio}>
        {image}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      style={ratio}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: scaleFrom }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {image}
      </motion.div>
    </motion.div>
  );
}
