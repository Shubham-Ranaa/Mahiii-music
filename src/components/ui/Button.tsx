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
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.985] select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-void hover:bg-white shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset]",
  outline:
    "border border-white/15 text-ink hover:border-white/35 hover:bg-white/[0.04]",
  ghost: "text-ink-soft hover:text-ink",
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
