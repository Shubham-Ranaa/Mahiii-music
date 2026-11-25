"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Section 05 is deliberately about *listening moments*, not a feature list —
 * section 03 already covers discovery, rooms, lyrics and the equalizer.
 * The art here is CSS-built so the section reads as an editorial mosaic
 * rather than another tabbed phone showcase.
 */
const MOMENTS: Array<{
  index: string;
  kicker: string;
  title: string;
  copy: string;
  art: ReactNode;
  wide?: boolean;
  accent: string;
  glow: string;
}> = [
  {
    index: "01",
    kicker: "On the move",
    title: "The morning commute",
    copy: "The queue is ready before you are. Headphones in, screen down, and the playlist already knows the way.",
    art: <WaveArt />,
    wide: true,
    accent: "text-violet-bright",
    glow: "hover:shadow-[0_20px_60px_-24px_rgba(168,85,247,0.5)]",
  },
  {
    index: "02",
    kicker: "In the zone",
    title: "Deep focus",
    copy: "A steady stream that stays out of the way. Controls surface only when you reach for them.",
    art: <FocusArt />,
    accent: "text-cyan-300",
    glow: "hover:shadow-[0_20px_60px_-24px_rgba(34,211,238,0.4)]",
  },
  {
    index: "03",
    kicker: "Winding down",
    title: "Late night",
    copy: "Low light, softer edges, and artwork that glows instead of shouting.",
    art: <VinylArt />,
    accent: "text-rose-300",
    glow: "hover:shadow-[0_20px_60px_-24px_rgba(244,114,182,0.4)]",
  },
  {
    index: "04",
    kicker: "Full volume",
    title: "The weekend drive",
    copy: "Room to breathe — crisp highs, real bass and nothing between you and the record.",
    art: <SpectrumArt />,
    wide: true,
    accent: "text-amber-300",
    glow: "hover:shadow-[0_20px_60px_-24px_rgba(251,191,36,0.4)]",
  },
];

function WaveArt() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-1.5 opacity-30 sm:gap-2">
      {Array.from({ length: 34 }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 animate-float-soft rounded-full bg-gradient-to-t from-violet-core/10 via-violet-core/40 to-lavender/70 sm:w-2"
          style={{
            height: `${18 + ((i * 37) % 70)}%`,
            animationDelay: `${(i % 9) * 110}ms`,
          }}
        />
      ))}
    </div>
  );
}

function FocusArt() {
  return (
    <div className="absolute inset-0 grid place-items-center opacity-40">
      <div className="relative h-64 w-64">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border border-violet-core/25"
            style={{
              transform: `scale(${1 - i * 0.22})`,
              boxShadow: i === 0 ? "0 0 80px rgba(168,85,247,0.25)" : undefined,
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender shadow-[0_0_25px_rgba(168,85,247,0.9)]" />
      </div>
    </div>
  );
}

function VinylArt() {
  return (
    <div className="absolute inset-0 grid place-items-center opacity-40">
      <div
        className="h-64 w-64 animate-drift-glow rounded-full shadow-[0_0_90px_rgba(168,85,247,0.25)] sm:h-72 sm:w-72"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(226,212,240,0.16) 0px, rgba(226,212,240,0.16) 1px, transparent 1px, transparent 7px), radial-gradient(circle at 50% 50%, rgba(168,85,247,0.45) 0%, rgba(7,7,11,0.9) 62%)",
        }}
      >
        <span className="block h-full w-full rounded-full" />
      </div>
    </div>
  );
}

function SpectrumArt() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-30">
      {Array.from({ length: 7 }).map((_, row) => (
        <div key={row} className="flex items-center gap-2">
          {Array.from({ length: 26 }).map((__, col) => (
            <span
              key={col}
              className="h-1 flex-1 rounded-full bg-violet-bright/60"
              style={{ opacity: 0.15 + (((row * 7 + col * 13) % 10) / 10) * 0.85 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function AppShowcase() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /* Cards rise in on scroll. Transform-only and `once: true` — no opacity
     keyframe, so a fast scroll can never leave the section looking empty. */
  useGSAP(
    () => {
      if (!scope.current || reduced) return;
      const q = gsap.utils.selector(scope);
      gsap.from(q("[data-moment]"), {
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      id="experience"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Ambient field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.16) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4 sm:mb-14">
          <span className="type-eyebrow">05 — In the Moment</span>
          <span className="flex-1 hairline" />
        </div>

        {/* Intro */}
        <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-end lg:gap-16">
          <h2 className="type-section max-w-[15ch]">
            Made for the
            <br />
            <span className="text-gradient-violet">moment.</span>
          </h2>
          <p className="type-lede max-w-[44ch] lg:pb-2">
            Four ways a day sounds. MAHII fits the room, the pace and the
            mood — not the other way around.
          </p>
        </div>

        {/* Moments mosaic */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {MOMENTS.map((moment) => (
            <article
              key={moment.index}
              data-moment
              className={cn(
                "group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8",
                "hover:border-violet-core/30",
                moment.glow,
                moment.wide && "sm:col-span-2 sm:min-h-[16rem]",
              )}
            >
              {/* Art */}
              <div className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105">
                {moment.art}
              </div>
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-[#08080d] via-[#08080d]/70 to-transparent"
              />

              {/* Top row: index + arrow affordance */}
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "font-mono text-[0.625rem] uppercase tracking-[0.2em]",
                    moment.accent,
                  )}
                >
                  {moment.index} · {moment.kicker}
                </span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-ink-muted transition-all duration-300 group-hover:border-violet-core/40 group-hover:text-lavender"
                >
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>

              {/* Copy */}
              <div className={cn("max-w-[42ch]", moment.wide && "sm:max-w-[50ch]")}>
                <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {moment.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                  {moment.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.6875rem] leading-relaxed text-ink-muted lg:text-left">
          A visual study of how MAHII feels in use — built for this website, not captured from the app.
        </p>
      </div>
    </section>
  );
}
