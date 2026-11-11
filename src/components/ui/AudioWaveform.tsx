"use client";

import { cn } from "@/lib/utils";

/**
 * Animated audio waveform.
 * Pure CSS keyframes on transform only — no JS loop, no layout thrash.
 * Bars are seeded deterministically so SSR and client markup match.
 */
export function AudioWaveform({
  bars = 48,
  className,
  height = 120,
  tone = "violet",
  animated = true,
}: {
  bars?: number;
  className?: string;
  height?: number;
  tone?: "violet" | "soft";
  animated?: boolean;
}) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const wave =
      Math.sin(i * 0.42) * 0.34 +
      Math.sin(i * 0.17 + 1.2) * 0.3 +
      Math.sin(i * 0.91 + 2.4) * 0.18;
    return 0.18 + Math.abs(wave) * 0.82;
  });

  return (
    <div
      aria-hidden
      className={cn("flex w-full items-center justify-between", className)}
      style={{ height }}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-[2px] shrink-0 rounded-full origin-center",
            tone === "violet"
              ? "bg-gradient-to-t from-violet-deep/40 via-violet-core/80 to-lavender/90"
              : "bg-white/25",
          )}
          style={{
            height: `${Math.round(h * 100)}%`,
            animation: animated
              ? `wave-pulse ${1.6 + (i % 7) * 0.22}s ease-in-out ${(i % 11) * 0.09}s infinite alternate`
              : undefined,
            transform: animated ? undefined : `scaleY(${h})`,
          }}
        />
      ))}
    </div>
  );
}
