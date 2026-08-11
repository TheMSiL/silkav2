import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `wide` removes the reading-width cap used by editorial blocks. */
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  narrow: "max-w-[52rem]",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-none",
} as const;

export function Container({ children, className, as: Tag = "div", size = "default" }: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-[var(--container-pad)]", sizes[size], className)}
    >
      {children}
    </Tag>
  );
}
