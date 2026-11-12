"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/animations/scrollAnimations";
import { FeatureVisual } from "./FeatureVisual";

export function Features() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const scope = useScrollReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  /* Mobile: keep the swipeable card and the rail in sync */
  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.clientWidth;
    if (!cardWidth) return;
    const index = Math.round(track.scrollLeft / cardWidth);
    const next = FEATURES[index];
    if (next && next.id !== activeId) setActiveId(next.id);
  }, [activeId]);

  const selectFeature = (id: string) => {
    setActiveId(id);
    const track = trackRef.current;
    if (!track) return;
    const index = FEATURES.findIndex((f) => f.id === id);
    if (index < 0) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="features"
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      <div className="shell" ref={scope}>
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">03 — Features</span>
          <span className="hairline flex-1" />
        </div>

        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <h2 className="type-section max-w-[16ch] text-ink">
            Everything you need.
            <br />
            <span className="text-ink-soft">One music experience.</span>
          </h2>
          <p className="type-lede max-w-[40ch] lg:pb-2">
            Seven pieces of the app that work as one system — discovery,
            listening, sound and the library that ties it together.
          </p>
        </div>

        {/* ---------------- Desktop: side rail + showcase ---------------- */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <ul className="flex flex-col" role="tablist" aria-label="Features">
            {FEATURES.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <li key={feature.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${feature.id}`}
                    id={`tab-${feature.id}`}
                    onClick={() => setActiveId(feature.id)}
                    className={cn(
                      "group relative flex w-full items-start gap-5 border-b border-white/[0.07] py-5 text-left transition-colors duration-300",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink-soft",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 font-mono text-[0.625rem] tracking-[0.18em] transition-colors",
                        isActive ? "text-violet-core" : "text-ink-muted/60",
                      )}
                    >
                      {feature.index}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[1.0625rem] font-medium tracking-tight">
                        {feature.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-500",
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[38ch] pt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                            {feature.description}
                          </span>
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.75}
                      className={cn(
                        "mt-1.5 shrink-0 transition-all duration-300",
                        isActive
                          ? "translate-x-0 text-lavender opacity-100"
                          : "-translate-x-1 opacity-0",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-violet-core to-transparent transition-transform duration-500",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="sticky top-[calc(var(--nav-h)+1rem)]"
          >
            <div className="min-h-[30rem]">
              <FeatureVisual feature={active} />
            </div>
          </div>
        </div>

        {/* ---------------- Mobile: swipeable cards ---------------- */}
        <div className="lg:hidden">
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="no-scrollbar snap-x-mandatory snap-center-child -mx-[clamp(1.25rem,4vw,3.5rem)] flex overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-5"
          >
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="w-[80%] sm:w-[75%] shrink-0 pr-3 last-pr-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <FeatureVisual feature={feature} compact />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Features">
              {FEATURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={f.id === activeId}
                  aria-label={`Show ${f.title}`}
                  onClick={() => selectFeature(f.id)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    f.id === activeId
                      ? "w-7 bg-violet-core shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-muted">
                {active.index} / 07
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const idx = FEATURES.findIndex((f) => f.id === activeId);
                    const prev = FEATURES[(idx - 1 + FEATURES.length) % FEATURES.length];
                    selectFeature(prev.id);
                  }}
                  aria-label="Previous feature"
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-ink-muted hover:border-white/25 hover:text-ink transition-colors active:scale-95"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idx = FEATURES.findIndex((f) => f.id === activeId);
                    const next = FEATURES[(idx + 1) % FEATURES.length];
                    selectFeature(next.id);
                  }}
                  aria-label="Next feature"
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-ink-muted hover:border-white/25 hover:text-ink transition-colors active:scale-95"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
