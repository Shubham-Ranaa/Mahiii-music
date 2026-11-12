"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import type { Feature } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlbumArtwork, type ArtworkTone } from "@/components/ui/AlbumArtwork";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Check, Copy, Sliders, Search, Download, Sparkles, Volume2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 01. Discovery Visual                                               */
/* ------------------------------------------------------------------ */
function DiscoveryVisual() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const CARDS = [
    ["dusk", "Midnight Bloom", 0, "Aria Vale · 3:42"],
    ["ember", "Golden Hour", 1, "Solar Drift · 3:18"],
    ["tide", "Low Tide", 2, "Echo Wave · 4:05"],
    ["rose", "Neon Letters", 0, "Kite & Co · 2:50"],
    ["moss", "Field Notes", 1, "Quiet Forest · 3:12"],
    ["mono", "Static", 2, "Binary Sound · 3:30"],
  ] as const;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.8125rem] font-medium text-ink flex items-center gap-1.5">
          <Sparkles size={12} className="text-violet-core" />
          <span>Made for you · Recommended</span>
        </p>
        <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-ink-muted">
          DAILY MIX
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {CARDS.map(([tone, title, variant, meta], i) => (
          <button
            key={title}
            type="button"
            onClick={() => setSelectedIdx(i)}
            className={cn(
              "group relative flex flex-col gap-1.5 text-left rounded-xl p-1 transition-all duration-300",
              selectedIdx === i
                ? "bg-violet-core/15 ring-1 ring-violet-core/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                : "hover:bg-white/[0.04]",
              i >= 3 && "hidden sm:flex",
            )}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <AlbumArtwork
                tone={tone as ArtworkTone}
                title=""
                variant={variant}
                rounded="rounded-lg"
                className="h-full w-full transition-transform duration-300 group-hover:scale-105"
              />
              {selectedIdx === i && (
                <span className="absolute bottom-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full bg-white text-void shadow-sm">
                  <Volume2 size={9} />
                </span>
              )}
            </div>
            <p className="truncate text-[0.625rem] font-medium text-ink">{title}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-[0.625rem]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping-slow" />
          <span className="text-ink-soft">
            Now previewing: <strong className="text-lavender">{CARDS[selectedIdx][1]}</strong>
          </span>
        </div>
        <span className="text-ink-muted">{CARDS[selectedIdx][3]}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02. Listen Together Visual                                         */
/* ------------------------------------------------------------------ */
function TogetherVisual() {
  const [copied, setCopied] = useState(false);

  const copyRoom = () => {
    navigator.clipboard?.writeText("https://mahii.app/room/latenight");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[0.8125rem] font-medium text-ink">Late Night Room</p>
          <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[0.5625rem] font-medium text-emerald-300">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            Live · 4 in Sync
          </span>
        </div>
        <button
          type="button"
          onClick={copyRoom}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[0.5625rem] text-ink-muted transition-colors hover:border-white/20 hover:text-ink"
        >
          {copied ? (
            <>
              <Check size={9} className="text-emerald-400" />
              <span className="text-emerald-300">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy size={9} />
              <span>Invite</span>
            </>
          )}
        </button>
      </div>

      <div className="relative mt-4 flex-1">
        {/* Pulsing concentric rings */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="h-44 w-44 rounded-full border border-violet-core/20 animate-ping-slow" />
          <div className="h-32 w-32 rounded-full border border-lavender/30 animate-pulse-subtle" />
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <AlbumArtwork
            tone="dusk"
            title=""
            variant={2}
            rounded="rounded-2xl"
            className="aspect-square w-[58%] shadow-[0_20px_50px_-15px_rgba(168,85,247,0.7)] ring-2 ring-violet-core/40"
          />
        </div>

        {[
          { i: "AR", n: "Aarav", pos: "left-1 top-2" },
          { i: "KV", n: "Kavya", pos: "right-1 top-6" },
          { i: "NR", n: "Noor", pos: "left-3 bottom-1" },
          { i: "SM", n: "Sam", pos: "right-3 bottom-0" },
        ].map((p) => (
          <div
            key={p.i}
            className={cn(
              "group absolute flex items-center gap-1.5 transition-transform duration-300 hover:scale-110",
              p.pos,
            )}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-core to-violet-deep text-[0.5625rem] font-semibold text-white ring-2 ring-void shadow-[0_4px_12px_rgba(168,85,247,0.5)]">
              {p.i}
            </span>
            <span className="rounded-full bg-void/90 px-1.5 py-0.5 text-[0.5rem] text-ink-muted border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              {p.n}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
        <span className="text-[0.625rem] text-ink-soft">Shared playback · 0ms drift</span>
        <AudioWaveform bars={16} height={16} animated />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03. Synchronized Lyrics Visual                                     */
/* ------------------------------------------------------------------ */
function LyricsVisual() {
  const [activeLine, setActiveLine] = useState(2);

  const lines = [
    { t: "City lights are fading slow", time: "0:24" },
    { t: "and the record starts to spin", time: "0:31" },
    { t: "I keep your voice on repeat", time: "0:38" },
    { t: "like a song I let begin", time: "0:45" },
    { t: "every hour, every echo", time: "0:52" },
  ];

  // Auto-advance lyrics gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % lines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="flex h-full flex-col justify-between py-1">
      <div className="flex items-center justify-between pb-2 border-b border-white/6">
        <div className="flex items-center gap-2">
          <AlbumArtwork tone="dusk" title="" variant={1} rounded="rounded-md" className="h-6 w-6" />
          <span className="text-[0.6875rem] font-medium text-ink">Midnight Bloom — Synced</span>
        </div>
        <span className="font-mono text-[0.5625rem] text-violet-core">KARAOKE MODE</span>
      </div>

      <div className="space-y-3 py-3">
        {lines.map((item, i) => (
          <button
            key={item.t}
            type="button"
            onClick={() => setActiveLine(i)}
            className={cn(
              "w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-all duration-300",
              i === activeLine
                ? "bg-violet-core/15 text-white scale-[1.02] shadow-[0_0_15px_rgba(168,85,247,0.2)] font-semibold"
                : "text-ink-muted/50 hover:text-ink-muted",
            )}
          >
            <span className="text-[clamp(0.8125rem,1.3vw,1rem)] leading-snug tracking-tight">
              {item.t}
            </span>
            <span className="font-mono text-[0.5rem] opacity-60">{item.time}</span>
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[0.5625rem] text-ink-muted">
          <span>Tap line to jump</span>
          <span className="text-lavender">Auto-scrolling</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender transition-all duration-500"
            style={{ width: `${((activeLine + 1) / lines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04. Advanced Equalizer Visual                                      */
/* ------------------------------------------------------------------ */
function AudioVisual() {
  const PRESETS: Record<string, number[]> = {
    "Bass Boost": [88, 76, 60, 44, 48, 56, 68, 72],
    "Vocal": [34, 42, 60, 84, 90, 82, 54, 40],
    "Electronic": [82, 70, 45, 38, 54, 78, 86, 92],
    "Flat / Neutral": [50, 50, 50, 50, 50, 50, 50, 50],
  };

  const [activePreset, setActivePreset] = useState("Bass Boost");
  const [bands, setBands] = useState<number[]>(PRESETS["Bass Boost"]);
  const labels = ["32Hz", "64", "125", "250", "1k", "2k", "4k", "8kHz"];

  const handlePreset = (name: string) => {
    setActivePreset(name);
    setBands(PRESETS[name]);
  };

  const handleBandClick = (index: number) => {
    setBands((prev) => {
      const next = [...prev];
      next[index] = next[index] >= 85 ? 30 : next[index] + 20;
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink flex items-center gap-1.5">
          <Sliders size={13} className="text-violet-core" />
          <span>Parametric Equalizer</span>
        </p>
        <span className="font-mono text-[0.5625rem] text-lavender">
          {activePreset}
        </span>
      </div>

      {/* Preset Switcher Pills */}
      <div className="mt-3 flex flex-wrap gap-1">
        {Object.keys(PRESETS).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePreset(p)}
            className={cn(
              "rounded-full px-2 py-0.5 text-[0.5625rem] font-medium transition-all",
              activePreset === p
                ? "bg-violet-core text-white shadow-sm"
                : "bg-white/[0.04] text-ink-muted hover:text-ink hover:bg-white/[0.08]",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Interactive Bands */}
      <div className="mt-4 flex flex-1 items-end gap-1.5 sm:gap-2">
        {bands.map((h, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleBandClick(i)}
            title={`Adjust ${labels[i]} (currently ${h}%)`}
            className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5 cursor-pointer focus:outline-none"
          >
            <div className="relative flex w-full flex-1 items-end justify-center rounded-full bg-white/[0.04] transition-colors group-hover:bg-white/[0.08]">
              <div
                className="w-[4px] rounded-full bg-gradient-to-t from-violet-deep to-lavender transition-all duration-300"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(196,181,253,0.9)] transition-all duration-300 group-hover:scale-150"
                style={{ bottom: `calc(${h}% - 4px)` }}
              />
            </div>
            <span className="text-[0.45rem] font-mono text-ink-muted group-hover:text-lavender">
              {labels[i]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[0.5625rem] text-ink-muted border-t border-white/6 pt-2">
        <span>Click any band to adjust curve</span>
        <span className="text-emerald-400">Low-latency DAC active</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05. Personal Library Visual                                        */
/* ------------------------------------------------------------------ */
function LibraryVisual() {
  const [search, setSearch] = useState("");
  const rows = [
    ["Late Night Drive", "24 tracks · Synced", "dusk"],
    ["Focus / Deep Work", "18 tracks · Ambient", "tide"],
    ["Sunday Morning", "31 tracks · Acoustic", "ember"],
    ["Liked Songs", "412 tracks · Favorites", "rose"],
  ] as const;

  const filtered = rows.filter(([title]) =>
    title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Your Library</p>
        <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-ink-muted">
          {rows.length} PLAYLISTS
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs border border-white/6">
        <Search size={12} className="text-ink-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter playlists..."
          className="w-full bg-transparent text-[0.6875rem] text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </div>

      <div className="flex-1 space-y-1.5 overflow-hidden">
        {filtered.map(([title, meta, tone], i) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-2 transition-all hover:bg-white/[0.06] hover:translate-x-1"
          >
            <AlbumArtwork
              tone={tone as ArtworkTone}
              title=""
              variant={i}
              rounded="rounded-md"
              className="h-9 w-9 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.6875rem] font-medium text-ink">{title}</p>
              <p className="truncate text-[0.5625rem] text-ink-muted">{meta}</p>
            </div>
            <span className="text-[0.625rem] text-lavender font-mono">Open →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06. Offline Visual                                                 */
/* ------------------------------------------------------------------ */
function OfflineVisual() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(72);

  const triggerDownload = () => {
    setDownloading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setDownloading(false);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.8125rem] font-medium text-ink flex items-center gap-1.5">
          <Download size={13} className="text-violet-core" />
          <span>Offline Downloads</span>
        </p>
        <span className="text-[0.5625rem] text-ink-muted">2.4 GB cached</span>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["Late Night Drive", 100],
          ["Focus / Deep Work", progress],
          ["Sunday Morning", 45],
        ].map(([title, pct]) => (
          <div key={String(title)}>
            <div className="flex justify-between text-[0.625rem]">
              <span className="text-ink-soft">{title}</span>
              <span className="tabular-nums text-lavender font-mono">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-lg border border-white/[0.07] px-3 py-2 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[0.5625rem] text-ink-soft">FLAC Lossless ready offline</span>
        </div>
        <button
          type="button"
          onClick={triggerDownload}
          disabled={downloading}
          className="rounded-full bg-violet-core/20 px-2 py-0.5 text-[0.5625rem] font-medium text-lavender hover:bg-violet-core/30 transition-colors"
        >
          {downloading ? "Caching..." : "Sync All"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 07. Personalization & Themes Visual                                */
/* ------------------------------------------------------------------ */
function PersonalVisual() {
  const [activeTheme, setActiveTheme] = useState(0);

  const themes = [
    { name: "Violet", colors: ["#A855F7", "#7C3AED"] },
    { name: "Cyan", colors: ["#22D3EE", "#0E7490"] },
    { name: "Rose", colors: ["#F472B6", "#831843"] },
    { name: "Emerald", colors: ["#4ADE80", "#14532D"] },
    { name: "Amber", colors: ["#F59E0B", "#7C2D12"] },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink">Material You · Appearance</p>
        <span className="font-mono text-[0.5625rem] text-lavender">
          {themes[activeTheme].name}
        </span>
      </div>

      {/* Theme Swatches */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {themes.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setActiveTheme(i)}
            title={`Select ${t.name} theme`}
            className={cn(
              "aspect-square rounded-xl ring-2 transition-all duration-300 hover:scale-105",
              i === activeTheme
                ? "ring-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105"
                : "ring-white/10 opacity-70 hover:opacity-100",
            )}
            style={{
              background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
            }}
          />
        ))}
      </div>

      {/* Toggle options styled with active theme */}
      <div className="mt-5 space-y-2">
        {[
          ["Dynamic Artwork Color", true],
          ["3D Parallax Tilt", true],
          ["Compact Mini Player", false],
        ].map(([label, initialOn]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 border border-white/6"
          >
            <span className="text-[0.625rem] text-ink-soft">{label}</span>
            <span
              className="relative h-4 w-7 rounded-full transition-colors"
              style={{
                backgroundColor: initialOn ? themes[activeTheme].colors[0] : "rgba(255,255,255,0.15)",
              }}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all shadow-sm",
                  initialOn ? "left-3.5" : "left-0.5",
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
/* Wrapper Component                                                  */
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
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { scope, dependencies: [feature.id, reduced] },
  );

  return (
    <div
      ref={scope}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-surface via-[#121218] to-void shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl",
        compact ? "p-5" : "p-6 sm:p-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-75"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.28) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-violet-core font-semibold">
            FEATURE {feature.index}
          </span>
          <span className="rounded-full border border-violet-core/30 bg-violet-core/10 px-2.5 py-0.5 text-[0.5625rem] uppercase tracking-[0.16em] text-lavender">
            {feature.mockLabel}
          </span>
        </div>

        <div className={cn("relative", compact ? "h-[240px]" : "h-[300px] sm:h-[340px]")}>
          <Visual />
        </div>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
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
