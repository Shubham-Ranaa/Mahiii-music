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
      gsap.set(q("[data-top-curtain], [data-bottom-curtain]"), {
        yPercent: 0,
        opacity: 1,
      });
      gsap.set(q("[data-laser-beam]"), { scaleX: 0, opacity: 0, scaleY: 1 });
      gsap.set(q("[data-aura]"), { scale: 0.2, opacity: 0 });
      gsap.set(q("[data-logo-ring]"), { scale: 0.3, rotation: -120, opacity: 0 });
      gsap.set(q("[data-logo-pulse]"), { scale: 0.5, opacity: 0 });
      gsap.set(q("[data-logo-box]"), { scale: 0.3, rotation: -30, opacity: 0 });
      gsap.set(q("[data-logo-inner]"), { scale: 0.6, opacity: 0 });
      gsap.set(q("[data-letter]"), { yPercent: 150, opacity: 0, rotateX: -80 });
      gsap.set(q("[data-tagline]"), { y: 20, opacity: 0, filter: "blur(4px)" });
      gsap.set(q("[data-bars] > span"), { scaleY: 0, opacity: 0 });
      gsap.set(q("[data-progress-container]"), { opacity: 0, y: 16 });
      gsap.set(q("[data-footer-meta]"), { opacity: 0, y: 12, filter: "blur(4px)" });

      // Subtle initial rack-focus on underlying main content
      const mainContent = document.getElementById("content");
      if (mainContent) {
        gsap.set(mainContent, { scale: 0.96, filter: "blur(8px)", opacity: 0.7 });
      }

      // ---------------- Master Timeline ----------------
      const masterTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setComplete(true);
        },
      });

      // ========================================
      // 1. IN ANIMATION (0.0s - 1.0s)
      // ========================================
      masterTl
        // Deep ambient aura bloom from center
        .to(q("[data-aura]"), {
          scale: 1,
          opacity: 0.9,
          duration: 1.3,
          ease: "expo.out",
        }, 0)
        // Outer ring rotation entry - dramatic spin
        .to(q("[data-logo-ring]"), {
          scale: 1,
          rotation: 0,
          opacity: 0.7,
          duration: 1.1,
          ease: "back.out(2.2)",
        }, 0.05)
        // Concentric pulse ripple
        .to(q("[data-logo-pulse]"), {
          scale: 1,
          opacity: 0.6,
          duration: 0.8,
          ease: "power2.out",
        }, 0.12)
        // Core logo box - elastic spring
        .to(q("[data-logo-box]"), {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          ease: "elastic.out(1.2, 0.6)",
        }, 0.18)
        // Inner dot
        .to(q("[data-logo-inner]"), {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }, 0.35)
        // Staggered letter reveal - dramatic 3D flip
        .to(q("[data-letter]"), {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.07,
          duration: 0.85,
          ease: "expo.out",
        }, 0.28)
        // Tagline - smooth slide up with blur release
        .to(q("[data-tagline]"), {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        }, 0.45)
        // Equalizer bars - rapid rise
        .to(q("[data-bars] > span"), {
          scaleY: 1,
          opacity: 1,
          stagger: 0.02,
          duration: 0.5,
          ease: "back.out(2)",
        }, 0.52)
        // Progress section fades in
        .to(q("[data-progress-container], [data-footer-meta]"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        }, 0.58);

      // ========================================
      // 2. RUNNING COUNTER (0.4s - 2.8s)
      // ========================================
      masterTl.to(
        progressObj.current,
        {
          val: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const currentPct = Math.round(progressObj.current.val);
            if (counterRef.current) {
              counterRef.current.textContent = `${String(currentPct).padStart(2, "0")}%`;
            }
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${currentPct}%`;
            }

            // Dynamic status messages
            if (statusRef.current) {
              if (currentPct < 20) {
                statusRef.current.textContent = "Initializing audio engine...";
              } else if (currentPct < 40) {
                statusRef.current.textContent = "Calibrating 32-bit equalizer...";
              } else if (currentPct < 60) {
                statusRef.current.textContent = "Loading sound library...";
              } else if (currentPct < 80) {
                statusRef.current.textContent = "Tuning room synchronization...";
              } else {
                statusRef.current.textContent = "Soundstage synchronized.";
              }
            }
          },
        },
        0.4,
      );

      // Continuous ambient rotation on outer ring (starts after entry)
      gsap.to(q("[data-logo-ring]"), {
        rotation: 360,
        repeat: -1,
        duration: 16,
        ease: "none",
        delay: 0.3,
      });

      // Subtle pulse on logo after entry
      gsap.to(q("[data-logo-box]"), {
        scale: 1.03,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // ========================================
      // 3. CONVERGENCE PULSE (2.7s - 2.95s)
      // ========================================
      masterTl
        // Dramatic logo flash - quick punch
        .to(q("[data-logo-box]"), {
          scale: 1.15,
          filter: "brightness(1.5) saturate(1.3)",
          duration: 0.12,
          ease: "power2.out",
        }, 2.7)
        .to(q("[data-logo-box]"), {
          scale: 1,
          filter: "brightness(1) saturate(1)",
          duration: 0.15,
          ease: "power2.inOut",
        }, 2.85)
        // Ring flare
        .to(q("[data-logo-ring]"), {
          opacity: 1,
          scale: 1.1,
          duration: 0.1,
          ease: "power2.out",
        }, 2.75)
        .to(q("[data-logo-ring]"), {
          opacity: 0.7,
          scale: 1,
          duration: 0.15,
          ease: "power2.inOut",
        }, 2.9)
        // Laser beam ignites
        .to(q("[data-laser-beam]"), {
          scaleX: 1,
          opacity: 1,
          duration: 0.18,
          ease: "expo.out",
        }, 2.72);

      // ========================================
      // 4. GRAND OUT ANIMATION (2.9s - 3.8s)
      // ========================================
      masterTl
        // Center content lifts and fades with scale
        .to(q("[data-center-content]"), {
          scale: 0.85,
          y: -30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.55,
          ease: "power2.in",
        }, 2.95)
        // Cornea outward effect - main content sharpens and scales up
        .to(mainContent, {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }, 3.0)
        // Top curtain - fast slide UP with overshoot
        .to(q("[data-top-curtain]"), {
          yPercent: -100,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        }, 3.0)
        // Bottom curtain - fast slide DOWN with overshoot
        .to(q("[data-bottom-curtain]"), {
          yPercent: 100,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        }, 3.0)
        // Laser beam expands and fades
        .to(q("[data-laser-beam]"), {
          scaleX: 2.5,
          scaleY: 4,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        }, 2.98)
        // Final ambient pulse on ring before complete
        .to(q("[data-logo-ring]"), {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        }, 3.5);

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
      {/* ---------------- Top Curtain ---------------- */}
      <div
        data-top-curtain
        className="absolute inset-x-0 top-0 h-1/2 bg-[#08080c] z-10 will-change-transform shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
      />

      {/* ---------------- Bottom Curtain ---------------- */}
      <div
        data-bottom-curtain
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#08080c] z-10 will-change-transform shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      />

      {/* ---------------- Horizon Laser Beam Seam ---------------- */}
      <div
        data-laser-beam
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] z-30 will-change-transform origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #a855f7 20%, #c4b5fd 40%, #ffffff 50%, #c4b5fd 60%, #a855f7 80%, transparent 100%)",
          boxShadow: "0 0 40px #a855f7, 0 0 80px #c4b5fd",
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
            className="h-[70vh] w-[70vh] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.4) 0%, rgba(124,58,237,0.18) 45%, transparent 75%)",
            }}
          />
          {/* Secondary softer glow */}
          <div
            className="absolute h-[50vh] w-[50vh] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.2) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Top Bar with Skip */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet-core opacity-75 animate-ping-slow" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-core" />
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.22em] text-ink-muted uppercase">
              Android Audio Experience
            </span>
          </div>

          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.6875rem] text-ink-muted hover:border-violet-core/50 hover:bg-white/[0.08] hover:text-ink transition-all duration-300"
          >
            Skip ↗
          </button>
        </div>

        {/* Brand Emblem & Typography */}
        <div className="flex flex-col items-center text-center px-4">
          {/* Animated Logo Mark Unit */}
          <div className="relative mb-10 grid place-items-center">
            {/* Outer rotating dashed sound-ring */}
            <div
              data-logo-ring
              aria-hidden
              className="absolute -inset-8 rounded-full border-[3px] border-violet-core/30 border-dashed will-change-transform"
            />

            {/* Secondary ring */}
            <div
              data-logo-ring
              aria-hidden
              className="absolute -inset-5 rounded-full border border-lavender/20 will-change-transform"
              style={{
                borderStyle: "solid",
                borderColor: "rgba(196, 181, 253, 0.15)",
              }}
            />

            {/* Concentric pulsing radar ripple */}
            <div
              data-logo-pulse
              aria-hidden
              className="absolute -inset-4 rounded-2xl border border-lavender/30 animate-ping-slow"
            />

            {/* Core Box */}
            <div
              data-logo-box
              className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-core via-violet-deep to-[#4c1d95] shadow-[0_0_60px_rgba(168,85,247,0.8)] ring-1 ring-white/30 will-change-transform"
            >
              <span className="relative h-4 w-4 rounded-full bg-void shadow-inner ring-1 ring-white/40" />
            </div>
          </div>

          {/* Letter-by-Letter Masked Reveal */}
          <div className="overflow-hidden mb-3">
            <h1 className="flex items-center gap-2.5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.28em] text-ink will-change-transform">
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
            className="text-sm sm:text-base font-medium tracking-tight text-violet-gradient mb-10"
          >
            Music. Memories. Together.
          </p>

          {/* Frequency Equalizer Bars */}
          <div
            data-bars
            className="flex h-10 items-end gap-[4px] mb-10"
            aria-hidden
          >
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-violet-deep via-violet-core to-lavender origin-bottom will-change-transform"
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.65)) * 80}%`,
                  animation: `wave-pulse ${0.7 + (i % 7) * 0.12}s ease-in-out ${(i % 9) * 0.05}s infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Precision Odometer Counter & Progress Track */}
          <div data-progress-container className="w-72 max-w-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span
                ref={statusRef}
                className="font-mono text-[0.6875rem] text-ink-muted"
              >
                Initializing audio engine...
              </span>
              <span
                ref={counterRef}
                className="font-mono text-sm font-semibold tabular-nums text-lavender"
              >
                00%
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[0.5px]">
              <div
                ref={progressFillRef}
                className="h-full w-0 rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender shadow-[0_0_20px_rgba(168,85,247,0.9)] will-change-transform"
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
