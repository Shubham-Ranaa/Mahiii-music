"use client";

import { Fragment } from "react";
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
    accent: "emerald" as const,
  },
  {
    icon: Sliders,
    value: "32",
    unit: "-bit",
    label: "Audio pipeline",
    desc: "Hi-Res decoding with a full equalizer engine.",
    accent: "violet" as const,
  },
  {
    icon: Code2,
    value: "100",
    unit: "%",
    label: "Open foundation",
    desc: "GPL-3.0 derived, built in the open.",
    accent: "amber" as const,
  },
  {
    icon: Zap,
    value: "0",
    unit: "Ads",
    label: "Distraction free",
    desc: "Nothing between you and the record.",
    accent: "rose" as const,
  },
];

/** Icon chip + metric colour per accent. */
const ACCENTS: Record<
  string,
  { chip: string; metric: string; bar: string; glow: string }
> = {
  emerald: {
    chip: "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 group-hover:text-emerald-300",
    metric: "group-hover:text-emerald-300",
    bar: "from-emerald-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(52,211,153,0.45)]",
  },
  violet: {
    chip: "bg-violet-core/10 text-lavender group-hover:bg-violet-core/20 group-hover:text-white",
    metric: "group-hover:text-lavender",
    bar: "from-violet-core/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(168,85,247,0.45)]",
  },
  amber: {
    chip: "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 group-hover:text-amber-300",
    metric: "group-hover:text-amber-300",
    bar: "from-amber-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(251,191,36,0.4)]",
  },
  rose: {
    chip: "bg-rose-400/10 text-rose-400 group-hover:bg-rose-400/20 group-hover:text-rose-300",
    metric: "group-hover:text-rose-300",
    bar: "from-rose-400/70",
    glow: "group-hover:shadow-[0_18px_45px_-18px_rgba(244,114,182,0.4)]",
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
        </div>

        {/* Heading + supporting copy, side by side so the top-right is not empty */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end lg:gap-16">
          <div ref={revealScope}>
            <h2 className="type-section max-w-[20ch]">
              More than just a
              <br />
              <span className="text-gradient-violet">music player.</span>
            </h2>
          </div>

          <div
            data-reveal
            className="lg:border-l lg:border-white/[0.07] lg:pl-14"
          >
            <p className="type-lede max-w-[46ch]">{BODY}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-violet-core/30 to-transparent" />
            <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {SUPPORT}
            </p>
            <a
              href="#features"
              className="group mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-lavender transition-colors duration-200 hover:text-white"
            >
              Explore the features
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Statement — the editorial pull of the section */}
        <div className="relative mt-12 pl-6 sm:mt-16 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-violet-core/70 via-violet-core/25 to-transparent"
          />
          <p
            ref={wordScope}
            className="max-w-[46ch] text-[clamp(1.35rem,2.9vw,2.35rem)] font-medium leading-[1.28] tracking-[-0.035em]"
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

        {/* Stats — metric first, label and detail below */}
        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-14 sm:gap-5">
          {STATS.map((s) => {
            const Icon = s.icon;
            const accent = ACCENTS[s.accent];

            return (
              <li key={s.label} className="group">
                <SpotlightCard
                  intent={s.accent}
                  className={cn(
                    "relative h-full overflow-hidden p-5 transition-all duration-300 sm:p-6",
                    "hover:border-violet-core/35",
                    accent.glow,
                  )}
                >
                  {/* Accent rail that lights up on hover */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      accent.bar,
                    )}
                  />

                  {/* Icon chip pinned to the corner so the metric keeps the
                      full width of the card on narrow screens */}
                  <span
                    className={cn(
                      "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 sm:right-6 sm:top-6",
                      accent.chip,
                    )}
                  >
                    <Icon size={15} aria-hidden />
                  </span>

                  {/* Metric is the headline of the card */}
                  <span className="flex items-baseline gap-0.5 pr-10 sm:pr-12">
                    <span
                      className={cn(
                        "font-mono text-[1.75rem] font-semibold leading-none tracking-tight text-ink transition-colors duration-300 sm:text-[2rem]",
                        accent.metric,
                      )}
                    >
                      {s.value}
                    </span>
                    <span className="font-mono text-xs font-medium text-ink-muted sm:text-sm">
                      {s.unit}
                    </span>
                  </span>

                  <div className="mt-4 border-t border-white/[0.06] pt-4">
                    <h3 className="text-[0.8125rem] font-semibold tracking-tight text-ink sm:text-sm">
                      {s.label}
                    </h3>
                    <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-soft sm:text-[0.8125rem]">
                      {s.desc}
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
