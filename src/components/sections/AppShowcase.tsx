"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SHOWCASE_SCREENS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import {
  NowPlayingScreen,
  LyricsScreen,
  EqualizerScreen,
  LibraryScreen,
  RoomScreen,
} from "@/components/ui/AppScreens";

const SCREEN_MAP: Record<string, () => React.JSX.Element> = {
  "now-playing": NowPlayingScreen,
  lyrics: LyricsScreen,
  equalizer: EqualizerScreen,
  library: LibraryScreen,
  room: RoomScreen,
};

export function AppShowcase() {
  const [activeId, setActiveId] = useState(SHOWCASE_SCREENS[0].id);
  const scope = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const active =
    SHOWCASE_SCREENS.find((s) => s.id === activeId) ?? SHOWCASE_SCREENS[0];
  const Screen = SCREEN_MAP[active.id] ?? NowPlayingScreen;

  /* Device entrance */
  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-show-device], [data-show-copy]"), {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-show-copy]"), {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.09,
      })
        .from(
          q("[data-show-device]"),
          {
            opacity: 0,
            y: 70,
            scale: 0.9,
            rotate: -4,
            duration: 1.3,
            ease: "expo.out",
          },
          0.15,
        )
        .from(
          q("[data-show-tab]"),
          { opacity: 0, x: -12, duration: 0.6, stagger: 0.06 },
          0.5,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  /* Screen transition on selection */
  useGSAP(
    () => {
      if (!screenRef.current || reduced) return;
      gsap.fromTo(
        screenRef.current,
        { opacity: 0, scale: 1.03, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [activeId, reduced] },
  );

  return (
    <section
      id="experience"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700"
        style={{
          background:
            activeId === "room"
              ? "radial-gradient(60% 50% at 50% 40%, rgba(168,85,247,0.16) 0%, transparent 70%)"
              : activeId === "equalizer"
                ? "radial-gradient(60% 50% at 50% 40%, rgba(34,211,238,0.10) 0%, transparent 70%)"
                : "radial-gradient(60% 50% at 50% 40%, rgba(124,58,237,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="shell">
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">05 — The app</span>
          <span className="hairline flex-1" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <h2 data-show-copy className="type-section mb-6 max-w-[14ch] text-ink">
              Designed for music lovers.
            </h2>
            <p data-show-copy className="type-lede mb-8 max-w-[44ch]">
              Five surfaces that cover how people actually listen — from a
              full-bleed now-playing screen to a shared room with everyone on
              the same beat.
            </p>

            <div
              role="tablist"
              aria-label="App screens"
              className="flex flex-col"
            >
              {SHOWCASE_SCREENS.map((screen) => {
                const isActive = screen.id === activeId;
                return (
                  <button
                    key={screen.id}
                    data-show-tab
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls="showcase-panel"
                    onClick={() => setActiveId(screen.id)}
                    className={cn(
                      "group relative flex items-center justify-between gap-4 border-b border-white/[0.07] py-3.5 text-left transition-colors duration-300",
                      isActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink-soft",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all duration-300",
                          isActive
                            ? "bg-violet-core shadow-[0_0_10px_rgba(168,85,247,0.9)]"
                            : "bg-white/20",
                        )}
                      />
                      <span className="text-[0.9375rem] font-medium tracking-tight">
                        {screen.label}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.5625rem] tracking-[0.18em] transition-opacity",
                        isActive ? "text-violet-core opacity-100" : "opacity-0",
                      )}
                    >
                      ACTIVE
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="showcase-panel"
              role="tabpanel"
              aria-live="polite"
              className="mt-6 min-h-[3.5rem]"
            >
              <p className="text-[0.875rem] leading-relaxed text-ink-soft">
                {active.caption}
              </p>
            </div>
          </div>

          <div data-show-device className="flex justify-center lg:justify-end">
            <PhoneMockup width={300}>
              <div ref={screenRef} className="h-full w-full">
                <Screen />
              </div>
            </PhoneMockup>          </div>
        </div>

        <p className="mt-14 max-w-[52ch] text-[0.75rem] leading-relaxed text-ink-muted">
          Screens shown are interface mockups built for this site, not captured
          screenshots of the shipped application.
        </p>
      </div>
    </section>
  );
}
