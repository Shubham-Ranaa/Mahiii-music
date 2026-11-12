"use client";

import {
  useScrollReveal,
  useWordScrollReveal,
  useDrift,
} from "@/animations/scrollAnimations";
import { Radio, Sliders, Code2, Zap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

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
  },
  {
    icon: Sliders,
    metric: "32-bit",
    label: "Audio pipeline",
    desc: "Hi-Res DAC & Equalizer engine",
  },
  {
    icon: Code2,
    metric: "100%",
    label: "Open foundation",
    desc: "GPL-3.0 derived & privacy first",
  },
  {
    icon: Zap,
    metric: "0 Ads",
    label: "Distraction free",
    desc: "Pure sound without interruptions",
  },
];

export function About() {
  const driftScope = useDrift<HTMLDivElement>(70);
  const revealScope = useScrollReveal<HTMLDivElement>();
  const wordScope = useWordScrollReveal<HTMLParagraphElement>();

  return (
    <section id="about" className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div ref={driftScope} className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-drift="1.4"
          className="absolute left-[-8%] top-[10%] h-[38vw] w-[38vw] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          data-drift="0.7"
          className="absolute right-[-6%] bottom-[6%] h-[26vw] w-[26vw] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell">
        <div ref={revealScope}>
          <div className="mb-14 flex items-center gap-4 sm:mb-20">
            <span className="type-eyebrow">02 — Philosophy</span>
            <span className="hairline flex-1" />
          </div>

          <h2 className="type-section mb-10 max-w-[18ch] text-ink">
            More than just a<br />
            <span className="text-violet-gradient">music player.</span>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-20">
          <p
            ref={wordScope}
            className="text-[clamp(1.35rem,3.1vw,2.35rem)] font-medium leading-[1.32] tracking-[-0.03em] text-ink"
          >
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} data-word className="inline-block">
                {word}
                {"\u00A0"}
              </span>
            ))}
          </p>

          <div className="flex flex-col justify-end gap-6">
            <p className="type-lede max-w-[42ch]">{BODY}</p>
            <div className="h-px w-full bg-white/10" />
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
              Built with a genuine passion for Android development, sound engineering and seamless shared listening.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 pt-6 border-t border-white/[0.07]">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <SpotlightCard
                key={s.label}
                className="p-5 hover:border-violet-core/50 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-core/10 text-lavender transition-colors group-hover:bg-violet-core/20 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-base sm:text-lg font-semibold tracking-tight text-ink">
                    {s.metric}
                  </span>
                </div>
                <h4 className="mt-4 text-xs sm:text-sm font-semibold tracking-tight text-ink">
                  {s.label}
                </h4>
                <p className="mt-1 text-[0.6875rem] text-ink-muted leading-relaxed">
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
