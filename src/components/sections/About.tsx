"use client";

import { Fragment, type CSSProperties } from "react";
import {
  useScrollReveal,
  useWordScrollReveal,
  useDrift,
} from "@/animations/scrollAnimations";
import { Radio, Sliders, Code2, Zap, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

/**
 * The statement is split into tokens so a few words can carry the accent
 * gradient. `*` marks a word as accented.
 */
const STATEMENT_TOKENS: Array<{ text: string; accent?: boolean }> = [
  { text: "MAHII" },
  { text: "is" },
  { text: "a" },
  { text: "modern" },
  { text: "Android" },
  { text: "music" },
  { text: "experience" },
  { text: "designed" },
  { text: "around" },
  { text: "music," },
  { text: "personalization", accent: true },
  { text: "and" },
  { text: "shared", accent: true },
  { text: "moments.", accent: true },
];

const BODY =
  "From discovering your next favourite song to enjoying synchronized listening sessions with friends, MAHII brings your music experience together in one place.";

const SUPPORT =
  "Built with a genuine passion for Android development, sound engineering and seamless shared listening.";

const STATS = [
  {
    icon: Radio,
    value: "0",
    unit: "ms",
    label: "Sync latency",
    desc: "Rooms stay locked to the beat in real time.",
    detail:
      "Everyone in the room hears the same moment together, so the beat never drifts between friends.",
    accent: "emerald" as const,
  },
  {
    icon: Sliders,
    value: "32",
    unit: "-bit",
    label: "Audio pipeline",
    desc: "Hi-Res decoding with a full equalizer engine.",
    detail:
      "Fine-tune your sound with a full equalizer and enjoy detailed, high-resolution playback.",
    accent: "violet" as const,
  },
  {
    icon: Code2,
    value: "100",
    unit: "%",
    label: "Open foundation",
    desc: "GPL-3.0 derived, built in the open.",
    detail:
      "Explore the code, learn from the project, and build on an open foundation with GPL-3.0 roots.",
    accent: "amber" as const,
  },
  {
    icon: Zap,
    value: "0",
    unit: "Ads",
    label: "Distraction free",
    desc: "Nothing between you and the record.",
    detail:
      "No ad breaks or promotional interruptions. Just your library, your queue, and the music.",
    accent: "rose" as const,
  },
];

const WAVEFORM = [
  28, 42, 65, 38, 76, 52, 33, 88, 58, 40, 72, 96, 48, 32, 62, 82, 45, 70,
  36, 92, 54, 30, 68, 84, 43, 74, 52, 98, 38, 64, 46, 78, 34, 58, 90, 42,
  70, 50, 32, 82,
];

/** Icon chip + metric colour per accent. */
const ACCENTS: Record<
  string,
  {
    chip: string;
    metric: string;
    bar: string;
    glow: string;
    glowColor: string;
  }
> = {
  emerald: {
    chip: "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 group-hover:text-emerald-300",
    metric: "group-hover:text-emerald-300",
    bar: "from-emerald-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(52,211,153,0.45)]",
    glowColor: "rgba(52,211,153,0.28)",
  },
  violet: {
    chip: "bg-violet-core/10 text-lavender group-hover:bg-violet-core/20 group-hover:text-white",
    metric: "group-hover:text-lavender",
    bar: "from-violet-core/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(168,85,247,0.45)]",
    glowColor: "rgba(168,85,247,0.28)",
  },
  amber: {
    chip: "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 group-hover:text-amber-300",
    metric: "group-hover:text-amber-300",
    bar: "from-amber-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(251,191,36,0.4)]",
    glowColor: "rgba(251,191,36,0.24)",
  },
  rose: {
    chip: "bg-rose-400/10 text-rose-400 group-hover:bg-rose-400/20 group-hover:text-rose-300",
    metric: "group-hover:text-rose-300",
    bar: "from-rose-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(244,114,182,0.4)]",
    glowColor: "rgba(244,114,182,0.24)",
  },
};

export function About() {
  const driftScope = useDrift<HTMLDivElement>(80);
  const revealScope = useScrollReveal<HTMLDivElement>();
  const wordScope = useWordScrollReveal<HTMLParagraphElement>();

  return (
    <section id="about" className="relative isolate overflow-hidden section-pad">
      {/* Ambient background glows */}
      <div
        ref={driftScope}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          data-drift="1.5"
          className="absolute left-[-10%] top-[8%] h-[42vw] w-[42vw] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          data-drift="0.8"
          className="absolute right-[-8%] bottom-[4%] h-[30vw] w-[30vw] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(52,211,153,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4 sm:mb-14">
          <span className="type-eyebrow">02 — Philosophy</span>
          <span className="flex-1 hairline" />
          <span className="hidden font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted sm:inline">
            LISTEN WITHOUT LIMITS
          </span>
        </div>

        {/* Editorial intro */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-end lg:gap-16">
          <div ref={revealScope}>
            <h2 className="type-section max-w-[16ch] !text-[clamp(2.75rem,6.4vw,6rem)] !leading-[0.94] !tracking-[-0.065em]">
              More than just a
              <br />
              <span className="text-gradient-violet">music player.</span>
            </h2>
          </div>

          <div
            data-reveal
            className="relative lg:border-l lg:border-white/[0.08] lg:pl-10 xl:pl-14"
          >
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-violet-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-bright shadow-[0_0_12px_rgba(192,132,252,0.9)]" />
              MADE FOR YOUR NEXT REPEAT
            </span>
            <p className="type-lede max-w-[46ch]">{BODY}</p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
              {SUPPORT}
            </p>
            <a
              href="#features"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] py-2.5 pl-4 pr-3 text-sm font-medium text-lavender transition-all duration-300 hover:border-violet-core/40 hover:bg-violet-core/10 hover:text-white"
            >
              Explore the features
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Statement — the editorial pull of the section */}
        <div className="relative mt-12 border-y border-white/[0.07] py-7 pl-6 sm:mt-16 sm:py-9 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-bright via-violet-core/30 to-transparent"
          />
          <p
            ref={wordScope}
            className="max-w-[52ch] text-[clamp(1.35rem,2.7vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.04em]"
          >
            {STATEMENT_TOKENS.map((word, i, words) => (
              <Fragment key={i}>
                <span
                  data-word
                  className={cn(
                    "inline-block",
                    // A solid accent rather than the gradient: the gradient is
                    // painted per word, and three separate sweeps read as
                    // three unrelated highlights instead of one phrase.
                    word.accent ? "text-violet-bright" : "text-ink",
                  )}
                >
                  {word.text}
                </span>
                {/* The separator lives outside the inline-block: trailing
                    whitespace inside one is trimmed by the browser, which
                    collapsed every space in the statement. */}
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        </div>

        {/* One hero signal, backed by three quick-scan proof points */}
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-9 lg:min-h-[28rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-3">
          <li
            tabIndex={0}
            role="group"
            aria-label={`${STATS[0].label}: ${STATS[0].value} ${STATS[0].unit}`}
            className="premium-card group relative rounded-[1.5rem] focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 lg:row-span-3"
            style={{ "--card-glow": "rgba(52,211,153,0.28)" } as CSSProperties}
          >
            <SpotlightCard
              intent="emerald"
              className="premium-card-surface relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.5rem] p-6 transition-all duration-700 hover:border-emerald-400/50 sm:p-8 lg:min-h-0 lg:p-6 xl:p-8"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-400/[0.09] blur-[90px] transition-all duration-700 group-hover:scale-125 group-hover:bg-emerald-300/[0.2]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(135deg,black,transparent_75%)]"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 font-mono text-[0.5625rem] tracking-[0.16em] text-emerald-200 sm:text-[0.625rem]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </span>
                    LISTENING IN SYNC
                  </span>
                  <p className="mt-6 font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted sm:mt-8">
                    LATENCY, ROOM TO ROOM
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-[clamp(4rem,8vw,7.5rem)] font-medium leading-none tracking-[-0.09em] text-ink transition-colors duration-300 group-hover:text-emerald-50">
                      {STATS[0].value}
                    </span>
                    <span className="font-mono text-lg text-emerald-200/70 sm:text-2xl">
                      {STATS[0].unit}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-medium tracking-tight text-ink sm:text-lg">
                    {STATS[0].label}
                  </h3>
                  <p className="mt-1 max-w-[34ch] text-xs leading-relaxed text-ink-soft sm:text-sm">
                    {STATS[0].desc} Every shared session stays locked to the beat.
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-300 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-12 sm:w-12">
                  <Radio size={18} strokeWidth={1.7} aria-hidden />
                </span>
              </div>

              <div className="relative mt-8">
                <div className="mb-3 flex items-center justify-between font-mono text-[0.5625rem] tracking-[0.16em] text-ink-muted sm:text-[0.625rem]">
                  <span>ROOM 001</span>
                  <span className="text-emerald-200/80">SIGNAL STABLE</span>
                  <span>LIVE</span>
                </div>
                <div
                  aria-hidden="true"
                  className="flex h-16 items-center gap-[3px] overflow-hidden border-y border-white/[0.07] py-3 sm:h-[4.5rem] sm:gap-1"
                >
                  {WAVEFORM.map((height, index) => (
                    <span
                      key={index}
                      className="min-w-[2px] flex-1 rounded-full bg-gradient-to-t from-emerald-500/30 via-emerald-300 to-white/80 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        height: `${height}%`,
                        transformOrigin: "center",
                        animation: `wave-pulse ${0.72 + (index % 6) * 0.16}s ease-in-out ${(index % 8) * 0.07}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[0.6875rem] text-ink-soft sm:text-xs">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-300/15 font-mono text-[0.5rem] text-emerald-200">
                    M
                  </span>
                  You and your people, perfectly on beat.
                </div>
              </div>

              <div className="card-detail-reveal pointer-events-none border-emerald-300/15 bg-[#06110f]/95 shadow-[0_12px_40px_rgba(0,0,0,0.4)] sm:inset-x-6 sm:bottom-6 sm:p-5">
                <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-emerald-200">
                  INSIDE THE EXPERIENCE
                </span>
                <p className="mt-2 max-w-[44ch] text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {STATS[0].detail}
                </p>
              </div>
            </SpotlightCard>
          </li>

          {STATS.slice(1).map((s, index) => {
            const Icon = s.icon;
            const accent = ACCENTS[s.accent];

            return (
              <li
                key={s.label}
                tabIndex={0}
                role="group"
                aria-label={`${s.label}: ${s.value} ${s.unit}`}
                className={cn(
                  "premium-card group relative min-w-0 rounded-2xl focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-bright",
                  "lg:col-span-1",
                )}
                style={{ "--card-glow": accent.glowColor } as CSSProperties}
              >
                <SpotlightCard
                  intent={s.accent}
                  className={cn(
                    "premium-card-surface relative flex h-full min-h-[8.8rem] items-center justify-between gap-3 overflow-hidden rounded-2xl p-4 transition-all duration-700 group-hover:border-violet-core/35 sm:min-h-[9.5rem] sm:p-5 lg:px-6",
                    accent.glow,
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "premium-card-accent absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent",
                      accent.bar,
                    )}
                  />
                  <div className="min-w-0">
                    <span className="font-mono text-[0.5625rem] tracking-[0.16em] text-ink-muted">
                      0{index + 2} / THE DETAILS
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span
                        className={cn(
                          "font-mono text-[1.7rem] font-medium leading-none tracking-[-0.07em] text-ink transition-colors duration-300 sm:text-[2rem]",
                          accent.metric,
                        )}
                      >
                        {s.value}
                      </span>
                      <span className="font-mono text-xs text-ink-muted sm:text-sm">
                        {s.unit}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[0.8125rem] font-semibold tracking-tight text-ink sm:text-sm">
                      {s.label}
                    </h3>
                    <p className="mt-1 text-[0.6875rem] leading-relaxed text-ink-soft sm:text-xs">
                      {s.desc}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-xl transition-all duration-300 group-hover:scale-110 sm:h-10 sm:w-10",
                      accent.chip,
                    )}
                  >
                    <Icon size={16} aria-hidden />
                  </span>
                  <div className="card-detail-reveal pointer-events-none border-white/[0.1] bg-[#100e16]/[0.97] shadow-[0_16px_45px_rgba(0,0,0,0.55)] sm:inset-x-3 sm:bottom-3 sm:p-4">
                    <span className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-muted">
                      INSIDE THE EXPERIENCE
                    </span>
                    <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-soft sm:text-xs">
                      {s.detail}
                    </p>
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
