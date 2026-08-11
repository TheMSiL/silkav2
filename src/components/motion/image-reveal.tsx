import Image from "next/image";
import type { CSSProperties } from "react";
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
  delay?: number;
}

/**
 * Clip-path reveal with a counter-scaling image inside, so the picture settles
 * rather than snapping. CSS-driven — see `Reveal`.
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
  delay = 0,
}: ImageRevealProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      data-reveal="image"
      // Reserve the box before the image loads. Without this the lazy gallery
      // images shift everything below them as they arrive.
      style={{ aspectRatio: `${width} / ${height}`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      <div className="h-full w-full">
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
      </div>
    </div>
  );
}
