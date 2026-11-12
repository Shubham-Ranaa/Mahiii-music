"use client";

import { useRef, useState } from "react";
import { Music, AlignLeft, Sliders, Disc, Users, Sparkles } from "lucide-react";
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

const SCREEN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "now-playing": Music,
  lyrics: AlignLeft,
  equalizer: Sliders,
  library: Disc,
  room: Users,
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
          duration: 0.45,
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
              ? "radial-gradient(60% 50% at 50% 40%, rgba(168,85,247,0.18) 0%, transparent 70%)"
              : activeId === "equalizer"
                ? "radial-gradient(60% 50% at 50% 40%, rgba(34,211,238,0.12) 0%, transparent 70%)"
                : "radial-gradient(60% 50% at 50% 40%, rgba(124,58,237,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="shell">
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">05 — The App Surfaces</span>
          <span className="hairline flex-1" />
        </div>

        {/* Mobile Horizontal Screen Selector Bar */}
        <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:hidden">
          {SHOWCASE_SCREENS.map((screen) => {
            const Icon = SCREEN_ICONS[screen.id] ?? Music;
            const isActive = screen.id === activeId;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveId(screen.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300",
                  isActive
                    ? "border-violet-core bg-violet-core/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/20 hover:text-ink",
                )}
              >
                <Icon size={13} className={isActive ? "text-lavender" : ""} />
                <span>{screen.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <h2 data-show-copy className="type-section mb-6 max-w-[14ch] text-ink">
              Designed for music lovers.
            </h2>
            <p data-show-copy className="type-lede mb-8 max-w-[44ch]">
              Five refined surfaces that cover how you listen — from full-bleed
              album art to real-time synchronized listening rooms with everyone on
              the same beat.
            </p>

            {/* Desktop Screen Switcher Tabs */}
            <div
              role="tablist"
              aria-label="App screens"
              className="hidden lg:flex flex-col"
            >
              {SHOWCASE_SCREENS.map((screen, index) => {
                const isActive = screen.id === activeId;
                const Icon = SCREEN_ICONS[screen.id] ?? Music;

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
                      "group relative flex items-center justify-between gap-4 border-b border-white/[0.07] py-4 text-left transition-all duration-300",
                      isActive
                        ? "text-ink bg-white/[0.03] px-3 -mx-3 rounded-xl border-transparent"
                        : "text-ink-muted hover:text-ink-soft hover:translate-x-1",
                    )}
                    style={{
                      transitionDelay: isActive ? "0ms" : `${index * 30}ms`,
                    }}
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-violet-core text-white shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                            : "bg-white/5 text-ink-muted group-hover:bg-white/10 group-hover:text-ink",
                        )}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="text-[1rem] font-medium tracking-tight">
                        {screen.label}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "font-mono text-[0.5625rem] tracking-[0.18em] transition-opacity uppercase",
                        isActive ? "text-violet-core opacity-100" : "opacity-0",
                      )}
                    >
                      {screen.id === "room" ? "CONNECTED" : "ACTIVE"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="showcase-panel"
              role="tabpanel"
              aria-live="polite"
              className="mt-6 min-h-[4rem] rounded-xl border border-white/6 bg-white/[0.02] p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={13} className="text-violet-core" />
                <span className="text-xs font-semibold text-ink">{active.title}</span>
              </div>
              <p className="text-[0.875rem] leading-relaxed text-ink-soft tracking-tight-body">
                {active.caption}
              </p>
            </div>
          </div>

          {/* Device Showcase View */}
          <div data-show-device className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -right-6 top-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-violet-core/20 blur-3xl sm:h-52 sm:w-52"
              />
              <div className="min-h-[32rem] w-full flex items-center justify-center lg:justify-end">
                <PhoneMockup width={302} className="animate-float-soft shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
                  <div ref={screenRef} className="h-full w-full">
                    <Screen />
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-14 max-w-[52ch] text-[0.75rem] leading-relaxed text-ink-muted">
          Screens shown are interactive interface reconstructions built for this website, reflecting the core layout and typography of MAHII.
        </p>
      </div>
    </section>
  );
}
