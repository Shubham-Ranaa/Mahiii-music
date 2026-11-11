"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DESIGN_PRINCIPLES } from "@/lib/constants";

export function DesignPhilosophy() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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
          <span className="type-eyebrow">06 — Design</span>
          <span className="hairline flex-1" />
        </div>
        <h2 className="type-section max-w-[16ch] text-ink">
          Every detail <span className="text-ink-soft">matters.</span>
        </h2>
      </div>

      {/* Desktop: horizontal track */}
      <div className="hidden overflow-hidden lg:block">
        <div ref={trackRef} className="flex gap-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-24 will-change-transform">
          {DESIGN_PRINCIPLES.map((p) => (
            <article
              key={p.index}
              className="relative flex w-[24rem] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-surface to-abyss p-8"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(50% 50% at 50% 50%, ${p.accent}40 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted">
                  {p.index}
                </span>
                <h3 className="mt-6 text-[1.75rem] font-medium leading-tight tracking-tight text-ink">
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
          ))}
        </div>
      </div>

      {/* Mobile: vertical story */}
      <div className="shell lg:hidden">
        <ol className="flex flex-col">
          {DESIGN_PRINCIPLES.map((p) => (
            <li
              key={p.index}
              className="relative border-l border-white/10 pl-6 pb-10 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full"
                style={{ background: p.accent }}
              />
              <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted">
                {p.index}
              </span>
              <h3 className="mt-2 text-[1.25rem] font-medium tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
