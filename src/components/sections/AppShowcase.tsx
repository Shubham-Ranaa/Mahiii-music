"use client";

import { useRef, useState } from "react";
import { Music, AlignLeft, Sliders, Disc, Users, Sparkles, Link2 } from "lucide-react";
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
  SpotifyScreen,
} from "@/components/ui/AppScreens";

const SCREEN_MAP: Record<string, () => React.JSX.Element> = {
  "now-playing": NowPlayingScreen,
  lyrics: LyricsScreen,
  equalizer: EqualizerScreen,
  library: LibraryScreen,
  room: RoomScreen,
  spotify: SpotifyScreen,
};

const SCREEN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "now-playing": Music,
  lyrics: AlignLeft,
  equalizer: Sliders,
  library: Disc,
  room: Users,
  spotify: Link2,
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
        scrollTrigger: { trigger: scope.current, start: "top 68%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-show-copy]"), {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.08,
      })
        .from(
          q("[data-show-device]"),
          {
            opacity: 0,
            y: 60,
            scale: 0.88,
            rotate: -3,
            duration: 1.2,
            ease: "expo.out",
          },
          0.12,
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
        { opacity: 0, scale: 1.04, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
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
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Dynamic ambient glow based on active screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-700"
        style={{
          background:
            activeId === "room"
              ? "radial-gradient(60% 50% at 50% 40%, rgba(168,85,247,0.2) 0%, transparent 70%)"
              : activeId === "equalizer"
                ? "radial-gradient(60% 50% at 50% 40%, rgba(34,211,238,0.14) 0%, transparent 70%)"
                : activeId === "lyrics"
                  ? "radial-gradient(60% 50% at 50% 40%, rgba(244,114,182,0.12) 0%, transparent 70%)"
                  : activeId === "spotify"
                    ? "radial-gradient(60% 50% at 50% 40%, rgba(29,185,84,0.16) 0%, transparent 70%)"
                    : "radial-gradient(60% 50% at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4 sm:mb-12 lg:mb-14">
          <span className="type-eyebrow">05 — The App Surfaces</span>
          <span className="flex-1 hairline" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] lg:items-center lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <h2 data-show-copy className="type-section mb-5 max-w-[13ch]">
              Designed for music lovers.
            </h2>
            <p data-show-copy className="type-lede mb-7 max-w-[42ch]">
              Six refined surfaces that cover how you listen — from full-bleed
              album art to real-time synchronized listening rooms, and a Spotify
              connection that brings your own playlists along.
            </p>

            {/* Mobile screen selector */}
            <div
              role="tablist"
              aria-label="App screens"
              className="mb-5 flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:hidden"
            >
              {SHOWCASE_SCREENS.map((screen) => {
                const Icon = SCREEN_ICONS[screen.id] ?? Music;
                const isActive = screen.id === activeId;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="showcase-panel"
                    onClick={() => setActiveId(screen.id)}
                    className={cn(
                      "flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-all duration-300",
                      isActive
                        ? "border-violet-core/60 bg-violet-core/15 text-ink shadow-[0_0_20px_rgba(168,85,247,0.18)]"
                        : "border-white/[0.08] bg-white/[0.025] text-ink-muted hover:border-white/20 hover:text-ink",
                    )}
                  >
                    <Icon
                      size={14}
                      className={isActive ? "text-lavender" : "text-ink-muted"}
                    />
                    <span>{screen.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop screen selector */}
            <div
              role="tablist"
              aria-label="App screens"
              className="hidden grid-cols-2 gap-2 lg:grid"
            >
              {SHOWCASE_SCREENS.map((screen) => {
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
                      "group relative flex min-h-[4.25rem] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300",
                      isActive
                        ? "border-violet-core/35 bg-violet-core/[0.08] text-ink shadow-[inset_0_0_24px_rgba(168,85,247,0.04)]"
                        : "border-white/[0.06] bg-white/[0.015] text-ink-muted hover:border-white/15 hover:bg-white/[0.035] hover:text-ink-soft",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-violet-core text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                          : "bg-white/[0.05] text-ink-muted group-hover:bg-white/10 group-hover:text-ink",
                      )}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.8125rem] font-medium tracking-tight">
                        {screen.label}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block font-mono text-[0.5rem] tracking-[0.16em] uppercase transition-colors",
                          isActive ? "text-violet-bright" : "text-ink-faint",
                        )}
                      >
                        {screen.id === "room" || screen.id === "spotify"
                          ? "CONNECTED"
                          : "EXPLORE SCREEN"}
                      </span>
                    </span>
                    <span className="sr-only">
                      {isActive ? "Selected" : "Select"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected screen details */}
            <div
              id="showcase-panel"
              role="tabpanel"
              aria-live="polite"
              aria-label={`${active.title} preview`}
              className="mt-4 rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-4 backdrop-blur-sm sm:p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-core/20 bg-violet-core/10 text-violet-bright">
                  <Sparkles size={14} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-mono uppercase tracking-[0.16em] text-ink-muted">
                    Now exploring
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-ink">
                    {active.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft tracking-tight-body sm:text-sm">
                {active.caption}
              </p>
            </div>
          </div>

          {/* Phone display */}
          <div data-show-device className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
              {/* Glow behind phone */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[42%] h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-core/20 blur-[90px] transition-all duration-700"
              />
              <div className="relative flex w-full items-center justify-center">
                <PhoneMockup
                  width={380}
                  className="animate-float-soft shadow-[0_35px_100px_rgba(0,0,0,0.9)]"
                  label="MAHII"
                >
                  <div ref={screenRef} className="h-full w-full">
                    <Screen />
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-[0.6875rem] leading-relaxed text-ink-muted lg:mt-6 lg:text-left">
          Screens shown are interactive interface reconstructions built for this website, reflecting the core layout and typography of MAHII.
        </p>
      </div>
    </section>
  );
}
