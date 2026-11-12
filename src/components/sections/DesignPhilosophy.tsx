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
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="shell mb-14 lg:mb-16">
        <div className="mb-6 flex items-center gap-4">
          <span className="type-eyebrow">06 — Design Principles</span>
          <span className="hairline flex-1" />
        </div>
        <h2 className="type-section max-w-[16ch] text-ink">
          Every detail <span className="text-violet-gradient">matters.</span>
        </h2>
      </div>

      {/* Desktop: horizontal track */}
      <div className="hidden overflow-hidden lg:block">
        <div ref={trackRef} className="flex gap-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-24 will-change-transform">
          {DESIGN_PRINCIPLES.map((p, idx) => {
            const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
            return (
              <article
                key={p.index}
                className="group relative flex w-[24rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-surface via-abyss to-void p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-violet-core/50 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)]"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl opacity-70 transition-transform duration-500 group-hover:scale-125"
                  style={{
                    background: `radial-gradient(50% 50% at 50% 50%, ${p.accent}50 0%, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted">
                      PRINCIPLE {p.index}
                    </span>
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-white/10 text-white transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${p.accent}20` }}
                    >
                      <Icon size={18} style={{ color: p.accent }} />
                    </span>
                  </div>

                  <h3 className="mt-8 text-[1.75rem] font-medium leading-tight tracking-tight text-ink group-hover:text-lavender transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>

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

      {/* Mobile: Interactive Accordion & Timeline */}
      <div className="shell lg:hidden">
        <ol className="flex flex-col gap-3">
          {DESIGN_PRINCIPLES.map((p, idx) => {
            const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
            const isExpanded = expandedIndex === idx;

            return (
              <li
                key={p.index}
                className={cn(
                  "rounded-2xl border p-5 transition-all duration-300",
                  isExpanded
                    ? "border-violet-core/40 bg-surface/80 shadow-[0_10px_30px_rgba(168,85,247,0.15)]"
                    : "border-white/[0.07] bg-white/[0.02]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-8 w-8 place-items-center rounded-lg text-white"
                      style={{ background: `${p.accent}25` }}
                    >
                      <Icon size={16} style={{ color: p.accent }} />
                    </span>
                    <div>
                      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted">
                        {p.index}
                      </span>
                      <h3 className="text-base font-medium tracking-tight text-ink">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs text-ink-muted">{isExpanded ? "−" : "+"}</span>
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
