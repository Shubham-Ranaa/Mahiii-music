"use client";

import { useRef } from "react";
import { Check, CircleDashed } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROADMAP } from "@/lib/constants";

export function Roadmap() {
  const scope = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const available = ROADMAP.filter((r) => r.status === "available");
  const next = ROADMAP.filter((r) => r.status === "next");

  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-rm-item]"), { opacity: 1, x: 0 });
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      q("[data-rm-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      id="roadmap"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">08 — Roadmap</span>
          <span className="hairline flex-1" />
        </div>

        <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end">
          <h2 className="type-section max-w-[14ch] text-ink">
            We&apos;re just getting started.
          </h2>
          <p className="type-lede max-w-[40ch] lg:pb-2">
            What ships today, and what comes next. Nothing here is presented as
            released before it is.
          </p>
        </div>

        <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* progress line */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 hidden h-full w-px bg-white/[0.07] lg:left-1/2 lg:top-0 lg:block lg:-translate-x-1/2"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-violet-core via-lavender to-transparent"
            />
          </div>

          {/* Available */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-emerald-300">
                Available now
              </span>
            </div>
            <ol className="flex flex-col gap-4">
              {available.map((item) => (
                <li
                  key={item.title}
                  data-rm-item
                  className="flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-surface/60 p-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[0.9375rem] font-medium tracking-tight text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Coming next */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-violet-core/30 bg-violet-core/10 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-lavender">
                Coming next
              </span>
            </div>
            <ol className="flex flex-col gap-4">
              {next.map((item) => (
                <li
                  key={item.title}
                  data-rm-item
                  className="flex items-start gap-3.5 rounded-xl border border-white/[0.05] bg-transparent p-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/15 text-ink-muted">
                    <CircleDashed size={11} strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[0.9375rem] font-medium tracking-tight text-ink-soft">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
