"use client";

import {
  useScrollReveal,
  useWordScrollReveal,
  useDrift,
} from "@/animations/scrollAnimations";
import { Radio, Sliders, Code2, Zap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

const STATEMENT =
  "MAHII is a modern Android music experience designed around music, personalization and shared moments.";

const BODY =
  "From discovering your next favourite song to enjoying synchronized listening sessions with friends, MAHII brings your music experience together in one place.";

const STATS = [
  {
    icon: Radio,
    metric: "0ms",
    label: "Sync latency",
    desc: "Real-time room synchronization",
    accent: "emerald",
  },
  {
    icon: Sliders,
    metric: "32-bit",
    label: "Audio pipeline",
    desc: "Hi-Res DAC & Equalizer engine",
    accent: "violet",
  },
  {
    icon: Code2,
    metric: "100%",
    label: "Open foundation",
    desc: "GPL-3.0 derived & privacy first",
    accent: "amber",
  },
  {
    icon: Zap,
    metric: "0 Ads",
    label: "Distraction free",
    desc: "Pure sound without interruptions",
    accent: "rose",
  },
];

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
        <div className="mb-16 flex items-center gap-4 sm:mb-20 lg:mb-24">
          <span className="type-eyebrow">02 — Philosophy</span>
          <span className="flex-1 hairline" />
        </div>

        {/* Main heading */}
        <div ref={revealScope}>
          <h2 className="type-section mb-10 max-w-[17ch]">
            More than just a
            <br />
            <span className="text-gradient-violet">music player.</span>
          </h2>
        </div>

        {/* Content layout */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-24">
          {/* Statement with word reveal */}
          <p
            ref={wordScope}
            className="text-[clamp(1.4rem,3.2vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.035em]"
          >
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} data-word className="inline-block text-ink">
                {word}
                {" "}
              </span>
            ))}
          </p>

          {/* Description text */}
          <div className="flex flex-col justify-end gap-6">
            <p className="type-lede max-w-[44ch]">{BODY}</p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-core/30 to-transparent" />
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
              Built with a genuine passion for Android development, sound engineering and
              seamless shared listening.
            </p>
          </div>
        </div>

        {/* Stats grid - refined cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:mt-20 lg:pt-10">
          {STATS.map((s) => {
            const Icon = s.icon;
            const accentColors: Record<string, string> = {
              emerald: "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 group-hover:text-emerald-300",
              violet: "bg-violet-core/10 text-lavender group-hover:bg-violet-core/20 group-hover:text-white",
              amber: "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 group-hover:text-amber-300",
              rose: "bg-rose-400/10 text-rose-400 group-hover:bg-rose-400/20 group-hover:text-rose-300",
            };

            return (
              <SpotlightCard
                key={s.label}
                className="p-5 sm:p-6 hover:border-violet-core/40 hover:shadow-[0_15px_40px_-12px_rgba(168,85,247,0.25)] transition-all duration-400 group"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
                      accentColors[s.accent],
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-lg sm:text-xl font-semibold tracking-tight text-ink">
                    {s.metric}
                  </span>
                </div>
                <h4 className="mt-4 text-xs sm:text-sm font-semibold tracking-tight text-ink">
                  {s.label}
                </h4>
                <p className="mt-1.5 text-[0.6875rem] text-ink-muted leading-relaxed">
                  {s.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
