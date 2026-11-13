"use client";

import { useState } from "react";
import {
  Check,
  CloudDownload,
  Heart,
  Link2,
  ListMusic,
  Palette,
  Play,
  Plus,
  Radio,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AlbumArtwork, type ArtworkTone } from "@/components/ui/AlbumArtwork";

/**
 * Compact app screens used by the Features section.
 *
 * Every feature gets its own interface so the mockup actually changes with
 * the selected entry instead of always showing the same player.
 */

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function MiniStatus({ right = "Hi-Fi" }: { right?: string }) {
  return (
    <div className="flex items-center justify-between px-3 pt-2 text-[0.5rem] font-medium tracking-wide text-white/55">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        {right}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/35">
      {children}
    </p>
  );
}

/** The green Spotify mark. */
function SpotifyGlyph({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.28c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.84-.18-.96-.6-.12-.42.18-.84.6-.96 4.56-1.02 8.52-.6 11.64 1.26.36.24.48.66.3 1.2zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.32 9.84-.66 13.5 1.62.42.24.54.78.24 1.2zm.12-3.36C15.24 8.36 8.82 8.22 5.1 9.3c-.54.18-1.08-.12-1.26-.66-.18-.54.12-1.08.66-1.26 4.26-1.2 11.34-1.02 15.78 1.32.48.3.6.9.3 1.38-.3.42-.9.6-1.38.3z" />
    </svg>
  );
}

