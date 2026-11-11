"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AlbumArtwork } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";

const LISTENERS = [
  { initials: "AR", name: "Aarav", x: "6%", y: "12%", delay: 0.15 },
  { initials: "KV", name: "Kavya", x: "78%", y: "6%", delay: 0.3 },
  { initials: "NR", name: "Noor", x: "2%", y: "68%", delay: 0.45 },
  { initials: "SM", name: "Sam", x: "82%", y: "62%", delay: 0.6 },
];

export function ListenTogether() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(
          q(
            "[data-lt-core], [data-lt-listener], [data-lt-ui], [data-lt-copy], [data-lt-path]",
          ),
          { opacity: 1, scale: 1, x: 0, y: 0, clearProps: "transform" },
        );
        gsap.set(q("[data-lt-path]"), { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 68%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-lt-copy]"), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
      })
        .from(
          q("[data-lt-core]"),
          { opacity: 0, scale: 0.7, duration: 1.1, ease: "expo.out" },
          0.2,
        )
        .from(
          q("[data-lt-path]"),
          {
            strokeDashoffset: 320,
            duration: 1.3,
            ease: "power2.inOut",
            stagger: 0.12,
          },
          0.55,
        )
        .from(
          q("[data-lt-listener]"),
          {
            opacity: 0,
            scale: 0.5,
            y: 18,
            duration: 0.8,
            stagger: 0.14,
            ease: "back.out(1.6)",
          },
          0.7,
        )
        .from(
          q("[data-lt-ui]"),
          { opacity: 0, y: 26, duration: 0.9 },
          1.15,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      id="listen-together"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.22) 0%, rgba(124,58,237,0.08) 45%, transparent 72%)",
        }}
      />

      <div className="shell">
        <div className="mx-auto mb-16 max-w-[46rem] text-center sm:mb-20">
          <span data-lt-copy className="type-eyebrow mb-6 inline-block">
            04 — Listen Together
          </span>
          <h2 data-lt-copy className="type-section mb-6 text-ink">
            Distance doesn&apos;t matter when{" "}
            <span className="text-violet-gradient">music connects us.</span>
          </h2>
          <p data-lt-copy className="type-lede mx-auto max-w-[52ch]">
            Create a room. Invite your favourite people. Pick a song. Enjoy
            synchronized playback, shared queues and a connected listening
            experience.
          </p>
        </div>

        {/* ---------------- Stage ---------------- */}
        <div className="relative mx-auto max-w-[68rem]">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/8]">
            {/* connection lines */}
            <svg
              aria-hidden
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="lt-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {[
                "M 400 200 C 260 120, 180 90, 60 60",
                "M 400 200 C 540 110, 640 80, 740 40",
                "M 400 200 C 250 260, 150 300, 40 300",
                "M 400 200 C 560 270, 660 300, 760 280",
              ].map((d, i) => (
                <path
                  key={i}
                  data-lt-path
                  d={d}
                  fill="none"
                  stroke="url(#lt-line)"
                  strokeWidth="1.2"
                  strokeDasharray="320"
                  strokeDashoffset="320"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* central element */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div data-lt-core className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.45) 0%, transparent 70%)",
                  }}
                />
                <div className="relative w-[clamp(7rem,26vw,13rem)]">
                  <AlbumArtwork
                    tone="dusk"
                    title=""
                    variant={2}
                    rounded="rounded-2xl"
                    className="aspect-square w-full shadow-[0_30px_80px_-24px_rgba(168,85,247,0.75)]"
                  />
                  <div className="absolute inset-x-3 -bottom-3 rounded-full bg-void/85 px-3 py-1.5 backdrop-blur-sm">
                    <AudioWaveform bars={16} height={14} animated />
                  </div>
                </div>
              </div>
            </div>

            {/* listeners */}
            {LISTENERS.map((l) => (
              <div
                key={l.initials}
                data-lt-listener
                className="absolute z-20 flex flex-col items-center gap-1.5"
                style={{ left: l.x, top: l.y }}
              >
                <span className="grid h-[clamp(2.25rem,5vw,3rem)] w-[clamp(2.25rem,5vw,3rem)] place-items-center rounded-full bg-gradient-to-br from-violet-core to-violet-deep text-[0.625rem] font-semibold text-white ring-2 ring-void shadow-[0_8px_24px_-8px_rgba(168,85,247,0.8)]">
                  {l.initials}
                </span>
                <span className="hidden text-[0.5625rem] tracking-wide text-ink-muted sm:block">
                  {l.name}
                </span>
              </div>
            ))}
          </div>

          {/* room UI */}
          <div
            data-lt-ui
            className="mx-auto mt-10 w-full max-w-[34rem] rounded-2xl border border-white/[0.08] bg-surface/70 p-4 backdrop-blur-md sm:p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[0.5625rem] font-medium text-emerald-300">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  Live
                </span>
                <span className="text-[0.6875rem] text-ink-soft">
                  Late Night Room
                </span>
              </div>
              <span className="text-[0.5625rem] text-ink-muted">
                4 listeners · synced
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <AlbumArtwork
                tone="dusk"
                title=""
                variant={1}
                rounded="rounded-lg"
                className="h-11 w-11 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.75rem] font-medium text-ink">
                  Midnight Bloom
                </p>
                <p className="truncate text-[0.625rem] text-ink-muted">
                  Aria Vale · shared queue
                </p>
              </div>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-void">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 4h3v16H7zM14 4h3v16h-3z" />
                  </svg>
                </span>
            </div>

            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
            </div>
          </div>

          <p className="mt-8 text-center text-[0.9375rem] font-medium tracking-tight text-lavender/90">
            Your people. Your playlist. Your moments.
          </p>
        </div>
      </div>
    </section>
  );
}
