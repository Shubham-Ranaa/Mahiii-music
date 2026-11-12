"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const [stage, setStage] = useState<"enter" | "active" | "flashing" | "exiting" | "done">("enter");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Calibrating audio core...");
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Lock scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Trigger entrance animation immediately on next frame
    const enterTimer = setTimeout(() => {
      setStage("active");
    }, 60);

    // Progress counter animating smoothly from 0 to 100 over ~2.6 seconds
    const duration = 2600;
    const intervalTime = 25;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 28) {
        setStatusText("Initializing audio engine...");
      } else if (pct < 55) {
        setStatusText("Calibrating 32-bit equalizer...");
      } else if (pct < 84) {
        setStatusText("Tuning room synchronization...");
      } else {
        setStatusText("Soundstage synchronized. Welcome.");
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        // Stage 1: Quick 100% pulse flash
        setStage("flashing");

        setTimeout(() => {
          // Stage 2: Dual Curtain cinematic split opening
          setStage("exiting");
          document.body.style.overflow = originalOverflow;

          // Stage 3: Complete unmount
          setTimeout(() => {
            setStage("done");
          }, 850);
        }, 220);
      }
    }, intervalTime);

    return () => {
      clearTimeout(enterTimer);
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSkip = () => {
    setStage("exiting");
    document.body.style.overflow = "";
    setTimeout(() => setStage("done"), 600);
  };

  if (stage === "done") return null;

  const isEntering = stage === "enter";
  const isFlashing = stage === "flashing";
  const isExiting = stage === "exiting";

  return (
    <div
      aria-label="Loading MAHII"
      className={cn(
        "fixed inset-0 z-[999] select-none pointer-events-auto",
        isExiting && "pointer-events-none",
      )}
    >
      {/* ---------------- Split Curtains (Top & Bottom halves) ---------------- */}
      {/* Top Curtain */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-[#08080c] z-10 transition-transform duration-800",
          isExiting ? "-translate-y-full" : "translate-y-0",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
          boxShadow: isExiting ? "0 25px 60px rgba(0,0,0,0.9)" : "none",
        }}
      />

      {/* Bottom Curtain */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 bg-[#08080c] z-10 transition-transform duration-800",
          isExiting ? "translate-y-full" : "translate-y-0",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
          boxShadow: isExiting ? "0 -25px 60px rgba(0,0,0,0.9)" : "none",
        }}
      />

      {/* Horizon Laser Beam (Lights up on exit split) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] z-30 transition-all duration-700",
          isFlashing
            ? "opacity-100 scale-x-100 shadow-[0_0_30px_#c4b5fd,0_0_60px_#a855f7]"
            : isExiting
              ? "opacity-0 scale-x-110"
              : "opacity-0 scale-x-0",
        )}
        style={{
          background: "linear-gradient(90deg, transparent 0%, #c4b5fd 40%, #ffffff 50%, #c4b5fd 60%, transparent 100%)",
        }}
      />

      {/* ---------------- Main Content Stage ---------------- */}
      <div
        className={cn(
          "relative z-20 flex h-full w-full flex-col items-center justify-center transition-all duration-700",
          isEntering && "opacity-0 scale-95",
          isFlashing && "scale-[1.02] filter brightness-125",
          isExiting && "opacity-0 scale-90 blur-sm -translate-y-4",
        )}
      >
        {/* Background radial glow aura */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 h-[65vh] w-[65vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-all duration-1000",
              isEntering ? "scale-50 opacity-0" : "scale-100 opacity-80 animate-pulse-subtle",
            )}
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.38) 0%, rgba(124,58,237,0.14) 50%, transparent 75%)",
            }}
          />
        </div>

        {/* Top Bar with Skip */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-700 delay-100",
              isEntering ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0",
            )}
          >
            <span className="flex h-2 w-2 rounded-full bg-violet-core animate-ping-slow" />
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted uppercase">
              Android Audio
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className={cn(
              "rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[0.6875rem] text-ink-muted hover:border-violet-core/50 hover:bg-white/[0.08] hover:text-ink transition-all duration-500 delay-150",
              isEntering ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0",
            )}
          >
            Skip ↗
          </button>
        </div>

        {/* Central Brand Unit */}
        <div className="flex flex-col items-center text-center px-4">
          {/* Animated Logo Mark with Staggered Entrance */}
          <div
            className={cn(
              "relative mb-8 grid place-items-center transition-all duration-800",
              isEntering ? "opacity-0 scale-50 rotate-[-15deg]" : "opacity-100 scale-100 rotate-0",
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Outer rotating dashed sound-ring */}
            <div
              aria-hidden
              className={cn(
                "absolute -inset-7 rounded-full border border-violet-core/35 border-dashed animate-spin-slow transition-opacity duration-1000",
                isEntering ? "opacity-0" : "opacity-75",
              )}
            />

            {/* Concentric pulsing radar waves */}
            <div
              aria-hidden
              className="absolute -inset-3.5 rounded-2xl border border-lavender/30 animate-ping-slow"
            />

            {/* Core Box */}
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-core via-violet-deep to-[#4c1d95] shadow-[0_0_50px_rgba(168,85,247,0.7)] ring-1 ring-white/30">
              <span className="relative h-4 w-4 rounded-full bg-void shadow-inner" />
            </div>
          </div>

          {/* Staggered Letter Reveal for MAHII */}
          <div className="overflow-hidden mb-2">
            <h1 className="flex items-center gap-2 text-4xl sm:text-5xl font-extrabold tracking-[0.24em] text-ink">
              {["M", "A", "H", "I", "I"].map((letter, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-block transition-all duration-700",
                    isEntering ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
                  )}
                  style={{
                    transitionDelay: `${150 + i * 55}ms`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <p
            className={cn(
              "text-sm sm:text-base font-medium tracking-tight text-violet-gradient mb-8 transition-all duration-700 delay-300",
              isEntering ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0",
            )}
          >
            Music. Memories. Together.
          </p>

          {/* Equalizer Waveform Bars with Rising Entrance */}
          <div
            className={cn(
              "flex h-8 items-end gap-[3px] mb-8 transition-all duration-700 delay-350",
              isEntering ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100",
            )}
            aria-hidden
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-gradient-to-t from-violet-deep via-violet-core to-lavender origin-bottom transition-all duration-300"
                style={{
                  height: `${25 + Math.abs(Math.sin((i + progress * 0.12) * 0.75)) * 75}%`,
                  animation: `wave-pulse ${0.85 + (i % 6) * 0.15}s ease-in-out ${(i % 8) * 0.07}s infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Numeric Counter & Progress Bar */}
          <div
            className={cn(
              "w-64 max-w-xs space-y-2.5 transition-all duration-700 delay-400",
              isEntering ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
            )}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[0.6875rem] text-ink-muted">
                {statusText}
              </span>
              <span className="font-mono text-xs font-semibold tabular-nums text-lavender">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[0.5px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender shadow-[0_0_15px_rgba(168,85,247,0.95)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Craft Note */}
        <div
          className={cn(
            "absolute bottom-6 flex items-center gap-2 text-[0.6875rem] text-ink-muted transition-all duration-700 delay-500",
            isEntering ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0",
          )}
        >
          <Sparkles size={12} className="text-violet-core" />
          <span>Crafted by Harsh · v2.4 Beta</span>
        </div>
      </div>
    </div>
  );
}
