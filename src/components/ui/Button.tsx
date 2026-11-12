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
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out active:scale-[0.985] select-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-void";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-void hover:bg-white hover:shadow-[0_14px_30px_-18px_rgba(255,255,255,0.22)]",
  outline:
    "border border-white/15 text-ink hover:border-white/35 hover:bg-white/[0.04] hover:shadow-[0_12px_28px_-18px_rgba(255,255,255,0.18)]",
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
      {children}
    </button>
  );
}
