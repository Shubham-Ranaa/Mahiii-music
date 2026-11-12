"use client";

import { useRef, useState } from "react";
import { Moon, Waves, Disc3, Compass, Sliders } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DESIGN_PRINCIPLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRINCIPLE_ICONS = [Moon, Waves, Disc3, Compass, Sliders];

export function DesignPhilosophy() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      if (!scope.current || !trackRef.current || reduced) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Section header */}
      <div className="shell mb-16 lg:mb-20">
        <div className="mb-6 flex items-center gap-4">
          <span className="type-eyebrow">06 — Design Principles</span>
          <span className="flex-1 hairline" />
        </div>
        <h2 className="type-section max-w-[15ch]">
          Every detail{" "}
          <span className="text-gradient-violet">matters.</span>
        </h2>
      </div>

      {/* Desktop: horizontal scroll track */}
      <div className="hidden lg:block">
        <div
          ref={trackRef}
          className="flex gap-6 pl-[clamp(1.25rem,5vw,4rem)] pr-28 will-change-transform"
        >
          {DESIGN_PRINCIPLES.map((p, idx) => {
            const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
            return (
              <article
                key={p.index}
                className="group relative flex w-[25rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-surface via-abyss to-void p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-violet-core/50 hover:shadow-[0_30px_70px_-15px_rgba(168,85,247,0.35)]"
              >
                {/* Background accent glow */}
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-52 w-52 rounded-full blur-3xl opacity-60 transition-transform duration-500 group-hover:scale-125"
                  style={{
                    background: `radial-gradient(50% 50% at 50% 50%, ${p.accent}40 0%, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.22em] text-ink-muted">
                      PRINCIPLE {p.index}
                    </span>
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-white/10 text-white transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${p.accent}20` }}
                    >
                      <Icon size={18} style={{ color: p.accent }} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-[1.8rem] font-medium leading-tight tracking-tight text-ink group-hover:text-lavender transition-colors duration-300">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  aria-hidden
                  className="relative mt-10 h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, ${p.accent}80, transparent)`,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="shell lg:hidden">
        <ol className="flex flex-col gap-3">
          {DESIGN_PRINCIPLES.map((p, idx) => {
            const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
            const isExpanded = expandedIndex === idx;

            return (
              <li
                key={p.index}
                className={cn(
                  "rounded-2xl border p-5 transition-all duration-400",
                  isExpanded
                    ? "border-violet-core/40 bg-surface/80 shadow-[0_15px_40px_rgba(168,85,247,0.15)]"
                    : "border-white/[0.06] bg-white/[0.02]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${p.accent}25`,
                      }}
                    >
                      <Icon size={16} style={{ color: p.accent }} />
                    </span>
                    <div>
                      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted">
                        {p.index}
                      </span>
                      <h3 className="mt-0.5 text-base font-medium tracking-tight text-ink">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs text-ink-muted transition-transform duration-300">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft border-t border-white/6 pt-3 animate-in fade-in duration-200">
                    {p.body}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
