"use client";

import { useRef, useState } from "react";
import { Play, Pause, Heart, Flame, Music, Zap, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AlbumArtwork } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { cn } from "@/lib/utils";

const LISTENERS = [
  { initials: "AR", name: "Aarav", location: "Mumbai", status: "Synced 0ms", x: "5%", y: "10%" },
  { initials: "KV", name: "Kavya", location: "Delhi", status: "Added song", x: "80%", y: "4%" },
  { initials: "NR", name: "Noor", location: "Bengaluru", status: "Listening", x: "1%", y: "66%" },
  { initials: "SM", name: "Sam", location: "London", status: "Room Host", x: "83%", y: "60%" },
];

type FloatingReaction = {
  id: number;
  emoji: string;
  x: number;
};

export function ListenTogether() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeListener, setActiveListener] = useState<string | null>(null);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const reactionIdRef = useRef(0);

  const spawnReaction = (emoji: string) => {
    const id = ++reactionIdRef.current;
    const x = 25 + Math.random() * 50;
    setReactions((prev) => [...prev.slice(-15), { id, emoji, x }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2200);
  };

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
          start: "top 65%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-lt-copy]"), {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.08,
      })
        .from(
          q("[data-lt-core]"),
          { opacity: 0, scale: 0.65, duration: 1, ease: "expo.out" },
          0.15,
        )
        .from(
          q("[data-lt-path]"),
          {
            strokeDashoffset: 350,
            duration: 1.4,
            ease: "power2.inOut",
            stagger: 0.1,
          },
          0.5,
        )
        .from(
          q("[data-lt-listener]"),
          {
            opacity: 0,
            scale: 0.4,
            y: 15,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          0.65,
        )
        .from(
          q("[data-lt-ui]"),
          { opacity: 0, y: 22, duration: 0.8 },
          1.1,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      id="listen-together"
      ref={scope}
      className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.22) 0%, rgba(124,58,237,0.08) 45%, transparent 72%)",
        }}
      />

      <div className="shell relative">
        {/* Section header - centered */}
        <div className="mx-auto mb-16 max-w-[44rem] text-center sm:mb-20 lg:mb-24">
          <span data-lt-copy className="type-eyebrow mb-6 inline-block">
            04 — Listen Together
          </span>
          <h2 data-lt-copy className="type-section mb-6 text-ink">
            Distance doesn&apos;t matter when{" "}
            <span className="text-gradient-violet">music connects us.</span>
          </h2>
          <p data-lt-copy className="type-lede mx-auto max-w-[50ch]">
            Create a room. Invite your favourite people. Pick a song. Enjoy
            synchronized playback, shared queues and a real-time listening
            experience with friends anywhere in the world.
          </p>
        </div>

        {/* ---------------- Stage ---------------- */}
        <div className="mx-auto relative max-w-[68rem]">
          {/* Floating Emoji Reactions Layer */}
          <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
            {reactions.map((r) => (
              <span
                key={r.id}
                className="absolute text-2xl sm:text-4xl animate-in fade-in zoom-in"
                style={{
                  left: `${r.x}%`,
                  bottom: "32%",
                  animation: "float-strong 2s ease-out forwards",
                }}
              >
                {r.emoji}
              </span>
            ))}
          </div>

          {/* Main stage container */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/8]">
            {/* SVG Connection Paths */}
            <svg
              aria-hidden
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="lt-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.08" />
                  <stop offset="40%" stopColor="#C4B5FD" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.08" />
                </linearGradient>
                <filter id="lt-glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {[
                "M 400 200 C 260 120, 180 90, 60 60",
                "M 400 200 C 540 110, 640 80, 740 40",
                "M 400 200 C 250 260, 150 300, 40 300",
                "M 400 200 C 560 270, 660 300, 760 280",
              ].map((d, i) => (
                <g key={i}>
                  <path
                    data-lt-path
                    d={d}
                    fill="none"
                    stroke="url(#lt-line)"
                    strokeWidth="1.5"
                    strokeDasharray="350"
                    strokeDashoffset="350"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#lt-glow)"
                  />
                  <circle r="3.5" fill="#C4B5FD" filter="url(#lt-glow)">
                    <animateMotion
                      path={d}
                      dur={`${3.5 + i * 0.4}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div data-lt-core className="relative">
                {/* Expanding wave rings */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-12 rounded-full border border-violet-core/20 animate-ping-slow"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 rounded-full border border-lavender/20 animate-pulse-subtle"
                />

                {/* Glow behind hub */}
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.55) 0%, transparent 70%)",
                    animation: "drift-glow 14s ease-in-out infinite",
                  }}
                />

                {/* Album artwork hub */}
                <div className="relative w-[clamp(7rem,24vw,13rem)]">
                  <AlbumArtwork
                    tone="dusk"
                    title=""
                    variant={2}
                    rounded="rounded-2xl"
                    className="aspect-square w-full shadow-[0_30px_80px_-24px_rgba(168,85,247,0.9)] ring-2 ring-violet-core/40 transition-transform duration-500 hover:scale-[1.02]"
                  />
                  {/* Waveform badge */}
                  <div className="absolute inset-x-4 -bottom-4 rounded-full bg-void/90 px-4 py-2 backdrop-blur-md border border-white/10 shadow-lg">
                    <AudioWaveform bars={20} height={16} animated={isPlaying} />
                  </div>
                </div>
              </div>
            </div>

            {/* Listeners */}
            {LISTENERS.map((l) => {
              const isHovered = activeListener === l.initials;
              return (
                <div
                  key={l.initials}
                  data-lt-listener
                  onMouseEnter={() => setActiveListener(l.initials)}
                  onMouseLeave={() => setActiveListener(null)}
                  onClick={() => setActiveListener(isHovered ? null : l.initials)}
                  className="absolute z-20 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{ left: l.x, top: l.y }}
                >
                  {/* Avatar */}
                  <span className="relative grid h-[clamp(2.25rem,4.5vw,3rem)] w-[clamp(2.25rem,4.5vw,3rem)] place-items-center rounded-full bg-gradient-to-br from-violet-core to-violet-deep text-[0.6875rem] font-semibold text-white ring-2 ring-void shadow-[0_8px_24px_-8px_rgba(168,85,247,0.85)] transition-transform duration-300 group-hover:scale-110">
                    {l.initials}
                    {/* Status indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-void animate-pulse" />
                  </span>
                  {/* Name */}
                  <span className="text-[0.625rem] font-medium tracking-wide text-ink">
                    {l.name}
                  </span>

                  {/* Tooltip */}
                  <div
                    className={cn(
                      "absolute top-full mt-2 rounded-lg border border-white/15 bg-void/95 px-3 py-1.5 text-center backdrop-blur-xl shadow-xl transition-all duration-300 z-30",
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                    )}
                  >
                    <p className="text-[0.625rem] font-semibold text-lavender">{l.location}</p>
                    <p className="text-[0.5rem] text-ink-muted">{l.status}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Room Player Bar */}
          <div
            data-lt-ui
            className="mx-auto mt-8 w-full max-w-[36rem] rounded-2xl border border-white/[0.08] bg-surface/70 p-4 sm:p-5 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-violet-core/30 hover:shadow-[0_30px_70px_rgba(168,85,247,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[0.5625rem] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
                <span className="text-[0.75rem] font-medium text-ink">
                  Late Night Room
                </span>
              </div>
              <span className="text-[0.625rem] text-ink-muted">
                {LISTENERS.length} listeners synced · 0ms drift
              </span>
            </div>

            {/* Track info */}
            <div className="mt-4 flex items-center gap-3.5">
              <AlbumArtwork
                tone="dusk"
                title=""
                variant={1}
                rounded="rounded-lg"
                className="h-12 w-12 shrink-0 shadow-md ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.03]"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.8125rem] font-semibold text-ink">
                  Midnight Bloom
                </p>
                <p className="truncate text-[0.6875rem] text-ink-muted">
                  Aria Vale · shared synchronized queue
                </p>
              </div>

              {/* Play/Pause */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause room playback" : "Resume room playback"}
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-void shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause size={14} className="fill-void text-void" />
                ) : (
                  <Play size={14} className="fill-void text-void translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender transition-all duration-300"
                style={{ width: isPlaying ? "54%" : "54%" }}
              />
            </div>

            {/* Live reactions */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
              <span className="text-[0.625rem] text-ink-muted">Send reaction:</span>
              <div className="flex items-center gap-2">
                {[
                  { label: "❤️" },
                  { label: "🔥" },
                  { label: "🎵" },
                  { label: "⚡" },
                  { label: "✨" },
                ].map(({ label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => spawnReaction(label)}
                    aria-label={`Send ${label} reaction`}
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-xs transition-all duration-300 hover:scale-125 hover:border-violet-core/50 hover:bg-violet-core/10 hover:text-lavender active:scale-90"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="mt-8 text-center text-[0.9375rem] font-medium tracking-tight text-lavender/90">
            Your people. Your playlist. Your moments.
          </p>
          <p className="mt-2 text-center text-[0.75rem] text-ink-muted">
            Tap avatars to see listener details · Tap emojis to send reactions in real-time
          </p>
        </div>
      </div>
    </section>
  );
}
