"use client";

import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { APP_VERSION } from "@/lib/constants";

/** Progress ring geometry — the SVG uses a 0 0 100 100 viewBox. */
const RING_RADIUS = 47;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Boot messages, revealed as the counter climbs. */
const STATUS_MESSAGES = [
  { min: 0, text: "Initializing audio engine..." },
  { min: 20, text: "Calibrating 32-bit equalizer..." },
  { min: 44, text: "Loading sound library..." },
  { min: 66, text: "Tuning room synchronization..." },
  { min: 88, text: "Soundstage synchronized." },
];

/** Drifting dust motes that keep the screen alive while the app boots. */
const PARTICLES = [
  { left: "12%", bottom: "18%", size: 2, delay: "0s", duration: "7.4s" },
  { left: "24%", bottom: "34%", size: 3, delay: "1.2s", duration: "9s" },
  { left: "37%", bottom: "12%", size: 2, delay: "2.6s", duration: "8.2s" },
  { left: "58%", bottom: "26%", size: 2, delay: "0.8s", duration: "10.5s" },
  { left: "71%", bottom: "15%", size: 3, delay: "3.4s", duration: "7.8s" },
  { left: "84%", bottom: "30%", size: 2, delay: "1.9s", duration: "9.6s" },
  { left: "91%", bottom: "9%", size: 2, delay: "4.2s", duration: "8.8s" },
  { left: "47%", bottom: "42%", size: 2, delay: "5.1s", duration: "11s" },
];

