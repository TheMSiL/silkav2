import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-[0.6em] whitespace-nowrap font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-surface hover:bg-accent hover:text-accent-fg active:translate-y-px",
  secondary:
    "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-surface active:translate-y-px",
  accent: "bg-accent text-accent-fg hover:brightness-110 active:translate-y-px",
  ghost: "text-fg hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Appends a trailing arrow that animates on hover. */
  arrow?: "right" | "up-right" | false;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

function Inner({ children, arrow }: Pick<CommonProps, "children" | "arrow">) {
  return (
    <>
      <span>{children}</span>
      {arrow === "right" ? (
        <ArrowRight className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
      ) : null}
      {arrow === "up-right" ? (
        <ArrowUpRight className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps | AnchorProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    arrow = false,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, external, ...anchorRest } = rest as AnchorProps & Record<string, unknown>;
    if (external) {
      return (
        <a
          {...anchorRest}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
          data-cursor="explore"
        >
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link {...anchorRest} href={href} className={classes} data-cursor="explore">
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes} data-cursor="explore">
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
