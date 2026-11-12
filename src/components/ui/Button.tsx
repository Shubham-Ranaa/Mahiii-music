"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-all duration-300 ease-out active:scale-[0.98] select-none focus-visible:ring-2 focus-visible:ring-violet-bright focus-visible:ring-offset-2 focus-visible:ring-offset-void";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet-core to-violet-deep text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-[1.02]",
  outline:
    "border border-white/15 text-ink hover:border-violet-core/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
  ghost: "text-ink-soft hover:text-ink hover:bg-white/[0.04]",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  external,
  className,
  href,
  ...rest
}: ButtonLinkProps) {
  const isHttp = typeof href === "string" && href.startsWith("http");
  const openExternal = external ?? isHttp;

  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(openExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      {/* Background shine effect */}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {children}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {children}
    </button>
  );
}