function TabBar({ active }: { active: string }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "search", label: "Search" },
    { id: "library", label: "Library" },
  ];
  return (
    <div className="flex items-center justify-around border-t border-white/[0.06] px-2 py-2">
      {tabs.map((tab) => (
        <span
          key={tab.id}
          className={cn(
            "text-[0.5rem] transition-colors",
            tab.id === active ? "text-lavender" : "text-white/30",
          )}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — Discovery                                                      */
/* ------------------------------------------------------------------ */

const DISCOVER_SHELVES = [
  { title: "Chill Mix", meta: "42 songs", tone: "tide" as const },
  { title: "Night Drive", meta: "31 songs", tone: "dusk" as const },
  { title: "Deep Focus", meta: "58 songs", tone: "moss" as const },
];

const TRENDING = [
  { title: "Midnight Bloom", artist: "Aria Vale", tone: "dusk" as const },
  { title: "Golden Hour", artist: "Solar Drift", tone: "ember" as const },
  { title: "Paper Lanterns", artist: "Nova Reyes", tone: "rose" as const },
];

export function DiscoveryScreen() {
  const [chip, setChip] = useState("For you");
  const [track, setTrack] = useState(0);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#161020] to-[#08080c]">
      <MiniStatus />
      <div className="px-3 pt-2">
        <p className="text-[0.95rem] font-semibold tracking-tight text-white">
          Discover
        </p>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1.5">
        <Search size={9} className="text-white/30" />
        <span className="text-[0.5rem] text-white/30">Songs, artists, genres</span>
      </div>

      <div className="mt-2.5 flex gap-1 overflow-hidden px-3">
        {["For you", "Trending", "Chill", "New"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChip(c)}
            className={cn(
              "shrink-0 rounded-full px-2 py-[3px] text-[0.5rem] transition-colors",
              chip === c
                ? "bg-violet-core text-white"
                : "bg-white/[0.06] text-white/45",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 px-3">
        <SectionLabel>Made for you</SectionLabel>
        <div className="mt-1.5 flex gap-1.5">
          {DISCOVER_SHELVES.map((shelf, i) => (
            <div key={shelf.title} className="w-1/3">
              <AlbumArtwork
                tone={shelf.tone}
                title=""
                variant={i}
                rounded="rounded-md"
                className="aspect-square w-full shadow-md"
              />
              <p className="mt-1 truncate text-[0.5rem] font-medium text-white/85">
                {shelf.title}
              </p>
              <p className="truncate text-[0.4375rem] text-white/30">
                {shelf.meta}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-1.5 overflow-hidden px-3">
        <SectionLabel>Trending now</SectionLabel>
        {TRENDING.map((t, i) => (
          <button
            key={t.title}
            type="button"
            onClick={() => setTrack(i)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md p-1 text-left transition-colors",
              track === i ? "bg-white/[0.07]" : "hover:bg-white/[0.03]",
            )}
          >
            <AlbumArtwork
              tone={t.tone}
              title=""
              variant={i}
              rounded="rounded-[4px]"
              className="h-6 w-6 shrink-0"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.5rem] font-medium text-white/90">
                {t.title}
              </span>
              <span className="block truncate text-[0.4375rem] text-white/30">
                {t.artist}
              </span>
            </span>
            <span className="text-[0.4375rem] tabular-nums text-white/25">
              {i === 0 ? "3:42" : i === 1 ? "4:08" : "2:57"}
            </span>
          </button>
        ))}
      </div>

      <TabBar active="home" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Listen together                                                */
/* ------------------------------------------------------------------ */

export function TogetherScreen() {
  const [listeners, setListeners] = useState(4);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1026] to-[#08080c]">
      <MiniStatus right="Live" />
      <div className="flex items-center justify-between px-3 pt-2">
        <p className="text-[0.95rem] font-semibold tracking-tight text-white">
          Midnight Room
        </p>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-1.5 py-[2px] text-[0.4375rem] font-medium text-emerald-300">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          Synced
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center px-3">
        {["AR", "KV", "NR", "+2"].map((initials, i) => (
          <span
            key={initials}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full text-[0.5rem] font-semibold ring-2 ring-[#0b0912]",
              i === 3
                ? "bg-white/10 text-white/60"
                : "bg-gradient-to-br from-violet-core to-violet-deep text-white",
            )}
            style={{ marginLeft: i === 0 ? 0 : -8 }}
          >
            {initials}
          </span>
        ))}
      </div>

      <div className="mt-3 px-3">
        <AlbumArtwork
          tone="dusk"
          title=""
          variant={2}
          rounded="rounded-lg"
          className="aspect-[4/3] w-full shadow-lg"
        />
      </div>

      <div className="mt-2.5 px-3">
        <p className="text-[0.65rem] font-semibold text-white">Midnight Bloom</p>
        <p className="text-[0.5rem] text-white/35">
          Everyone is on the same second · {listeners} listening
        </p>
      </div>

      <div className="mt-2.5 space-y-1 px-3">
        {["Midnight Bloom", "Slow Tide", "Paper Lanterns"].map((title, i) => (
          <div
            key={title}
            className={cn(
              "flex items-center justify-between rounded-md px-2 py-1",
              i === 0 ? "bg-violet-core/15" : "bg-white/[0.03]",
            )}
          >
            <span className="truncate text-[0.5rem] text-white/70">{title}</span>
            {i === 0 && (
              <span className="flex items-end gap-[2px]" aria-hidden>
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className="w-[2px] rounded-full bg-violet-core"
                    style={{
                      height: `${5 + Math.abs(Math.sin(b * 1.2)) * 7}px`,
                      animation: `wave-pulse ${0.8 + b * 0.2}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1.5 px-3 pb-3">
        <button
          type="button"
          onClick={() => setListeners((n) => (n >= 8 ? 4 : n + 1))}
          className="flex flex-1 items-center justify-center gap-1 rounded-full bg-white py-1.5 text-[0.5rem] font-semibold text-black transition-transform active:scale-95"
        >
          <Users size={9} />
          Invite friends
        </button>
        <button
          type="button"
          className="grid h-7 w-7 place-items-center rounded-full border border-white/12 text-white/70 transition-colors hover:bg-white/5"
          aria-label="Add song"
        >
          <Plus size={11} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Lyrics                                                         */
/* ------------------------------------------------------------------ */

const LYRIC_LINES = [
  "City lights are fading slow",
  "and the record starts to spin",
  "I keep your voice on repeat",
  "like a song I let begin",
];

export function LyricsFeatureScreen() {
  const [active, setActive] = useState(2);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#171122] to-[#08080c]">
      <MiniStatus />
      <div className="flex items-center justify-between px-3 pt-2">
        <SectionLabel>Lyrics</SectionLabel>
        <span className="rounded-full bg-violet-core/20 px-1.5 py-[2px] text-[0.4375rem] font-medium text-lavender">
          Synced
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 px-3">
        <AlbumArtwork
          tone="rose"
          title=""
          variant={1}
          rounded="rounded-md"
          className="h-8 w-8 shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate text-[0.6rem] font-semibold text-white">
            Midnight Bloom
          </p>
          <p className="truncate text-[0.5rem] text-white/35">Aria Vale</p>
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-2.5 px-3">
        {LYRIC_LINES.map((line, i) => (
          <button
            key={line}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "block w-full text-left text-[0.65rem] leading-snug transition-all duration-300",
              i === active
                ? "font-semibold text-lavender"
                : "text-white/25",
            )}
          >
            {line}
          </button>
        ))}
      </div>

      <div className="px-3 pb-3">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender transition-all duration-500"
            style={{ width: `${((active + 1) / LYRIC_LINES.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[0.4375rem] tabular-nums text-white/30">
          <span>1:24</span>
          <span>3:42</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Equalizer                                                      */
/* ------------------------------------------------------------------ */

const EQ_PRESETS: Record<string, number[]> = {
  Flat: [50, 50, 50, 50, 50, 50, 50, 50],
  Bass: [88, 76, 90, 48, 55, 62, 54, 42],
  Vocal: [35, 45, 65, 88, 92, 85, 58, 45],
};

export function EqualizerFeatureScreen() {
  const [preset, setPreset] = useState("Bass");
  const [bass, setBass] = useState(true);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0f1418] to-[#08080c]">
      <MiniStatus />
      <div className="px-3 pt-2">
        <SectionLabel>Equalizer</SectionLabel>
        <p className="mt-0.5 text-[0.85rem] font-semibold tracking-tight text-white">
          {preset} Mode
        </p>
      </div>

      <div className="mt-2 flex gap-1 px-3">
        {Object.keys(EQ_PRESETS).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPreset(p)}
            className={cn(
              "rounded-full px-2 py-[3px] text-[0.5rem] font-medium transition-colors",
              preset === p
                ? "bg-violet-core text-white"
                : "bg-white/[0.06] text-white/45",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-1 items-end gap-1 px-3">
        {EQ_PRESETS[preset].map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <div className="relative flex w-full flex-1 items-end justify-center rounded-full bg-white/[0.05]">
              <div
                className="w-[3px] rounded-full bg-gradient-to-t from-violet-deep to-lavender"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(196,181,253,0.9)]"
                style={{ bottom: `calc(${h}% - 3px)` }}
              />
            </div>
            <span className="text-[0.375rem] tabular-nums text-white/25">
              {["32", "64", "125", "250", "1k", "2k", "4k", "8k"][i]}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setBass((v) => !v)}
        className="mx-3 mb-3 flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2"
      >
        <span className="text-[0.5rem] text-white/50">Bass enhancement</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-[2px] text-[0.4375rem] font-medium transition-colors",
            bass ? "bg-violet-core text-white" : "bg-white/10 text-white/40",
          )}
        >
          {bass ? "+6 dB" : "Off"}
        </span>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Library                                                        */
/* ------------------------------------------------------------------ */

const PLAYLISTS = [
  { title: "Late Night Drive", meta: "24 tracks", tone: "dusk" as const },
  { title: "Focus / Deep Work", meta: "18 tracks", tone: "tide" as const },
  { title: "Sunday Morning", meta: "31 tracks", tone: "ember" as const },
  { title: "Liked Songs", meta: "412 tracks", tone: "rose" as const },
];

export function LibraryFeatureScreen() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#121018] to-[#08080c]">
      <MiniStatus />
      <div className="px-3 pt-2">
        <SectionLabel>Your library</SectionLabel>
        <p className="mt-0.5 text-[0.9rem] font-semibold tracking-tight text-white">
          Playlists
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2 py-1.5">
        <Search size={9} className="text-white/30" />
        <span className="text-[0.5rem] text-white/25">Search library…</span>
      </div>

      <div className="mt-2.5 flex-1 space-y-1.5 px-3">
        {PLAYLISTS.map((row, i) => (
          <button
            key={row.title}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md p-1 text-left transition-colors",
              selected === i ? "bg-white/[0.07]" : "hover:bg-white/[0.03]",
            )}
          >
            <AlbumArtwork
              tone={row.tone}
              title=""
              variant={i}
              rounded="rounded-[5px]"
              className="h-7 w-7 shrink-0"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.55rem] font-medium text-white/90">
                {row.title}
              </span>
              <span className="block truncate text-[0.4375rem] text-white/30">
                {row.meta}
              </span>
            </span>
            {selected === i && (
              <span className="flex items-end gap-[2px]" aria-hidden>
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className="w-[2px] rounded-full bg-violet-core"
                    style={{
                      height: `${4 + Math.abs(Math.sin(b * 1.4)) * 6}px`,
                      animation: `wave-pulse ${0.7 + b * 0.2}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </span>
            )}
          </button>
        ))}
      </div>

      <TabBar active="library" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — Offline                                                        */
/* ------------------------------------------------------------------ */

const DOWNLOADS = [
  { title: "Midnight Bloom", artist: "Aria Vale", size: "8.4 MB", tone: "dusk" as const },
  { title: "Golden Hour", artist: "Solar Drift", size: "9.1 MB", tone: "ember" as const },
  { title: "Paper Lanterns", artist: "Nova Reyes", size: "7.2 MB", tone: "rose" as const },
  { title: "Slow Tide", artist: "Kite & Co.", size: "6.8 MB", tone: "tide" as const },
];

export function OfflineFeatureScreen() {
  const [quality, setQuality] = useState("Lossless");

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0f1418] to-[#08080c]">
      <MiniStatus right="Offline" />
      <div className="px-3 pt-2">
        <SectionLabel>Downloads</SectionLabel>
        <p className="mt-0.5 text-[0.9rem] font-semibold tracking-tight text-white">
          Available offline
        </p>
      </div>

      <div className="mt-2.5 mx-3 rounded-lg bg-white/[0.04] p-2.5">
        <div className="flex items-center justify-between text-[0.4375rem] text-white/40">
          <span>1.8 GB used</span>
          <span>4 GB limit</span>
        </div>
        <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
        </div>
        <div className="mt-2 flex gap-1">
          {["Lossless", "High", "Data saver"].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuality(q)}
              className={cn(
                "rounded-full px-1.5 py-[2px] text-[0.4375rem] transition-colors",
                quality === q
                  ? "bg-violet-core text-white"
                  : "bg-white/[0.06] text-white/40",
              )}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex-1 space-y-1.5 px-3">
        {DOWNLOADS.map((d, i) => (
          <div
            key={d.title}
            className="flex items-center gap-2 rounded-md px-1 py-0.5"
          >
            <AlbumArtwork
              tone={d.tone}
              title=""
              variant={i}
              rounded="rounded-[5px]"
              className="h-7 w-7 shrink-0"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.55rem] font-medium text-white/90">
                {d.title}
              </span>
              <span className="block truncate text-[0.4375rem] text-white/30">
                {d.artist}
              </span>
            </span>
            <span className="text-[0.4375rem] tabular-nums text-white/25">
              {d.size}
            </span>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Check size={9} strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 border-t border-white/[0.06] px-3 py-2 text-[0.4375rem] text-white/30">
        <CloudDownload size={9} />
        Auto-download over Wi-Fi only
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — Appearance                                                     */
/* ------------------------------------------------------------------ */

const THEMES = [
  { name: "Midnight", from: "#4C1D95", to: "#1E1B4B" },
  { name: "Ember", from: "#7C2D12", to: "#1C1917" },
  { name: "Tide", from: "#0E7490", to: "#082F49" },
  { name: "Rose", from: "#831843", to: "#1F0A16" },
  { name: "Moss", from: "#14532D", to: "#052E16" },
  { name: "Mono", from: "#27272A", to: "#09090B" },
];

export function AppearanceFeatureScreen() {
  const [theme, setTheme] = useState(0);
  const [amoled, setAmoled] = useState(true);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#141020] to-[#08080c]">
      <MiniStatus />
      <div className="flex items-center justify-between px-3 pt-2">
        <div>
          <SectionLabel>Appearance</SectionLabel>
          <p className="mt-0.5 text-[0.9rem] font-semibold tracking-tight text-white">
            Themes
          </p>
        </div>
        <Palette size={13} className="text-white/30" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 px-3">
        {THEMES.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setTheme(i)}
            className="flex flex-col items-center gap-1"
          >
            <span
              className={cn(
                "grid aspect-square w-full place-items-center rounded-lg transition-all duration-300",
                theme === i
                  ? "ring-2 ring-violet-core shadow-[0_0_16px_rgba(168,85,247,0.5)]"
                  : "ring-1 ring-white/10",
              )}
              style={{
                background: `radial-gradient(120% 120% at 20% 10%, ${t.from} 0%, ${t.to} 100%)`,
              }}
            >
              {theme === i && (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-white/90">
                  <Check size={9} strokeWidth={3} className="text-black" />
                </span>
              )}
            </span>
            <span className="text-[0.4375rem] text-white/40">{t.name}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setAmoled((v) => !v)}
        className="mx-3 mt-3 flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2"
      >
        <span className="text-[0.5rem] text-white/50">Pure black OLED mode</span>
        <span
          className={cn(
            "relative h-3 w-6 rounded-full transition-colors",
            amoled ? "bg-violet-core" : "bg-white/15",
          )}
        >
          <span
            className={cn(
              "absolute top-[1px] h-2.5 w-2.5 rounded-full bg-white transition-all",
              amoled ? "left-[11px]" : "left-[1px]",
            )}
          />
        </span>
      </button>

      <div className="mt-auto px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5">
          <AlbumArtwork
            tone={THEMES[theme].from === "#7C2D12" ? "ember" : "dusk"}
            title=""
            variant={0}
            rounded="rounded-md"
            className="h-7 w-7 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.5rem] font-medium text-white/90">
              Midnight Bloom
            </p>
            <p className="truncate text-[0.4375rem] text-white/30">Aria Vale</p>
          </div>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
            <Play size={9} className="translate-x-[1px] fill-black" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 08 — Spotify                                                        */
/* ------------------------------------------------------------------ */

const SPOTIFY_PLAYLISTS = [
  { title: "Chill Mix", meta: "62 tracks", tone: "tide" as const },
  { title: "Night Drive", meta: "41 tracks", tone: "dusk" as const },
  { title: "Focus / Deep Work", meta: "88 tracks", tone: "moss" as const },
  { title: "Liked Songs", meta: "412 tracks", tone: "rose" as const },
];

export function SpotifyFeatureScreen() {
  const [connected, setConnected] = useState(true);
  const [playing, setPlaying] = useState(0);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0d1a12] to-[#08080c]">
      <MiniStatus right={connected ? "Connected" : "Offline"} />
      <div className="flex items-center justify-between px-3 pt-2">
        <div>
          <SectionLabel>Integrations</SectionLabel>
          <p className="mt-0.5 text-[0.9rem] font-semibold tracking-tight text-white">
            Spotify
          </p>
        </div>
        <SpotifyGlyph size={15} className="text-[#1DB954]" />
      </div>

      <div className="mt-2.5 mx-3 rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#1DB954]/15 to-transparent p-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1DB954] text-black">
            <SpotifyGlyph size={13} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.55rem] font-semibold text-white">
              {connected ? "Spotify connected" : "Connect your account"}
            </p>
            <p className="truncate text-[0.4375rem] text-white/35">
              {connected ? "shubham.rana · Premium" : "Sync playlists & history"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConnected((v) => !v)}
            className={cn(
              "shrink-0 rounded-full px-2 py-1 text-[0.4375rem] font-semibold transition-colors",
              connected
                ? "bg-white/[0.08] text-white/70"
                : "bg-[#1DB954] text-black",
            )}
          >
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>

        {connected && (
          <div className="mt-2 flex items-center gap-1 rounded-lg bg-black/25 px-2 py-1.5">
            <Link2 size={9} className="text-[#1DB954]" />
            <span className="truncate text-[0.4375rem] text-white/50">
              Your playlists are now available in MAHII
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex-1 px-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Your playlists</SectionLabel>
          <ListMusic size={10} className="text-white/25" />
        </div>
        <div className="mt-1.5 space-y-1.5">
          {SPOTIFY_PLAYLISTS.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setPlaying(i)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md p-1 text-left transition-colors",
                playing === i ? "bg-[#1DB954]/12" : "hover:bg-white/[0.03]",
              )}
            >
              <AlbumArtwork
                tone={p.tone}
                title=""
                variant={i}
                rounded="rounded-[5px]"
                className="h-7 w-7 shrink-0"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.55rem] font-medium text-white/90">
                  {p.title}
                </span>
                <span className="block truncate text-[0.4375rem] text-white/30">
                  {p.meta} · Spotify
                </span>
              </span>
              {playing === i ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1DB954] text-black">
                  <Radio size={9} />
                </span>
              ) : (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/[0.07] text-white/50">
                  <Play size={8} className="translate-x-[1px] fill-current" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 border-t border-white/[0.06] px-3 py-2 text-[0.4375rem] text-white/30">
        <Sparkles size={9} className="text-[#1DB954]" />
        Listen with MAHII · even offline
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export const FEATURE_SCREENS: Record<string, () => React.JSX.Element> = {
  discovery: DiscoveryScreen,
  together: TogetherScreen,
  lyrics: LyricsFeatureScreen,
  audio: EqualizerFeatureScreen,
  library: LibraryFeatureScreen,
  offline: OfflineFeatureScreen,
  personal: AppearanceFeatureScreen,
  spotify: SpotifyFeatureScreen,
};
