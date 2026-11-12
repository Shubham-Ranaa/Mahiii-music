"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Smartphone, QrCode, Play, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { AlbumArtwork, type ArtworkTone } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { InteractiveNowPlaying, DEMO_TRACKS, type Track } from "@/components/ui/InteractiveNowPlaying";
import { DownloadQRModal } from "@/components/ui/DownloadQRModal";
import { useHeroAnimation, useMouseParallax } from "@/animations/heroAnimations";
import { DOWNLOAD_URL, DOWNLOAD_SECTION_ID, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const FLOATING_ART: Array<{
  trackIndex: number;
  tone: ArtworkTone;
  title: string;
  variant: number;
  className: string;
  depth: number;
  delay: string;
  size: string;
}> = [
  {
    trackIndex: 1,
    tone: "ember",
    title: "Golden Hour",
    variant: 1,
    className: "left-[3%] top-[15%]",
    depth: 1.6,
    delay: "0s",
    size: "w-[72px] sm:w-[90px] lg:w-[110px]",
  },
  {
    trackIndex: 2,
    tone: "tide",
    title: "Low Tide",
    variant: 2,
    className: "right-[2%] top-[8%]",
    depth: 1.1,
    delay: "1.2s",
    size: "w-[60px] sm:w-[78px] lg:w-[94px]",
  },
  {
    trackIndex: 0,
    tone: "rose",
    title: "Neon Letters",
    variant: 0,
    className: "right-[7%] bottom-[14%]",
    depth: 2,
    delay: "0.6s",
    size: "w-[66px] sm-w-[84px] lg:w-[102px]",
  },
  {
    trackIndex: 1,
    tone: "moss",
    title: "Field Notes",
    variant: 1,
    className: "left-[7%] bottom-[8%]",
    depth: 1.3,
    delay: "1.8s",
    size: "w-[54px] sm:w-[70px] lg:w-[86px]",
  },
];

export function Hero() {
  const scope = useHeroAnimation();
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useMouseParallax(scope, isDesktop && !reduced, pointerInside);

  return (
    <section
      id="top"
      ref={scope}
      className="grain relative isolate overflow-hidden pb-16 pt-[calc(var(--nav-h)+2rem)] sm:pb-24 lg:min-h-[100svh] lg:pb-0"
    >
      {/* Ambient light field - richer glows */}
      <div
        aria-hidden
        data-hero-glow
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-[-25%] h-[80vh] w-[120vw] -translate-x-1/2 animate-drift-glow rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.4) 0%, rgba(168,85,247,0.18) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[22%] h-[52vh] w-[52vh] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[-10%] bottom-[10%] h-[40vh] w-[40vh] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(244,114,182,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Ambient floating dust particles */}
        <div className="absolute inset-0 opacity-50">
          <span className="absolute top-[18%] left-[12%] h-1 w-1 rounded-full bg-lavender/70 animate-ping-slow" />
          <span className="absolute top-[42%] right-[22%] h-1.5 w-1.5 rounded-full bg-violet-core/70 animate-float-soft" />
          <span className="absolute top-[72%] left-[28%] h-1 w-1 rounded-full bg-white/50 animate-drift-glow" />
          <span className="absolute top-[28%] right-[8%] h-2 w-2 rounded-full bg-violet-deep/60 blur-[1px] animate-float-strong" />
          <span className="absolute top-[60%] left-[45%] h-1 w-1 rounded-full bg-amber-400/50 animate-float-soft-delayed" />
        </div>
      </div>

      {/* Waveform behind composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[36%] -z-10 hidden opacity-[0.18] lg:block"
      >
        <AudioWaveform bars={80} height={280} />
      </div>

      {/* Subtle grid overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-full w-full opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%)",
        }}
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.84fr)] lg:gap-6">
        {/* ---------------- Copy ---------------- */}
        <div className="relative z-10 max-w-[32rem] sm:max-w-[36rem]">
          {/* Status Badge - more premium */}
          <div className="mb-6">
            <span
              data-hero-wordmark
              className="inline-flex items-center gap-2.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-4 py-1.5 text-[0.6875rem] font-medium tracking-wide text-lavender backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.25)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-violet-core opacity-70 animate-ping-slow" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-core" />
              </span>
              Android Music Experience · v2.4 Beta
            </span>
          </div>

          {/* Main headline - larger and more dramatic */}
          <h1 className="type-display mb-5">
            <span className="mask-line">
              <span data-hero-line className="text-gradient-violet">
                MAHII
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p className="type-hero mb-5 max-w-[22ch]">
            <span className="mask-line">
              <span data-hero-line>Music. Memories.</span>
            </span>
            <span className="mask-line">
              <span data-hero-line className="text-gradient-violet">
                Together.
              </span>
            </span>
          </p>

          {/* Sub-tagline */}
          <p
            data-hero-fade
            className="mb-3 text-[1.0625rem] font-medium tracking-tight text-lavender/90"
          >
            Your music. Your moments. Your people.
          </p>

          {/* Description */}
          <p data-hero-fade className="type-lede mb-8 max-w-[44ch]">
            Discover music, enjoy synchronized lyrics, customize your equalizer
            curve and host shared listening rooms with friends across the globe.
          </p>

          {/* Action CTAs - more premium layout */}
          <div
            data-hero-fade
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <ButtonLink
              href={DOWNLOAD_SECTION_ID}
              size="lg"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-core to-violet-deep px-8 py-3.5 text-base font-medium text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] hover:scale-[1.03] active:scale-[0.98] group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Smartphone size={17} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10">Download MAHII</span>
            </ButtonLink>

            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-violet-core/50 hover:bg-white/[0.05] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] active:scale-[0.98]"
            >
              <QrCode size={15} className="text-lavender" />
              Scan QR
            </button>

            <ButtonLink href="#features" variant="outline" size="lg" className="rounded-full">
              Explore Features
              <ArrowUpRight size={15} strokeWidth={2} />
            </ButtonLink>
          </div>

          {/* Feature chips */}
          <div data-hero-fade className="mt-6 flex items-center gap-4 text-[0.75rem] text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Free personal build
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Android 8.0 &amp; above</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>100% Ad-free</span>
          </div>
        </div>

        {/* ---------------- Device composition ---------------- */}
        <div className="relative z-0 flex flex-col items-center justify-center lg:justify-end">
          {/* Interactive Mockup Hint Pill */}
          <div className="mb-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.625rem] text-ink-muted backdrop-blur-md animate-pulse-subtle">
            <Sparkles size={10} className="text-violet-core" />
            <span>Interactive Demo · Tap player to test</span>
          </div>

          <div
            data-hero-phone
            data-parallax="0.5"
            className="relative"
            style={{ perspective: 1400 }}
            onPointerEnter={() => setPointerInside(true)}
            onPointerLeave={() => setPointerInside(false)}
          >
            {/* Glow behind phone */}
            <div
              className="absolute -inset-10 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.12) 50%, transparent 70%)",
                animation: "drift-glow 16s ease-in-out infinite",
              }}
            />

            <PhoneMockup
              width={280}
              className="animate-float-soft"
              label="MAHII Player"
            >
              <InteractiveNowPlaying
                key={activeTrackIndex}
                initialTrackIndex={activeTrackIndex}
                onTrackChange={(t) => {
                  const idx = DEMO_TRACKS.findIndex((x) => x.id === t.id);
                  if (idx !== -1) setActiveTrackIndex(idx);
                }}
              />
            </PhoneMockup>

            {/* Floating artwork - more interactive */}
            {FLOATING_ART.map((art) => (
              <button
                key={art.title}
                type="button"
                onClick={() => setActiveTrackIndex(art.trackIndex)}
                title={`Play ${art.title} in demo phone`}
                data-hero-art
                data-parallax={String(art.depth)}
                className={cn(
                  "group absolute",
                  art.className,
                  art.size,
                  "hidden lg:block cursor-pointer"
                )}
                style={{
                  animation: `float-soft ${7 + art.depth}s ease-in-out ${art.delay} infinite`,
                }}
              >
                <AlbumArtwork
                  tone={art.tone}
                  title={art.title}
                  variant={art.variant}
                  rounded="rounded-xl"
                  className={cn(
                    "aspect-square w-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] transition-all duration-300",
                    "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]",
                    "group-hover:ring-2 group-hover:ring-violet-core",
                    "group-hover:scale-105",
                  )}
                />
                {/* Hover label */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.5625rem] font-mono tracking-wider text-lavender whitespace-nowrap bg-void/80 px-2 py-0.5 rounded-full border border-white/10">
                  ▶ Tap to play
                </span>
              </button>
            ))}
          </div>

          {/* Mobile track selector - refined */}
          <div className="mt-5 flex w-full flex-col items-center gap-2 lg:hidden">
            <span className="text-[0.625rem] uppercase tracking-wider text-ink-muted">
              Select Demo Track:
            </span>
            <div className="flex w-full items-center justify-center gap-2 px-2">
              {DEMO_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTrackIndex(idx)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-300 active:scale-95",
                    activeTrackIndex === idx
                      ? "border-violet-core/60 bg-violet-core/15 text-lavender shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "border-white/10 bg-white/[0.03] text-ink-soft hover:border-white/20 hover:text-ink",
                  )}
                >
                  <AlbumArtwork
                    tone={t.tone}
                    title=""
                    variant={t.variant}
                    rounded="rounded"
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="truncate text-[0.6875rem]">{t.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <DownloadQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Scroll cue - refined */}
      <div
        data-hero-scroll
        className="shell mt-14 flex items-center gap-3 pb-8 lg:flex"
      >
        <a
          href="#about"
          aria-label="Scroll down"
          className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/12 text-ink-muted transition-all duration-300 hover:border-violet-core/50 hover:text-lavender hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <ArrowDown
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-500 group-hover:translate-y-0.5"
          />
        </a>
        <span className="type-eyebrow">Scroll to explore</span>
      </div>
    </section>
  );
}
