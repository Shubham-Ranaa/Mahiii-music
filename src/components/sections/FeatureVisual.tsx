"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import type { Feature } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlbumArtwork } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ------------------------------------------------------------------ */
/* Per-feature compositions                                            */
/* ------------------------------------------------------------------ */

function DiscoveryVisual() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Made for you</p>
        <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-ink-muted">
          TODAY
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {(
          [
            ["dusk", "Midnight Bloom", 0],
            ["ember", "Golden Hour", 1],
            ["tide", "Low Tide", 2],
            ["rose", "Neon Letters", 0],
            ["moss", "Field Notes", 1],
            ["mono", "Static", 2],
          ] as const
        ).map(([tone, title, variant], i) => (
          <div
            key={title}
            className={cn(
              "flex flex-col gap-1.5",
              i >= 3 && "hidden sm:flex",
            )}
          >
            <AlbumArtwork
              tone={tone}
              title=""
              variant={variant}
              rounded="rounded-lg"
              className="aspect-square w-full"
            />
            <p className="truncate text-[0.5625rem] text-ink-soft">{title}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-core" />
        <span className="text-[0.625rem] text-ink-soft">
          New releases from artists you follow
        </span>
      </div>
    </div>
  );
}

function TogetherVisual() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Late Night Room</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[0.5625rem] font-medium text-emerald-300">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div className="relative mt-4 flex-1">
        <div className="absolute inset-0 grid place-items-center">
          <AlbumArtwork
            tone="dusk"
            title=""
            variant={2}
            rounded="rounded-xl"
            className="aspect-square w-[62%] shadow-[0_24px_60px_-20px_rgba(168,85,247,0.6)]"
          />
        </div>
        {[
          { i: "AR", pos: "left-0 top-2" },
          { i: "KV", pos: "right-0 top-8" },
          { i: "NR", pos: "left-2 bottom-2" },
          { i: "SM", pos: "right-3 bottom-0" },
        ].map((p) => (
          <span
            key={p.i}
            className={cn(
              "absolute grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-core to-violet-deep text-[0.5rem] font-semibold text-white ring-2 ring-void",
              p.pos,
            )}
          >
            {p.i}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
        <span className="text-[0.5625rem] text-ink-soft">4 listeners · synced</span>
        <AudioWaveform bars={14} height={16} animated />
      </div>
    </div>
  );
}

function LyricsVisual() {
  const lines = [
    "City lights are fading slow",
    "and the record starts to spin",
    "I keep your voice on repeat",
    "like a song I let begin",
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {lines.map((line, i) => (
        <p
          key={line}
          className={cn(
            "text-[clamp(0.875rem,1.4vw,1.0625rem)] leading-snug tracking-tight transition-colors",
            i === 2 ? "font-semibold text-ink" : "text-ink-muted/50",
          )}
        >
          {line}
        </p>
      ))}
      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[46%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
      </div>
    </div>
  );
}

function AudioVisual() {
  const bands = [64, 48, 78, 38, 58, 88, 46, 32];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Equalizer</p>
        <span className="rounded-full bg-violet-core/15 px-2 py-0.5 text-[0.5625rem] font-medium text-lavender">
          Bass Boost
        </span>
      </div>
      <div className="mt-4 flex flex-1 items-end gap-2">
        {bands.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div className="relative flex w-full flex-1 items-end justify-center rounded-full bg-white/[0.04]">
              <div
                className="w-[4px] rounded-full bg-gradient-to-t from-violet-deep to-lavender"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(196,181,253,0.9)]"
                style={{ bottom: `calc(${h}% - 4px)` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["Bass enhancement", "+6 dB", 68],
          ["Virtualizer", "On", 42],
        ].map(([label, value, width]) => (
          <div key={String(label)}>
            <div className="flex justify-between text-[0.5625rem] text-ink-muted">
              <span>{label}</span>
              <span className="text-lavender">{value}</span>
            </div>
            <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryVisual() {
  const rows = [
    ["Late Night Drive", "24 tracks", "dusk"],
    ["Focus / Deep Work", "18 tracks", "tide"],
    ["Sunday Morning", "31 tracks", "ember"],
    ["Liked Songs", "412 tracks", "rose"],
  ] as const;
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Your library</p>
        <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-ink-muted">
          4 PLAYLISTS
        </span>
      </div>
      {rows.map(([title, meta, tone], i) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-2 transition-colors hover:bg-white/[0.06]"
        >
          <AlbumArtwork
            tone={tone}
            title=""
            variant={i}
            rounded="rounded-md"
            className="h-10 w-10 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.6875rem] font-medium text-ink">{title}</p>
            <p className="truncate text-[0.5625rem] text-ink-muted">{meta}</p>
          </div>
          <span className="text-ink-muted/50">···</span>
        </div>
      ))}
    </div>
  );
}

function OfflineVisual() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Downloads</p>
        <span className="text-[0.5625rem] text-ink-muted">2.4 GB used</span>
      </div>
      <div className="mt-4 space-y-3">
        {[
          ["Late Night Drive", 100],
          ["Focus / Deep Work", 72],
          ["Sunday Morning", 34],
        ].map(([title, pct]) => (
          <div key={String(title)}>
            <div className="flex justify-between text-[0.625rem]">
              <span className="text-ink-soft">{title}</span>
              <span className="tabular-nums text-ink-muted">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.07] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[0.5625rem] text-ink-soft">
          Available offline · cached content ready
        </span>
      </div>
    </div>
  );
}

function PersonalVisual() {
  const themes = [
    ["#A855F7", "#7C3AED"],
    ["#22D3EE", "#0E7490"],
    ["#F472B6", "#831843"],
    ["#4ADE80", "#14532D"],
    ["#F59E0B", "#7C2D12"],
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-[0.8125rem] font-medium text-ink">Appearance</p>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {themes.map(([a, b], i) => (
          <div
            key={a}
            className={cn(
              "aspect-square rounded-lg ring-1 transition-transform",
              i === 0 ? "ring-lavender" : "ring-white/10",
            )}
            style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
          />
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {[
          ["Dynamic colour", true],
          ["Animated artwork", true],
          ["Compact navigation", false],
        ].map(([label, on]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
          >
            <span className="text-[0.625rem] text-ink-soft">{label}</span>
            <span
              className={cn(
                "relative h-3.5 w-6 rounded-full transition-colors",
                on ? "bg-violet-core" : "bg-white/15",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all",
                  on ? "left-3" : "left-0.5",
                )}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  discovery: DiscoveryVisual,
  together: TogetherVisual,
  lyrics: LyricsVisual,
  audio: AudioVisual,
  library: LibraryVisual,
  offline: OfflineVisual,
  personal: PersonalVisual,
};

/* ------------------------------------------------------------------ */
/* Wrapper                                                             */
/* ------------------------------------------------------------------ */

export function FeatureVisual({
  feature,
  compact = false,
}: {
  feature: Feature;
  compact?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Visual = VISUALS[feature.id] ?? DiscoveryVisual;

  useGSAP(
    () => {
      if (!scope.current || reduced) return;
      gsap.fromTo(
        scope.current,
        { opacity: 0, y: 14, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      );
    },
    { scope, dependencies: [feature.id, reduced] },
  );

  return (
    <div
      ref={scope}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-surface to-abyss",
        compact ? "p-5" : "p-6 sm:p-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted">
            {feature.index}
          </span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.16em] text-ink-muted">
            {feature.mockLabel}
          </span>
        </div>

        <div className={cn("relative", compact ? "h-[248px]" : "h-[300px] sm:h-[340px]")}>
          <Visual />
        </div>

        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <h3 className="text-[1.0625rem] font-medium tracking-tight text-ink">
            {feature.title}
          </h3>
          <p className="mt-1.5 max-w-[44ch] text-[0.8125rem] leading-relaxed text-ink-soft">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
