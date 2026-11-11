"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Smartphone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { AlbumArtwork, type ArtworkTone } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { NowPlayingScreen } from "@/components/ui/AppScreens";
import { useHeroAnimation, useMouseParallax } from "@/animations/heroAnimations";
import { DOWNLOAD_URL, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FLOATING_ART: Array<{
  tone: ArtworkTone;
  title: string;
  variant: number;
  className: string;
  depth: number;
  delay: string;
  size: string;
}> = [
  {
    tone: "ember",
    title: "Golden Hour",
    variant: 1,
    className: "left-[2%] top-[16%]",
    depth: 1.6,
    delay: "0s",
    size: "w-[76px] sm:w-[92px] lg:w-[112px]",
  },
  {
    tone: "tide",
    title: "Low Tide",
    variant: 2,
    className: "right-[1%] top-[10%]",
    depth: 1.1,
    delay: "1.2s",
    size: "w-[64px] sm:w-[80px] lg:w-[96px]",
  },
  {
    tone: "rose",
    title: "Neon Letters",
    variant: 0,
    className: "right-[6%] bottom-[16%]",
    depth: 2,
    delay: "0.6s",
    size: "w-[70px] sm:w-[86px] lg:w-[104px]",
  },
  {
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

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useMouseParallax(scope, isDesktop && !reduced);

  return (
    <section
      id="top"
      ref={scope}
      className="grain relative isolate overflow-hidden pb-16 pt-[calc(var(--nav-h)+2rem)] sm:pb-24 lg:min-h-[100svh] lg:pb-0"
    >
      {/* Ambient light field */}
      <div
        aria-hidden
        data-hero-glow
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-[-18%] h-[70vh] w-[110vw] -translate-x-1/2 animate-drift-glow rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.30) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[26%] h-[46vh] w-[46vh] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.14) 0%, transparent 70%)",
          }}
        />
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
        <div className="relative z-10 max-w-[36rem]">
          <div className="mask-line mb-5">
            <span
              data-hero-wordmark
              className="type-eyebrow inline-flex items-center gap-3 text-lavender"
            >
              <span className="h-1 w-1 rounded-full bg-violet-core" />
              Android · Music Experience
            </span>
          </div>

          <h1 className="type-display mb-6 text-ink">
            <span className="mask-line">
              <span data-hero-line>MAHII</span>
            </span>
          </h1>

          <p className="type-hero mb-5 max-w-[24ch] text-ink">
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

          <p data-hero-fade className="type-lede mb-9 max-w-[46ch]">
            Discover music, enjoy beautiful lyrics, customize your listening
            experience and share your favourite songs with people who matter.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <ButtonLink
              href={DOWNLOAD_URL}
              external={IS_EXTERNAL_DOWNLOAD}
              size="lg"
            >
              <Smartphone size={17} strokeWidth={2} />
              Download MAHII
            </ButtonLink>
            <ButtonLink href="#features" variant="outline" size="lg">
              Explore Features
              <ArrowUpRight size={16} strokeWidth={2} />
            </ButtonLink>
          </div>

          <p data-hero-fade className="mt-6 text-[0.75rem] text-ink-muted">
            Free personal build · Android 8.0 and above
          </p>
        </div>

        {/* ---------------- Device composition ---------------- */}
        <div className="relative z-0 flex flex-col items-center justify-center lg:justify-end">
          <div
            data-hero-phone
            data-parallax="0.55"
            className="relative"
            style={{ perspective: 1200 }}
          >
            <PhoneMockup width={286} className="animate-float-soft">
              <NowPlayingScreen />
            </PhoneMockup>

            {/* Floating artwork, desktop + mobile */}
            {FLOATING_ART.map((art) => (
              <div
                key={art.title}
                data-hero-art
                data-parallax={String(art.depth)}
                className={`absolute ${art.className} ${art.size} hidden sm:block`}
                style={{ animation: `float-soft ${7 + art.depth}s ease-in-out ${art.delay} infinite` }}
              >
                <AlbumArtwork
                  tone={art.tone}
                  title={art.title}
                  variant={art.variant}
                  rounded="rounded-xl"
                  className="aspect-square w-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]"
                />
              </div>
            ))}
          </div>

          {/* Mobile-only art strip: no absolute positioning, no overflow */}
          <div className="mt-8 flex w-full items-center justify-center gap-3 sm:hidden">
            {FLOATING_ART.slice(0, 3).map((art) => (
              <AlbumArtwork
                key={`m-${art.title}`}
                tone={art.tone}
                title={art.title}
                variant={art.variant}
                rounded="rounded-lg"
                className="h-16 w-16 shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="shell mt-14 hidden items-center gap-3 pb-10 lg:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-ink-muted">
          <ArrowDown size={14} strokeWidth={1.75} />
        </span>
        <span className="type-eyebrow">Scroll to explore</span>
      </div>
    </section>
  );
}
