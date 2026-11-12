"use client";

import { useRef, useState } from "react";
import { Check, CircleDashed, Bell, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROADMAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const scope = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<"all" | "available" | "next">("all");
  const [notified, setNotified] = useState<Record<string, boolean>>({});

  const available = ROADMAP.filter((r) => r.status === "available");
  const next = ROADMAP.filter((r) => r.status === "next");

  const toggleNotify = (title: string) => {
    setNotified((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
            start: "top 55%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        },
      );

      q("[data-rm-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope, dependencies: [reduced, filter] },
  );

  return (
    <section
      id="roadmap"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative">
        {/* Section header */}
        <div className="mb-14 flex items-center gap-4 sm:mb-18 lg:mb-20">
          <span className="type-eyebrow">08 — Product Roadmap</span>
          <span className="flex-1 hairline" />
        </div>

        {/* Intro */}
        <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] lg:items-end">
          <div>
            <h2 className="type-section mb-4 max-w-[13ch]">
              We&apos;re just getting started.
            </h2>

            {/* Filter pills - refined */}
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                  filter === "all"
                    ? "bg-ink text-void shadow-sm"
                    : "border border-white/10 bg-white/[0.03] text-ink-muted hover:text-ink hover:border-white/20",
                )}
              >
                All ({ROADMAP.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("available")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                  filter === "available"
                    ? "bg-emerald-400 text-void font-semibold shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                    : "border border-white/10 bg-white/[0.03] text-emerald-400/80 hover:text-emerald-300",
                )}
              >
                Available ({available.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("next")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                  filter === "next"
                    ? "bg-violet-core text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "border border-white/10 bg-white/[0.03] text-lavender hover:text-white",
                )}
              >
                Coming ({next.length})
              </button>
            </div>
          </div>

          <p className="type-lede max-w-[38ch] lg:pb-0 tracking-tight-body">
            What ships today, and what comes next. Nothing here is presented as
            released before it is. Transparent indie development.
          </p>
        </div>

        {/* Content grid */}
        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Center progress line */}
          <div
            aria-hidden
            className="absolute left-[6px] top-2 hidden h-full w-px bg-white/[0.05] lg:left-1/2 lg:top-0 lg:block lg:-translate-x-1/2"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-violet-core via-lavender to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>

          {/* Available Now column */}
          {(filter === "all" || filter === "available") && (
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-emerald-300 border border-emerald-400/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available ({available.length})
                </span>
              </div>
              <ol className="flex flex-col gap-3.5">
                {available.map((item) => (
                  <li
                    key={item.title}
                    data-rm-item
                    className="group flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-surface/60 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/30 hover:shadow-[0_15px_35px_-15px_rgba(52,211,153,0.12)] hover:bg-surface-hi"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-semibold tracking-tight text-ink">
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
          )}

          {/* Coming Next column */}
          {(filter === "all" || filter === "next") && (
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-lavender shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                  <Sparkles size={10} className="text-violet-core" />
                  Coming ({next.length})
                </span>
              </div>
              <ol className="flex flex-col gap-3">
                {next.map((item) => {
                  const isNotified = Boolean(notified[item.title]);
                  return (
                    <li
                      key={item.title}
                      data-rm-item
                      className="group flex items-start justify-between gap-3.5 rounded-2xl border border-white/[0.04] bg-surface/30 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-violet-core/30 hover:bg-surface/60"
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-violet-core/40 text-lavender">
                          <CircleDashed
                            size={12}
                            strokeWidth={2.5}
                            className="animate-spin-slow"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.9375rem] font-medium tracking-tight text-ink">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                            {item.body}
                          </p>
                        </div>
                      </div>

                      {/* Notify toggle */}
                      <button
                        type="button"
                        onClick={() => toggleNotify(item.title)}
                        title={isNotified ? "Notified for updates" : "Get notified when this ships"}
                        className={cn(
                          "shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.6875rem] font-medium transition-all duration-200",
                          isNotified
                            ? "bg-violet-core text-white shadow-sm"
                            : "border border-white/10 text-ink-muted hover:border-white/25 hover:text-ink",
                        )}
                      >
                        {isNotified ? (
                          <>
                            <Check size={10} />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Bell size={10} />
                            <span>Notify</span>
                          </>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