export function PageLoader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const progressObj = useRef({ val: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const q = gsap.utils.selector(container);
      const mainContent = document.getElementById("content");

      /* ---------------------------------------------------------- *
       * Lock the page without letting the scrollbar disappear —
       * otherwise the layout would jump sideways on release.
       * ---------------------------------------------------------- */
      const originalOverflow = document.body.style.overflow;
      const originalPadding = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const releaseScroll = () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPadding;
      };

      const finish = () => {
        releaseScroll();
        // Hand the page back to the stylesheet: a lingering transform on <main>
        // would break `position: fixed` for anything rendered inside it.
        if (mainContent) {
          gsap.set(mainContent, { clearProps: "transform,filter,opacity" });
        }
        setComplete(true);
      };

      /* ---------------------------------------------------------- *
       * Reduced motion: skip the choreography, just hand over.
       * ---------------------------------------------------------- */
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        if (mainContent) {
          gsap.set(mainContent, { clearProps: "transform,filter,opacity" });
        }
        window.dispatchEvent(new Event("mahii:loader-exit"));
        gsap.to(container, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          onComplete: finish,
        });
        return releaseScroll;
      }

      /* ---------------------------------------------------------- *
       * Initial state — everything starts "off" so the timeline
       * can bring each layer in with intent.
       * ---------------------------------------------------------- */
      gsap.set(q("[data-aurora]"), { opacity: 0, scale: 0.72 });
      gsap.set(q("[data-aura]"), { opacity: 0, scale: 0.25 });
      gsap.set(q("[data-grid]"), { opacity: 0 });
      gsap.set(q("[data-orbit-ring]"), { opacity: 0, scale: 0.6, rotation: -140 });
      gsap.set(q("[data-ring-2]"), { opacity: 0, scale: 0.62 });
      gsap.set(q("[data-radar]"), { opacity: 0, scale: 0.7 });
      gsap.set(q("[data-logo-box]"), { opacity: 0, scale: 0.55, rotation: -22 });
      gsap.set(q("[data-ring-svg]"), {
        opacity: 0,
        rotation: -90,
        transformOrigin: "50% 50%",
      });
      gsap.set(q("[data-spark]"), { opacity: 0 });
      gsap.set(q("[data-letter]"), { yPercent: 150, opacity: 0, rotateX: -70 });
      gsap.set(q("[data-tagline]"), { y: 22, opacity: 0, filter: "blur(8px)" });
      gsap.set(q("[data-bars]"), { opacity: 0, scaleY: 0.2 });
      gsap.set(q("[data-progress-container], [data-footer-meta]"), {
        opacity: 0,
        y: 16,
      });
      gsap.set(q("[data-top-curtain], [data-bottom-curtain]"), { scaleY: 1 });
      gsap.set(q("[data-laser-beam]"), { opacity: 0, scaleX: 0, scaleY: 1 });
      gsap.set(q("[data-sweep]"), { opacity: 0, scaleX: 0 });
      if (mainContent) {
        gsap.set(mainContent, {
          scale: 0.98,
          filter: "blur(10px)",
          opacity: 0.4,
        });
      }

      /* ---------------------------------------------------------- *
       * Progress driver — one source of truth for the counter,
       * the bar, the ring and the status text.
       * ---------------------------------------------------------- */
      const applyProgress = (value: number) => {
        const pct = Math.round(value);

        if (counterRef.current) {
          counterRef.current.textContent = `${String(pct).padStart(2, "0")}%`;
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${value}%`;
        }
        if (progressRingRef.current) {
          progressRingRef.current.style.strokeDashoffset = String(
            RING_CIRCUMFERENCE * (1 - value / 100),
          );
        }

        let message = STATUS_MESSAGES[0];
        for (const entry of STATUS_MESSAGES) {
          if (pct >= entry.min) message = entry;
        }
        if (statusRef.current && statusRef.current.textContent !== message.text) {
          statusRef.current.textContent = message.text;
        }
      };

      /* ---------------------------------------------------------- *
       * Master timeline
       * ---------------------------------------------------------- */
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: finish,
      });
      timelineRef.current = tl;

      /* --- Ambience ------------------------------------------------ */
      tl.to(q("[data-aura]"), { opacity: 0.9, scale: 1, duration: 1.5 }, 0)
        .to(q("[data-aurora]"), { opacity: 0.5, scale: 1, duration: 1.8 }, 0.05)
        .to(q("[data-grid]"), { opacity: 0.45, duration: 1.4, ease: "power2.out" }, 0.1);

      /* --- Emblem -------------------------------------------------- */
      tl.to(
          q("[data-orbit-ring]"),
          { opacity: 0.7, scale: 1, rotation: 0, duration: 1.4 },
          0.12,
        )
        .to(q("[data-ring-2]"), { opacity: 1, scale: 1, duration: 1.2 }, 0.16)
        .to(q("[data-radar]"), { opacity: 1, scale: 1, duration: 1 }, 0.2)
        .to(
          q("[data-logo-box]"),
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.62)",
          },
          0.22,
        )
        .to(q("[data-ring-svg]"), { opacity: 1, duration: 0.9 }, 0.3)
        .to(q("[data-spark]"), { opacity: 1, duration: 0.6 }, 0.45);

      /* --- Type ---------------------------------------------------- */
      tl.to(
          q("[data-letter]"),
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.075,
          },
          0.3,
        )
        .to(
          q("[data-tagline]"),
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.95 },
          0.52,
        )
        .to(
          q("[data-bars]"),
          { opacity: 1, scaleY: 1, duration: 0.8, ease: "expo.out" },
          0.6,
        )
        .to(
          q("[data-progress-container], [data-footer-meta]"),
          { opacity: 1, y: 0, duration: 0.85 },
          0.66,
        );

      /* --- Counter -------------------------------------------------- */
      tl.to(
        progressObj.current,
        {
          val: 100,
          duration: 1.45,
          ease: "power2.inOut",
          onUpdate: () => applyProgress(progressObj.current.val),
        },
        0.3,
      );

      /* --- Convergence --------------------------------------------- */
      tl.to(
          q("[data-progress-container]"),
          { opacity: 0, y: -12, duration: 0.35, ease: "power2.in" },
          1.75,
        )
        .to(
          q("[data-bars]"),
          { opacity: 0, scaleY: 0.3, duration: 0.35, ease: "power2.in" },
          1.75,
        )
        .to(
          q("[data-tagline]"),
          { opacity: 0, y: -14, duration: 0.3, ease: "power2.in" },
          1.75,
        )
        .to(
          q("[data-logo-box]"),
          {
            scale: 1.16,
            filter: "brightness(1.7) saturate(1.4)",
            duration: 0.3,
            ease: "power2.out",
          },
          1.82,
        )
        .to(
          q("[data-orbit-ring]"),
          {
            rotation: "+=300",
            opacity: 0,
            scale: 1.15,
            duration: 0.6,
            ease: "power2.in",
          },
          1.84,
        )
        .to(
          q("[data-ring-2]"),
          { opacity: 0, scale: 1.15, duration: 0.55, ease: "power2.in" },
          1.84,
        )
        .to(q("[data-radar]"), { opacity: 0, duration: 0.45 }, 1.86)
        .to(q("[data-ring-svg]"), { opacity: 0, duration: 0.4 }, 1.88)
        .to(q("[data-spark]"), { opacity: 0, duration: 0.3 }, 1.88)
        .to(
          q("[data-sweep]"),
          { opacity: 1, scaleX: 1, duration: 0.32, ease: "expo.out" },
          1.92,
        )
        .to(
          q("[data-sweep]"),
          { opacity: 0, duration: 0.35, ease: "power2.in" },
          2.08,
        )
        .to(
          q("[data-center-content]"),
          {
            scale: 0.9,
            opacity: 0,
            filter: "blur(14px)",
            duration: 0.55,
            ease: "power2.in",
          },
          1.94,
        );

      /* --- Ambience dissolve: the glow dims as the page is revealed */
      tl.to(
          q("[data-aurora], [data-aura], [data-grid]"),
          { opacity: 0, duration: 0.75, ease: "power2.inOut" },
          1.85,
        )
        .to(
          q("[data-particle-layer]"),
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          1.85,
        );

      /* --- Curtain lift --------------------------------------------- */
      tl.to(
          q("[data-laser-beam]"),
          { opacity: 1, scaleX: 1, duration: 0.12, ease: "power2.out" },
          2.02,
        )
        .to(
          q("[data-laser-beam]"),
          { scaleY: 14, duration: 0.18, ease: "power2.out" },
          2.02,
        )
        .to(
          q("[data-top-curtain]"),
          {
            scaleY: 0,
            duration: 0.95,
            ease: "power3.inOut",
            transformOrigin: "bottom center",
          },
          2.1,
        )
        .to(
          q("[data-bottom-curtain]"),
          {
            scaleY: 0,
            duration: 0.95,
            ease: "power3.inOut",
            transformOrigin: "top center",
          },
          2.1,
        )
        .to(
          q("[data-laser-beam]"),
          { opacity: 0, duration: 0.5, ease: "power2.out" },
          2.12,
        );

      /* --- Page handover -------------------------------------------- *
       * The hero starts moving *before* the curtains open, so the
       * content is already in motion when the aperture reveals it.
       * Nothing pops, nothing cuts.                                   */
      tl.call(() => {
        window.dispatchEvent(new Event("mahii:loader-exit"));
      }, undefined, 1.9);

      if (mainContent) {
        tl.to(
          mainContent,
          {
            scale: 1.012,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "expo.out",
          },
          2.0,
        ).to(mainContent, { scale: 1, duration: 0.7, ease: "power2.out" }, 2.7);
      }

      return () => {
        releaseScroll();
        if (mainContent) {
          gsap.set(mainContent, { clearProps: "transform,filter,opacity" });
        }
      };
    },
    { scope: containerRef },
  );

  const handleSkip = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    tl.timeScale(2.2);
    tl.seek(Math.max(tl.time(), 1.7), false);
  };

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading MAHII"
      className="fixed inset-0 z-[999] select-none pointer-events-auto overflow-hidden"
    >
      {/* ---------------- Curtains (the cover) ---------------- */}
      <div
        data-top-curtain
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 z-10 will-change-transform bg-[#08080c] shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
      />
      <div
        data-bottom-curtain
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 z-10 will-change-transform bg-[#08080c] shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
      />

      {/* ---------------- Ambient aurora ---------------- */}
      <div
        data-aurora
        aria-hidden
        className="loader-hidden pointer-events-none absolute inset-0 z-20"
      >
        <div
          className="loader-aurora absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(168,85,247,0.5), rgba(124,58,237,0.08), rgba(232,121,249,0.4), rgba(168,85,247,0.5))",
          }}
        />
      </div>

      {/* ---------------- Radial aura ---------------- */}
      <div
        data-aura
        aria-hidden
        className="loader-hidden pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      >
        <div
          className="h-[70vh] w-[70vh] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.4) 0%, rgba(124,58,237,0.18) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute h-[50vh] w-[50vh] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ---------------- Perspective grid ---------------- */}
      <div
        data-grid
        aria-hidden
        className="loader-hidden pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(168,85,247,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to top, black, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent 88%)",
        }}
      />

      {/* ---------------- Drifting motes ---------------- */}
      <div
        data-particle-layer
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
      >
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="loader-particle absolute rounded-full bg-lavender/70 opacity-0"
            style={{
              left: particle.left,
              bottom: particle.bottom,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* ---------------- Horizon seam ---------------- */}
      <div
        data-laser-beam
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 h-[3px] -translate-y-1/2 origin-center will-change-transform opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #a855f7 20%, #c4b5fd 40%, #ffffff 50%, #c4b5fd 60%, #a855f7 80%, transparent 100%)",
          boxShadow: "0 0 40px #a855f7, 0 0 90px #c4b5fd",
        }}
      />

      {/* ---------------- Exit sweep ---------------- */}
      <div
        data-sweep
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-50 h-[2px] -translate-y-1/2 origin-center will-change-transform opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.85) 30%, #ffffff 50%, rgba(168,85,247,0.85) 70%, transparent 100%)",
          boxShadow:
            "0 0 60px rgba(168,85,247,0.85), 0 0 140px rgba(196,181,253,0.55)",
        }}
      />

      {/* ---------------- Center content ---------------- */}
      <div
        data-center-content
        className="relative z-30 flex h-full w-full flex-col items-center justify-center will-change-transform"
      >
        {/* Top bar */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet-core opacity-75 animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-core" />
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.22em] text-ink-muted uppercase">
              Android Audio Experience
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.6875rem] text-ink-muted hover:border-violet-core/50 hover:bg-white/[0.08] hover:text-ink transition-all duration-300"
          >
            Skip ↗
          </button>
        </div>

        {/* Brand emblem */}
        <div className="relative mb-10 grid h-32 w-32 place-items-center">
          {/* Progress ring */}
          <svg
            data-ring-svg
            viewBox="0 0 100 100"
            aria-hidden
            className="loader-hidden absolute inset-0 h-full w-full will-change-transform"
          >
            <defs>
              <linearGradient id="mahii-loader-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="45%" stopColor="#e2d4f0" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
            />
            <circle
              ref={progressRingRef}
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#mahii-loader-ring)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE}
            />
          </svg>

          {/* Orbiting spark */}
          <div data-spark aria-hidden className="loader-hidden absolute inset-0 loader-orbit">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender shadow-[0_0_14px_rgba(226,212,240,0.95)]" />
          </div>

          {/* Outer dashed ring */}
          <div
            data-orbit-ring
            aria-hidden
            className="loader-hidden absolute inset-0 rounded-full border-[3px] border-dashed border-violet-core/30 will-change-transform"
          />

          {/* Secondary ring */}
          <div
            data-ring-2
            aria-hidden
            className="loader-hidden absolute inset-3 rounded-full border border-lavender/20 will-change-transform"
          />

          {/* Pulsing radar */}
          <div
            data-radar
            aria-hidden
            className="loader-hidden absolute inset-4 will-change-transform"
          >
            <div className="h-full w-full rounded-2xl border border-lavender/30 animate-ping-slow" />
          </div>

          {/* Core emblem */}
          <div
            data-logo-box
            className="loader-hidden relative h-20 w-20 will-change-transform"
          >
            <BrandLogo
              size={80}
              priority
              className="h-full w-full drop-shadow-[0_0_45px_rgba(168,85,247,0.75)]"
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="overflow-hidden mb-3">
          <h1 className="flex items-center gap-2.5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.28em] text-ink will-change-transform">
            {["M", "A", "H", "I", "I"].map((letter, i) => (
              <span
                key={letter + i}
                data-letter
                className="loader-hidden inline-block will-change-transform"
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <p
          data-tagline
          className="loader-hidden mb-10 text-sm sm:text-base font-medium tracking-tight text-violet-gradient will-change-transform"
        >
          Music. Memories. Together.
        </p>

        {/* Equalizer */}
        <div
          data-bars
          className="loader-hidden mb-10 flex h-10 origin-bottom items-end gap-[4px]"
          aria-hidden
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-violet-deep via-violet-core to-lavender origin-bottom"
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.65)) * 80}%`,
                animation: `wave-pulse ${0.7 + (i % 7) * 0.12}s ease-in-out ${(i % 9) * 0.05}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Progress */}
        <div data-progress-container className="loader-hidden w-72 max-w-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span ref={statusRef} className="font-mono text-[0.6875rem] text-ink-muted">
              Initializing audio engine...
            </span>
            <span
              ref={counterRef}
              className="font-mono text-sm font-semibold tabular-nums text-lavender"
            >
              00%
            </span>
          </div>

          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[0.5px]">
            <div
              ref={progressFillRef}
              className="relative h-full w-0 overflow-hidden rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender shadow-[0_0_20px_rgba(168,85,247,0.9)] will-change-[width]"
            >
              <span className="loader-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div
          data-footer-meta
          className="loader-hidden absolute bottom-6 flex items-center gap-2 text-[0.6875rem] text-ink-muted"
        >
          <Sparkles size={12} className="text-violet-core" />
          <span>Crafted by Harsh &amp; Shubham · v{APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
}
