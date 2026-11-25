"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Music, AlignLeft, Sliders, Disc, Users, Link2 } from "lucide-react";
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

/**
 * A swipeable filmstrip of the app's surfaces. Deliberately a different
 * pattern from the Features section (tab list + sticky single device):
 * here every screen is visible as a card you scroll through, so the two
 * sections do not read as the same block repeated.
 */
export function AppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const total = SHOWCASE_SCREENS.length;
  const active = SHOWCASE_SCREENS[activeIndex] ?? SHOWCASE_SCREENS[0];

  /* Entrance — cards rise in together with the copy */
  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-show-copy], [data-show-device]"), {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 68%",
          end: "bottom 68%",
          toggleActions: "restart none restart none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-show-copy]"), {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.08,
      }).from(
        q("[data-show-device]"),
        {
          opacity: 0,
          y: 55,
          scale: 0.94,
          duration: 0.9,
          stagger: 0.08,
        },
        0.12,
      );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  const cards = useCallback(() => {
    const track = trackRef.current;
    return track ? (Array.from(track.children) as HTMLElement[]) : [];
  }, []);

  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    const items = cards();
    if (!track || items.length < 2) return;
    const step = items[1].offsetLeft - items[0].offsetLeft;
    if (!step) return;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(total - 1, Math.max(0, index)));
  }, [cards, total]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const items = cards();
      if (!track || !items.length) return;
      const next = Math.min(total - 1, Math.max(0, index));
      track.scrollTo({
        left: items[next].offsetLeft - items[0].offsetLeft,
        behavior: reduced ? "auto" : "smooth",
      });
      setActiveIndex(next);
    },
    [cards, reduced, total],
  );

  return (
    <section
      id="experience"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Dynamic ambient glow based on the current screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-700"
        style={{
          background:
            active.id === "room"
              ? "radial-gradient(60% 50% at 50% 40%, rgba(168,85,247,0.2) 0%, transparent 70%)"
              : active.id === "equalizer"
                ? "radial-gradient(60% 50% at 50% 40%, rgba(34,211,238,0.14) 0%, transparent 70%)"
                : active.id === "lyrics"
                  ? "radial-gradient(60% 50% at 50% 40%, rgba(244,114,182,0.12) 0%, transparent 70%)"
                  : active.id === "spotify"
                    ? "radial-gradient(60% 50% at 50% 40%, rgba(29,185,84,0.16) 0%, transparent 70%)"
                    : "radial-gradient(60% 50% at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4 sm:mb-14">
          <span data-show-copy className="type-eyebrow">05 — The App Surfaces</span>
          <span className="flex-1 hairline" />
        </div>

        {/* Intro — kept brief; the gallery is the main event now */}
        <div className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-end lg:gap-16">
          <h2 data-show-copy className="type-section max-w-[15ch]">
            Designed for
            <br />
            <span className="text-gradient-violet">music lovers.</span>
          </h2>
          <p data-show-copy className="type-lede max-w-[44ch] lg:pb-2">
            Six refined surfaces that cover how you listen — from full-bleed
            album art to synchronized rooms and your own Spotify playlists.
          </p>
        </div>

        {/* Gallery controls — above the filmstrip so they read first */}
        <div data-show-copy className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-muted">
              Now exploring
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-ink sm:text-base">
              {active.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-muted">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous screen"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors hover:border-violet-core/50 hover:text-ink disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-ink-soft"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === total - 1}
                aria-label="Next screen"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft transition-colors hover:border-violet-core/50 hover:text-ink disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-ink-soft"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Filmstrip */}
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          role="group"
          aria-label="MAHII app screens"
          className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-4 sm:gap-6"
          style={{ scrollPaddingLeft: "clamp(1.25rem, 4vw, 3.5rem)" }}
        >
          {SHOWCASE_SCREENS.map((screen, index) => {
            const Icon = SCREEN_ICONS[screen.id] ?? Music;
            const Screen = SCREEN_MAP[screen.id] ?? NowPlayingScreen;
            const isActive = index === activeIndex;

            return (
              <article
                key={screen.id}
                data-show-device
                className={cn(
                  "group w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[320px]",
                  "rounded-2xl border p-3 transition-all duration-300 sm:p-4",
                  isActive
                    ? "border-violet-core/35 bg-white/[0.035] shadow-[0_0_40px_-18px_rgba(168,85,247,0.5)]"
                    : "border-white/[0.06] bg-white/[0.015] hover:border-white/15",
                )}
              >
                {/* Device */}
                <div className="flex justify-center">
                  <PhoneMockup width={260} glow={false} className="transition-transform duration-500 group-hover:-translate-y-1">
                    <Screen />
                  </PhoneMockup>
                </div>

                {/* Caption */}
                <div className="px-1 pb-1 pt-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-violet-core/15 text-lavender"
                          : "bg-white/[0.05] text-ink-muted",
                      )}
                    >
                      <Icon size={14} aria-hidden />
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight text-ink">
                    {screen.title}
                  </h3>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-ink-soft">
                    {screen.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Progress line */}
        <div
          role="progressbar"
          aria-label="App screens progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={activeIndex + 1}
          className="mt-5 h-px w-full bg-white/[0.08]"
        >
          <div
            className="h-px bg-gradient-to-r from-violet-core to-lavender transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-[0.6875rem] leading-relaxed text-ink-muted lg:text-left">
          Screens shown are interactive interface reconstructions built for this website, reflecting the core layout and typography of MAHII.
        </p>
      </div>
    </section>
  );
}
