"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  intent?: "default" | "violet" | "emerald" | "amber" | "rose";
};

export function SpotlightCard({
  children,
  className,
  intent = "default",
}: SpotlightCardProps) {
  const borderColors: Record<string, string> = {
    default: "border-white/[0.06]",
    violet: "border-violet-core/30",
    emerald: "border-emerald-400/30",
    amber: "border-amber-400/30",
    rose: "border-rose-400/30",
  };

  const bgColors: Record<string, string> = {
    default: "bg-white/[0.02]",
    violet: "bg-violet-core/[0.04]",
    emerald: "bg-emerald-400/[0.04]",
    amber: "bg-amber-400/[0.04]",
    rose: "bg-rose-400/[0.04]",
  };

  const glowShadows: Record<string, string> = {
    default: "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]",
    violet: "shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)]",
    emerald: "shadow-[0_10px_30px_-10px_rgba(52,211,153,0.3)]",
    amber: "shadow-[0_10px_30px_-10px_rgba(251,191,36,0.3)]",
    rose: "shadow-[0_10px_30px_-10px_rgba(244,114,182,0.3)]",
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-backdrop-blur-sm backdrop-blur-md transition-all duration-400",
        borderColors[intent],
        bgColors[intent],
        glowShadows[intent],
        className,
      )}
    >
      {children}
    </div>
  );
}
