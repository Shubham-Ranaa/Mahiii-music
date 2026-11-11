import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Realistic Android phone frame.
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
      style={{ width: "100%", maxWidth: `${width}px` }}
    >
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, rgba(168,85,247,0.42) 0%, rgba(124,58,237,0.16) 45%, transparent 72%)",
          }}
        />
      ) : null}

      {/* frame */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#3a3a46] via-[#14141b] to-[#2a2a34] p-[3px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.07)]">
        <div className="rounded-[2.35rem] bg-[#0a0a0f] p-[7px]">
          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.95rem] bg-void">
            {/* punch-hole camera */}
            <div
              aria-hidden
              className="absolute left-1/2 top-2 z-20 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
            />
            {/* screen */}
            <div className="absolute inset-0">{children}</div>
            {/* glass reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[1.95rem]"
              style={{
                background:
                  "linear-gradient(128deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 18%, transparent 42%, transparent 78%, rgba(255,255,255,0.035) 100%)",
              }}
            />
          </div>
        </div>

        {/* side buttons */}
        <span
          aria-hidden
          className="absolute -right-[3px] top-[22%] h-14 w-[3px] rounded-r bg-gradient-to-b from-[#3a3a46] to-[#1c1c24]"
        />
        <span
          aria-hidden
          className="absolute -right-[3px] top-[38%] h-9 w-[3px] rounded-r bg-gradient-to-b from-[#3a3a46] to-[#1c1c24]"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[26%] h-10 w-[3px] rounded-l bg-gradient-to-b from-[#3a3a46] to-[#1c1c24]"
        />
      </div>

      {label ? (
        <p className="mt-4 text-center text-[0.625rem] uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}
