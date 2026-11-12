import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium Android phone frame.
 *
 * Everything inside is a CSS/HTML mockup built for this site — these are
 * interface reconstructions, not captured screenshots of the shipped app.
 */
export function PhoneMockup({
  children,
  className,
  width = 300,
  glow = true,
  label,
}: {
  children: ReactNode;
  className?: string;
  width?: number;
  glow?: boolean;
  label?: string;
}) {
  return (
    <div
      className={cn("relative", className)}
      // A definite width is required: with `width: 100%` inside a shrink-to-fit
      // parent the mockup collapsed to the width of its own label text and the
      // screen content overflowed the frame.
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-20 -z-10 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, rgba(168,85,247,0.45) 0%, rgba(124,58,237,0.2) 45%, transparent 72%)",
            animation: "drift-glow 18s ease-in-out infinite",
          }}
        />
      )}

      {/* Frame */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#3d3d4a] via-[#15151c] to-[#2c2c36] p-[3px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.07)] transition-shadow duration-500">
        <div className="rounded-[2.35rem] bg-[#0a0a0f] p-[7px]">
          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.95rem] bg-void">
            {/* Punch-hole camera */}
            <div
              aria-hidden
              className="absolute left-1/2 top-2 z-20 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
            />
            {/* Screen */}
            <div className="absolute inset-0">{children}</div>
            {/* Glass reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[1.95rem] transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(128deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 15%, transparent 40%, transparent 75%, rgba(255,255,255,0.03) 100%)",
              }}
            />
            {/* Subtle inner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 rounded-[1.95rem] opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 30%, rgba(168,85,247,0.5) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>

        {/* Side buttons */}
        <span
          aria-hidden
          className="absolute -right-[3px] top-[22%] h-14 w-[3px] rounded-r bg-gradient-to-b from-[#3d3d4a] to-[#1c1c24]"
        />
        <span
          aria-hidden
          className="absolute -right-[3px] top-[38%] h-9 w-[3px] rounded-r bg-gradient-to-b from-[#3d3d4a] to-[#1c1c24]"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[26%] h-10 w-[3px] rounded-l bg-gradient-to-b from-[#3d3d4a] to-[#1c1c24]"
        />
      </div>

      {label && (
        <p className="mt-4 text-center text-[0.625rem] uppercase tracking-[0.22em] text-ink-muted">
          {label}
        </p>
      )}
    </div>
  );
}
