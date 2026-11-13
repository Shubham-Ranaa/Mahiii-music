"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlbumArtwork } from "./AlbumArtwork";
import { Heart, Play, Pause, Plus, Link2, ListMusic, Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pt-3 text-[0.5625rem] font-medium tracking-wide",
        light ? "text-black/70" : "text-white/70",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
        <span className="inline-block h-1.5 w-3 rounded-[2px] border border-current opacity-80" />
      </span>
    </div>
  );
}

function MiniBars({ count = 12 }: { count?: number }) {
  return (
    <div className="flex h-6 items-end gap-[2px]" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-violet-core/80"
          style={{
            height: `${25 + Math.abs(Math.sin(i * 1.1)) * 70}%`,
            animation: `wave-pulse ${1.3 + (i % 5) * 0.2}s ease-in-out ${i * 0.07}s infinite alternate`,
          }}
        />
      ))}
    </div>
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

function Transport({
  compact = false,
  isPlaying = true,
  onToggle,
}: {
  compact?: boolean;
  isPlaying?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6 text-white/85">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
      </svg>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={cn(
          "grid place-items-center rounded-full bg-white text-black transition-transform active:scale-95 shadow-md",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M7 4h3v16H7zM14 4h3v16h-3z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

export function NowPlayingScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1226] via-[#0d0b14] to-[#08080c] select-none">
      <StatusBar />
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          <span>Playing now</span>
          <span className="text-violet-core font-semibold">Hi-Fi Audio</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="relative aspect-square w-full">
          <div
            className={cn(
              "absolute -inset-2 rounded-2xl opacity-60 blur-md transition-opacity duration-500",
              isPlaying ? "bg-violet-core/40 opacity-80" : "opacity-0",
            )}
          />
          <AlbumArtwork
            tone="dusk"
            title="Midnight Bloom"
            variant={0}
            rounded="rounded-[1.1rem]"
            className="aspect-square w-full shadow-[0_24px_60px_-20px_rgba(168,85,247,0.55)] ring-1 ring-white/10"
          />
        </div>
      </div>

      <div className="px-5 pt-4 flex items-center justify-between">
        <div className="min-w-0">
          <p className="truncate text-[0.9375rem] font-semibold tracking-tight text-white">
            Midnight Bloom
          </p>
          <p className="truncate text-[0.6875rem] text-white/45">Aria Vale</p>
        </div>
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          aria-label="Like song"
          className="text-white/60 hover:text-white"
        >
          <Heart size={16} className={liked ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      <div className="px-5 pt-3">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/12">
          <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.5rem] tabular-nums text-white/35">
          <span>1:24</span>
          <span>3:42</span>
        </div>
      </div>

      <div className="mt-auto px-5 pb-4">
        <Transport isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />
        <div className="mt-4 flex items-center justify-between">
          <MiniBars count={14} />
          <span className="text-[0.5rem] uppercase tracking-[0.18em] text-white/35">
            Queue · Synced
          </span>
        </div>
      </div>
    </div>
  );
}

export function LyricsScreen() {
  const [activeIdx, setActiveIdx] = useState(2);
  const lines = [
    "City lights are fading slow",
    "and the record starts to spin",
    "I keep your voice on repeat",
    "like a song I let begin",
    "every hour, every echo",
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#141020] to-[#08080c] select-none">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Lyrics
        </span>
        <span className="rounded-full bg-violet-core/20 px-2 py-0.5 text-[0.5rem] font-medium text-lavender">
          Synchronized
        </span>
      </div>

      <div className="flex items-center gap-3 px-4 pt-4">
        <AlbumArtwork
          tone="dusk"
          title=""
          variant={1}
          rounded="rounded-lg"
          className="h-11 w-11 shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate text-[0.75rem] font-semibold text-white">
            Midnight Bloom
          </p>
          <p className="truncate text-[0.5625rem] text-white/45">Aria Vale</p>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-3.5 px-5">
        {lines.map((text, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              "block w-full text-left text-[0.8125rem] leading-snug tracking-tight transition-all duration-300",
              i === activeIdx
                ? "font-semibold text-white scale-[1.03] origin-left text-lavender"
                : "text-white/28 hover:text-white/50",
            )}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="px-5 pb-5">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/12">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-deep to-lavender transition-all duration-300"
            style={{ width: `${((activeIdx + 1) / lines.length) * 100}%` }}
          />
        </div>
        <div className="mt-4">
          <Transport compact />
        </div>
      </div>
    </div>
  );
}

export function EqualizerScreen() {
  const PRESETS: Record<string, number[]> = {
    "Flat": [50, 50, 50, 50, 50, 50, 50, 50],
    "Bass": [85, 74, 88, 48, 55, 62, 54, 42],
    "Vocal": [35, 45, 65, 88, 92, 85, 58, 45],
    "Live": [70, 60, 50, 65, 75, 88, 80, 70],
  };

  const [activePreset, setActivePreset] = useState("Bass");
  const [bands, setBands] = useState<number[]>(PRESETS["Bass"]);
  const labels = ["32", "64", "125", "250", "1k", "2k", "4k", "8k"];

  const selectPreset = (p: string) => {
    setActivePreset(p);
    setBands(PRESETS[p]);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#101018] to-[#08080c] select-none">
      <StatusBar />
      <div className="px-4 pt-2">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Equalizer
        </p>
        <p className="mt-1 text-[0.9375rem] font-semibold tracking-tight text-white">
          {activePreset} Mode
        </p>
      </div>

      <div className="mt-3 flex gap-1.5 px-4">
        {Object.keys(PRESETS).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => selectPreset(p)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.5rem] font-medium transition-colors",
              p === activePreset
                ? "bg-violet-core text-white shadow-sm"
                : "bg-white/6 text-white/45 hover:text-white",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-1 items-end justify-between gap-2 px-5 pb-6">
        {bands.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div className="relative flex w-full flex-1 items-end justify-center rounded-full bg-white/5">
              <div
                className="w-[3px] rounded-full bg-gradient-to-t from-violet-deep to-lavender transition-all duration-300"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(196,181,253,0.9)] transition-all duration-300"
                style={{ bottom: `calc(${h}% - 4px)` }}
              />
            </div>
            <span className="text-[0.4375rem] tabular-nums text-white/30">
              {labels[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/6 px-4 py-3">
        <div className="flex items-center justify-between text-[0.5625rem] text-white/45">
          <span>Bass enhancement</span>
          <span className="text-lavender">+6 dB</span>
        </div>
        <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
        </div>
      </div>
    </div>
  );
}

export function LibraryScreen() {
  const [selected, setSelected] = useState(0);
  const rows = [
    { title: "Late Night Drive", meta: "24 tracks", tone: "dusk" as const },
    { title: "Focus / Deep Work", meta: "18 tracks", tone: "tide" as const },
    { title: "Sunday Morning", meta: "31 tracks", tone: "ember" as const },
    { title: "Liked Songs", meta: "412 tracks", tone: "rose" as const },
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#111018] to-[#08080c] select-none">
      <StatusBar />
      <div className="px-4 pt-2">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Your library
        </p>
        <p className="mt-1 text-[1.0625rem] font-semibold tracking-tight text-white">
          Playlists
        </p>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-2 rounded-lg bg-white/6 px-3 py-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/35" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="text-[0.5625rem] text-white/30">Search library...</span>
      </div>

      <div className="mt-4 flex-1 space-y-2.5 px-4">
        {rows.map((row, i) => (
          <button
            key={row.title}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg p-1.5 text-left transition-colors",
              selected === i ? "bg-white/[0.08]" : "hover:bg-white/[0.03]",
            )}
          >
            <AlbumArtwork
              tone={row.tone}
              title=""
              variant={i}
              rounded="rounded-md"
              className="h-9 w-9 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.6875rem] font-medium text-white/90">
                {row.title}
              </p>
              <p className="truncate text-[0.5rem] text-white/35">{row.meta}</p>
            </div>
            {selected === i && (
              <span className="h-1.5 w-1.5 rounded-full bg-violet-core" />
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-white/6 px-4 py-2.5">
        <div className="flex items-center justify-between text-[0.5rem] text-white/35">
          <span>Favourites</span>
          <span>History</span>
          <span className="text-lavender">Playlists</span>
          <span>Downloads</span>
        </div>
      </div>
    </div>
  );
}

export function RoomScreen() {
  const [queue, setQueue] = useState([
    { title: "Midnight Bloom", by: "Aria Vale", active: true },
    { title: "Slow Tide", by: "Kite & Co.", active: false },
    { title: "Paper Lanterns", by: "Nova Reyes", active: false },
  ]);

  const addSong = () => {
    const extraSongs = [
      { title: "Ocean Motion", by: "Solar Drift", active: false },
      { title: "Echoes of Rain", by: "Aura", active: false },
    ];
    const nextSong = extraSongs[queue.length % extraSongs.length];
    setQueue((prev) => [...prev, nextSong]);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#160f24] to-[#08080c] select-none">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Listening room
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/12 px-2 py-0.5 text-[0.5rem] font-medium text-emerald-300">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          Synced
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 px-4">
        {["AR", "KV", "NR", "+2"].map((initials, i) => (
          <span
            key={initials}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full text-[0.5rem] font-semibold ring-2 ring-[#0b0912] shadow-sm",
              i === 3
                ? "bg-white/10 text-white/60"
                : "bg-gradient-to-br from-violet-core to-violet-deep text-white",
            )}
            style={{ marginLeft: i === 0 ? 0 : -10 }}
          >
            {initials}
          </span>
        ))}
      </div>

      <div className="mt-4 px-4">
        <AlbumArtwork
          tone="dusk"
          title=""
          variant={2}
          rounded="rounded-[0.9rem]"
          className="aspect-[4/3] w-full"
        />
      </div>

      <div className="mt-3 px-5">
        <p className="text-[0.75rem] font-semibold text-white">Midnight Bloom</p>
        <p className="text-[0.5rem] text-white/40">Everyone in sync · 4 listeners</p>
      </div>

      <div className="mt-3 flex-1 space-y-2 px-4 overflow-y-auto no-scrollbar max-h-[110px]">
        {queue.map((q) => (
          <div
            key={q.title}
            className={cn(
              "flex items-center justify-between rounded-md px-2 py-1.5 transition-colors",
              q.active ? "bg-violet-core/15" : "bg-white/[0.03]",
            )}
          >
            <div className="min-w-0">
              <p
                className={cn(
                  "truncate text-[0.5625rem] font-medium",
                  q.active ? "text-white" : "text-white/60",
                )}
              >
                {q.title}
              </p>
              <p className="truncate text-[0.4375rem] text-white/30">{q.by}</p>
            </div>
            {q.active ? <MiniBars count={4} /> : null}
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-[0.5rem] text-white/35">Shared queue</span>
          <button
            type="button"
            onClick={addSong}
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[0.5rem] font-semibold text-black transition-transform active:scale-95"
          >
            <Plus size={10} />
            <span>Add song</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SpotifyScreen() {
  const [connected, setConnected] = useState(true);
  const [active, setActive] = useState(0);

  const playlists = [
    { title: "Chill Mix", meta: "62 tracks", tone: "tide" as const },
    { title: "Night Drive", meta: "41 tracks", tone: "dusk" as const },
    { title: "Focus / Deep Work", meta: "88 tracks", tone: "moss" as const },
    { title: "Liked Songs", meta: "412 tracks", tone: "rose" as const },
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0d1a12] via-[#0a0f0c] to-[#08080c] select-none">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-3">
        <div>
          <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
            Integrations
          </p>
          <p className="mt-1 text-[1.0625rem] font-semibold tracking-tight text-white">
            Spotify
          </p>
        </div>
        <SpotifyGlyph size={18} className="text-[#1DB954]" />
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#1DB954]/15 via-transparent to-transparent p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1DB954] text-black shadow-[0_0_24px_rgba(29,185,84,0.45)]">
            <SpotifyGlyph size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.8125rem] font-semibold text-white">
              {connected ? "Spotify connected" : "Connect your account"}
            </p>
            <p className="truncate text-[0.625rem] text-white/40">
              {connected
                ? "shubham.rana · Premium"
                : "Sync playlists, likes and history"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConnected(!connected)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-[0.5625rem] font-semibold transition-all active:scale-95",
              connected
                ? "bg-white/[0.08] text-white/70 hover:bg-white/[0.12]"
                : "bg-[#1DB954] text-black hover:bg-[#1ed760]",
            )}
          >
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>

        {connected && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2">
            <Link2 size={11} className="shrink-0 text-[#1DB954]" />
            <span className="truncate text-[0.5625rem] text-white/50">
              Your playlists are now available in MAHII
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between px-4">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Your playlists
        </p>
        <ListMusic size={12} className="text-white/25" />
      </div>

      <div className="mt-3 flex-1 space-y-2 px-4">
        {playlists.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl p-1.5 text-left transition-colors",
              active === i ? "bg-[#1DB954]/12" : "hover:bg-white/[0.03]",
            )}
          >
            <AlbumArtwork
              tone={p.tone}
              title=""
              variant={i}
              rounded="rounded-lg"
              className="h-10 w-10 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.75rem] font-medium text-white/90">
                {p.title}
              </p>
              <p className="truncate text-[0.5625rem] text-white/35">
                {p.meta} · Spotify
              </p>
            </div>
            {active === i ? (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1DB954] text-black">
                <Check size={12} strokeWidth={3} />
              </span>
            ) : (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.07] text-white/50">
                <Play size={11} className="translate-x-0.5 fill-current" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-white/6 px-4 py-3 text-center text-[0.5625rem] text-white/35">
        Play your Spotify library with MAHII — even offline
      </div>
    </div>
  );
}
