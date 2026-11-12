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
    className: "left-[2%] top-[16%]",
    depth: 1.6,
    delay: "0s",
    size: "w-[76px] sm:w-[92px] lg:w-[112px]",
  },
  {
    trackIndex: 2,
    tone: "tide",
    title: "Low Tide",
    variant: 2,
    className: "right-[1%] top-[10%]",
    depth: 1.1,
    delay: "1.2s",
    size: "w-[64px] sm:w-[80px] lg:w-[96px]",
  },
  {
    trackIndex: 0,
    tone: "rose",
    title: "Neon Letters",
    variant: 0,
    className: "right-[6%] bottom-[16%]",
    depth: 2,
    delay: "0.6s",
    size: "w-[70px] sm:w-[86px] lg:w-[104px]",
  },
  {
    trackIndex: 1,
    tone: "moss",
    title: "Field Notes",
    variant: 1,
    className: "left-[6%] bottom-[10%]",
    depth: 1.3,
    delay: "1.8s",
    size: "w-[58px] sm:w-[72px] lg:w-[88px]",
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
      className="grain relative isolate overflow-hidden pb-14 pt-[calc(var(--nav-h)+2rem)] sm:pb-22 lg:min-h-[100svh] lg:pb-0"
    >
      {/* Ambient light field */}
      <div
        aria-hidden
        data-hero-glow
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-[-20%] h-[72vh] w-[115vw] -translate-x-1/2 animate-drift-glow rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.36) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-8%] top-[24%] h-[48vh] w-[48vh] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Ambient floating dust particles */}
        <div className="absolute inset-0 opacity-40">
          <span className="absolute top-[20%] left-[15%] h-1 w-1 rounded-full bg-lavender/60 animate-ping-slow" />
          <span className="absolute top-[45%] right-[25%] h-1.5 w-1.5 rounded-full bg-violet-core/60 animate-float-soft" />
          <span className="absolute top-[75%] left-[30%] h-1 w-1 rounded-full bg-white/40 animate-drift-glow" />
          <span className="absolute top-[30%] right-[10%] h-2 w-2 rounded-full bg-violet-deep/50 blur-[1px] animate-float-strong" />
        </div>
      </div>

      {/* Waveform behind composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[38%] -z-10 hidden opacity-[0.22] lg:block"
      >
        <AudioWaveform bars={72} height={260} />
      </div>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-8">
        {/* ---------------- Copy ---------------- */}
        <div className="relative z-10 max-w-[34rem] sm:max-w-[38rem]">
          {/* Status Badge */}
          <div className="mask-line mb-5">
            <span
              data-hero-wordmark
              className="inline-flex items-center gap-2.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-3.5 py-1 text-[0.6875rem] font-medium tracking-wide text-lavender backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-violet-core opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-core" />
              </span>
              Android Music Experience · v2.4 Beta
            </span>
          </div>

          <h1 className="type-display mb-5 text-ink">
            <span className="mask-line">
              <span data-hero-line>MAHII</span>
            </span>
          </h1>

          <p className="type-hero mb-4 max-w-[24ch] text-ink">
            <span className="mask-line">
              <span data-hero-line>Music. Memories.</span>
            </span>
            <span className="mask-line">
              <span data-hero-line className="text-violet-gradient">
                Together.
              </span>
            </span>
          </p>

          <p
            data-hero-fade
            className="mb-2 text-[1.0625rem] font-medium tracking-tight text-lavender/90"
          >
            Your music. Your moments. Your people.
          </p>

          <p data-hero-fade className="type-lede mb-7 max-w-[46ch]">
            Discover music, enjoy synchronized lyrics, customize your equalizer
            curve and host shared listening rooms with friends across the globe.
          </p>

          {/* Action CTAs */}
          <div
            data-hero-fade
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {IS_EXTERNAL_DOWNLOAD ? (
              <ButtonLink
                href={DOWNLOAD_URL}
                external
                size="lg"
                className="shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
              >
                <Smartphone size={17} strokeWidth={2} />
                Download MAHII
              </ButtonLink>
            ) : (
              <ButtonLink
                href={DOWNLOAD_SECTION_ID}
                size="lg"
                className="shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
              >
                <Smartphone size={17} strokeWidth={2} />
                Download MAHII
              </ButtonLink>
            )}

            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-ink transition-all hover:border-violet-core/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]"
            >
              <QrCode size={16} className="text-lavender" />
              Scan QR
            </button>

            <ButtonLink href="#features" variant="outline" size="lg">
              Explore Features
              <ArrowUpRight size={16} strokeWidth={2} />
            </ButtonLink>
          </div>

          <div data-hero-fade className="mt-5 sm:mt-6 flex items-center gap-4 text-[0.75rem] text-ink-muted">
            <span>Free personal build</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Android 8.0 &amp; above</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>100% Ad-free</span>
          </div>
        </div>

        {/* ---------------- Device composition ---------------- */}
        <div className="relative z-0 flex flex-col items-center justify-center lg:justify-end">
          {/* Interactive Mockup Hint Pill */}
          <div className="mb-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.625rem] text-ink-muted backdrop-blur-md animate-pulse-subtle">
            <Sparkles size={11} className="text-violet-core" />
            <span>Interactive Demo · Tap player to test</span>
          </div>

          <div
            data-hero-phone
            data-parallax="0.5"
            className="relative"
            style={{ perspective: 1200 }}
            onPointerEnter={() => setPointerInside(true)}
            onPointerLeave={() => setPointerInside(false)}
          >
            <PhoneMockup width={278} className="animate-float-soft">
              <InteractiveNowPlaying
                key={activeTrackIndex}
                initialTrackIndex={activeTrackIndex}
                onTrackChange={(t) => {
                  const idx = DEMO_TRACKS.findIndex((x) => x.id === t.id);
                  if (idx !== -1) setActiveTrackIndex(idx);
                }}
              />
            </PhoneMockup>

            {/* Floating artwork, desktop only - clickable to load into phone! */}
            {FLOATING_ART.map((art) => (
              <button
                key={art.title}
                type="button"
                onClick={() => setActiveTrackIndex(art.trackIndex)}
                title={`Play ${art.title} in demo phone`}
                data-hero-art
                data-parallax={String(art.depth)}
                className={`group absolute ${art.className} ${art.size} hidden lg:block cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95`}
                style={{ animation: `float-soft ${7 + art.depth}s ease-in-out ${art.delay} infinite` }}
              >
                <AlbumArtwork
                  tone={art.tone}
                  title={art.title}
                  variant={art.variant}
                  rounded="rounded-xl"
                  className="aspect-square w-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] transition-all group-hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] group-hover:ring-2 group-hover:ring-lavender"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[0.5625rem] font-mono tracking-wider text-lavender whitespace-nowrap bg-void/80 px-2 py-0.5 rounded-full border border-white/10">
                  ▶ Tap to play
                </span>
              </button>
            ))}
          </div>

          {/* Mobile track selector strip — interactive tactile selector */}
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
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-medium transition-all duration-300 active:scale-95",
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

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="shell mt-12 flex items-center gap-3 pb-8 lg:flex"
      >
        <a
          href="#about"
          aria-label="Scroll down"
          className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/12 text-ink-muted transition-colors duration-300 hover:border-violet-core/50 hover:text-lavender"
        >
          <ArrowDown
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-500 group-hover:translate-y-0.5"
          />
        </a>
        <span className="type-eyebrow">Scroll to explore</span>
      </div>
    </section>
  );
}
