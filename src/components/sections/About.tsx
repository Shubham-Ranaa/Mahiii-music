"use client";

import {
  useScrollReveal,
  useWordScrollReveal,
  useDrift,
} from "@/animations/scrollAnimations";

const STATEMENT =
  "MAHII is a modern Android music experience designed around music, personalization and shared moments.";

const BODY =
  "From discovering your next favourite song to enjoying synchronized listening sessions with friends, MAHII brings your music experience together in one place.";

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
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.20) 0%, transparent 70%)",
          }}
        />
        <div
          data-drift="0.7"
          className="absolute right-[-6%] bottom-[6%] h-[26vw] w-[26vw] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.10) 0%, transparent 70%)",
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
              Built with a passion for technology, music and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
