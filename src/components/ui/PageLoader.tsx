"use client";

import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const progressObj = useRef({ val: 0 });

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const q = gsap.utils.selector(containerRef);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // ---------------- Initial Setup ----------------
      gsap.set(q("[data-top-curtain], [data-bottom-curtain]"), { yPercent: 0 });
      gsap.set(q("[data-laser-beam]"), { scaleX: 0, opacity: 0 });
      gsap.set(q("[data-aura]"), { scale: 0.3, opacity: 0 });
      gsap.set(q("[data-logo-box]"), { scale: 0.4, rotation: -20, opacity: 0 });
      gsap.set(q("[data-sound-ring]"), { scale: 0.5, rotation: -90, opacity: 0 });
      gsap.set(q("[data-letter]"), { yPercent: 120, opacity: 0, rotateX: -60 });
      gsap.set(q("[data-tagline]"), { y: 18, opacity: 0 });
      gsap.set(q("[data-bars] > span"), { scaleY: 0, opacity: 0 });
      gsap.set(q("[data-footer-meta]"), { opacity: 0, y: 12 });
      gsap.set(q("[data-progress-box]"), { opacity: 0, y: 16 });

      // Subtle initial rack-focus on underlying main content
      const mainContent = document.getElementById("content");
      if (mainContent) {
        gsap.set(mainContent, { scale: 0.97, filter: "blur(6px)" });
      }

      // ---------------- Master Timeline ----------------
      const masterTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setComplete(true);
        },
      });

      // 1. IN ANIMATION (0.0s - 0.75s)
      masterTl
        // Ambient aura bloom
        .to(q("[data-aura]"), {
          scale: 1,
          opacity: 0.85,
          duration: 1.1,
          ease: "expo.out",
        }, 0)
        // Outer sound ring entry + spin loop initiation
        .to(q("[data-sound-ring]"), {
          scale: 1,
          rotation: 0,
          opacity: 0.8,
          duration: 0.9,
          ease: "back.out(1.8)",
        }, 0.08)
        // Logo core spring
        .to(q("[data-logo-box]"), {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.85,
          ease: "elastic.out(1, 0.65)",
        }, 0.12)
        // Staggered letter unmasking for "M A H I I"
        .to(q("[data-letter]"), {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.055,
          duration: 0.75,
          ease: "expo.out",
        }, 0.22)
        // Tagline reveal
        .to(q("[data-tagline]"), {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        }, 0.38)
        // Equalizer wave bars rising
        .to(q("[data-bars] > span"), {
          scaleY: 1,
          opacity: 1,
          stagger: 0.025,
          duration: 0.6,
          ease: "back.out(1.6)",
        }, 0.42)
        // Progress track & status reveal
        .to(q("[data-progress-box], [data-footer-meta]"), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, 0.48);

      // 2. RUNNING COUNTER & SOUNDSTAGE TUNING (0.35s - 2.55s)
      masterTl.to(
        progressObj.current,
        {
          val: 100,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate: () => {
            const currentPct = Math.round(progressObj.current.val);
            if (counterRef.current) {
              counterRef.current.textContent = `${String(currentPct).padStart(2, "0")}%`;
            }
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${currentPct}%`;
            }

            // Real-time stage text update
            if (statusRef.current) {
              if (currentPct < 26) {
                statusRef.current.textContent = "Initializing audio engine...";
              } else if (currentPct < 52) {
                statusRef.current.textContent = "Calibrating 32-bit equalizer...";
              } else if (currentPct < 82) {
                statusRef.current.textContent = "Tuning room synchronization...";
              } else {
                statusRef.current.textContent = "Soundstage synchronized.";
              }
            }
          },
        },
        0.35,
      );

      // Continuous ambient rotation on outer ring
      gsap.to(q("[data-sound-ring]"), {
        rotation: 360,
        repeat: -1,
        duration: 14,
        ease: "none",
      });

      // 3. CONVERGENCE PULSE (2.55s - 2.75s)
      masterTl
        // Logo snap flash
        .to(q("[data-logo-box]"), {
          scale: 1.12,
          filter: "brightness(1.4)",
          duration: 0.18,
          ease: "power2.out",
        }, 2.55)
        .to(q("[data-logo-box]"), {
          scale: 1,
          filter: "brightness(1)",
          duration: 0.18,
          ease: "power2.inOut",
        }, 2.73)
        // Horizon laser seam ignites
        .to(q("[data-laser-beam]"), {
          scaleX: 1,
          opacity: 1,
          duration: 0.22,
          ease: "expo.out",
        }, 2.65);

      // 4. GRAND OUT ANIMATION (2.80s - 3.55s)
      masterTl
        // Center content smoothly elevates, blurs and dissolves
        .to(q("[data-center-content]"), {
          scale: 0.88,
          y: -24,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.5,
          ease: "power2.in",
        }, 2.8)
        // Top curtain glides straight UP
        .to(q("[data-top-curtain]"), {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        }, 2.85)
        // Bottom curtain glides straight DOWN
        .to(q("[data-bottom-curtain]"), {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        }, 2.85)
        // Horizon laser beam flares and dissolves into site
        .to(q("[data-laser-beam]"), {
          scaleY: 6,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        }, 2.9)
        // Rack-focus reveal on page content (#content)
        .to(mainContent, {
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        }, 2.9);

      // Skip action handler
      const skipBtn = containerRef.current.querySelector("[data-skip-btn]");
      const onSkipClick = () => {
        masterTl.time(2.75); // Jump straight to exit split
      };
      skipBtn?.addEventListener("click", onSkipClick);

      return () => {
        skipBtn?.removeEventListener("click", onSkipClick);
        masterTl.kill();
        document.body.style.overflow = originalOverflow;
      };
    },
    { scope: containerRef },
  );

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Loading MAHII"
      className="fixed inset-0 z-[999] select-none pointer-events-auto overflow-hidden"
    >
      {/* ---------------- Top Curtain (Slides UP on OUT) ---------------- */}
      <div
        data-top-curtain
        className="absolute inset-x-0 top-0 h-1/2 bg-[#08080c] z-10 will-change-transform shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
      />

      {/* ---------------- Bottom Curtain (Slides DOWN on OUT) ---------------- */}
      <div
        data-bottom-curtain
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#08080c] z-10 will-change-transform shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      />

      {/* ---------------- Horizon Laser Beam Seam ---------------- */}
      <div
        data-laser-beam
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2.5px] z-30 will-change-transform origin-center shadow-[0_0_35px_#c4b5fd,0_0_70px_#a855f7]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #a855f7 25%, #c4b5fd 45%, #ffffff 50%, #c4b5fd 55%, #a855f7 75%, transparent 100%)",
        }}
      />

      {/* ---------------- Center Content Canvas ---------------- */}
      <div
        data-center-content
        className="relative z-20 flex h-full w-full flex-col items-center justify-center will-change-transform"
      >
        {/* Background radial glow aura */}
        <div
          data-aura
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div
            className="h-[65vh] w-[65vh] rounded-full blur-[130px]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.38) 0%, rgba(124,58,237,0.14) 50%, transparent 75%)",
            }}
          />
        </div>

        {/* Top Bar with Skip */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-violet-core animate-ping-slow" />
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted uppercase">
              Android Audio Experience
            </span>
          </div>

          <button
            type="button"
            data-skip-btn
            className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[0.6875rem] text-ink-muted hover:border-violet-core/50 hover:bg-white/[0.08] hover:text-ink transition-colors"
          >
            Skip ↗
          </button>
        </div>

        {/* Brand Emblem & Typography */}
        <div className="flex flex-col items-center text-center px-4">
          {/* Animated Logo Mark Unit */}
          <div className="relative mb-8 grid place-items-center">
            {/* Outer rotating dashed sound-ring */}
            <div
              data-sound-ring
              aria-hidden
              className="absolute -inset-7 rounded-full border border-violet-core/35 border-dashed"
            />

            {/* Concentric pulsing radar ripple */}
            <div
              aria-hidden
              className="absolute -inset-3.5 rounded-2xl border border-lavender/30 animate-ping-slow"
            />

            {/* Core Box */}
            <div
              data-logo-box
              className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-core via-violet-deep to-[#4c1d95] shadow-[0_0_50px_rgba(168,85,247,0.7)] ring-1 ring-white/30"
            >
              <span className="relative h-4 w-4 rounded-full bg-void shadow-inner" />
            </div>
          </div>

          {/* Letter-by-Letter Masked Reveal */}
          <div className="overflow-hidden mb-2">
            <h1 className="flex items-center gap-2 text-4xl sm:text-5xl font-extrabold tracking-[0.24em] text-ink">
              {["M", "A", "H", "I", "I"].map((letter, i) => (
                <span
                  key={i}
                  data-letter
                  className="inline-block will-change-transform"
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <p
            data-tagline
            className="text-sm sm:text-base font-medium tracking-tight text-violet-gradient mb-8"
          >
            Music. Memories. Together.
          </p>

          {/* Frequency Equalizer Bars */}
          <div
            data-bars
            className="flex h-8 items-end gap-[3px] mb-8"
            aria-hidden
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-gradient-to-t from-violet-deep via-violet-core to-lavender origin-bottom"
                style={{
                  height: `${25 + Math.abs(Math.sin(i * 0.7)) * 75}%`,
                  animation: `wave-pulse ${0.85 + (i % 6) * 0.15}s ease-in-out ${(i % 8) * 0.07}s infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Precision Odometer Counter & Progress Track */}
          <div data-progress-box className="w-64 max-w-xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span
                ref={statusRef}
                className="font-mono text-[0.6875rem] text-ink-muted"
              >
                Initializing audio engine...
              </span>
              <span
                ref={counterRef}
                className="font-mono text-xs font-semibold tabular-nums text-lavender"
              >
                00%
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[0.5px]">
              <div
                ref={progressFillRef}
                className="h-full w-0 rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender shadow-[0_0_15px_rgba(168,85,247,0.95)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Craft Note */}
        <div
          data-footer-meta
          className="absolute bottom-6 flex items-center gap-2 text-[0.6875rem] text-ink-muted"
        >
          <Sparkles size={12} className="text-violet-core" />
          <span>Crafted by Harsh · v2.4 Beta</span>
        </div>
      </div>
    </div>
  );
}
