import { cn } from "@/lib/utils";
import { AlbumArtwork } from "./AlbumArtwork";

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

function Transport({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-6 text-white/85">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
      </svg>
      <span
        className={cn(
          "grid place-items-center rounded-full bg-white text-black",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 4h3v16H7zM14 4h3v16h-3z" />
        </svg>
      </span>
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
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1226] via-[#0d0b14] to-[#08080c]">
      <StatusBar />
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          <span>Playing now</span>
          <span className="text-violet-core">Hi-Fi</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <AlbumArtwork
          tone="dusk"
          title="Midnight Bloom"
          variant={0}
          rounded="rounded-[1.1rem]"
          className="aspect-square w-full shadow-[0_24px_60px_-20px_rgba(168,85,247,0.55)]"
        />
      </div>

      <div className="px-5 pt-4">
        <p className="truncate text-[0.9375rem] font-semibold tracking-tight text-white">
          Midnight Bloom
        </p>
        <p className="truncate text-[0.6875rem] text-white/45">Aria Vale</p>
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
        <Transport />
        <div className="mt-4 flex items-center justify-between">
          <MiniBars count={14} />
          <span className="text-[0.5rem] uppercase tracking-[0.18em] text-white/35">
            Queue
          </span>
        </div>
      </div>
    </div>
  );
}

export function LyricsScreen() {
  const lines = [
    { t: "City lights are fading slow", active: false },
    { t: "and the record starts to spin", active: false },
    { t: "I keep your voice on repeat", active: true },
    { t: "like a song I let begin", active: false },
    { t: "every hour, every echo", active: false },
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#141020] to-[#08080c]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Lyrics
        </span>
        <span className="rounded-full bg-violet-core/15 px-2 py-0.5 text-[0.5rem] font-medium text-lavender">
          Synced
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
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "text-[0.8125rem] leading-snug tracking-tight transition-colors",
              line.active
                ? "font-semibold text-white"
                : "text-white/28",
            )}
          >
            {line.t}
          </p>
        ))}
      </div>

      <div className="px-5 pb-5">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/12">
          <div className="h-full w-[52%] rounded-full bg-gradient-to-r from-violet-deep to-lavender" />
        </div>
        <div className="mt-4">
          <Transport compact />
        </div>
      </div>
    </div>
  );
}

export function EqualizerScreen() {
  const bands = [72, 58, 84, 46, 66, 92, 54, 38];
  const labels = ["32", "64", "125", "250", "1k", "2k", "4k", "8k"];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#101018] to-[#08080c]">
      <StatusBar />
      <div className="px-4 pt-2">
        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Equalizer
        </p>
        <p className="mt-1 text-[0.9375rem] font-semibold tracking-tight text-white">
          Bass Boost
        </p>
      </div>

      <div className="mt-3 flex gap-1.5 px-4">
        {["Flat", "Bass", "Vocal", "Live"].map((p, i) => (
          <span
            key={p}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.5rem] font-medium",
              i === 1
                ? "bg-violet-core text-white"
                : "bg-white/6 text-white/45",
            )}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-1 items-end justify-between gap-2 px-5 pb-6">
        {bands.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div className="relative flex w-full flex-1 items-end justify-center rounded-full bg-white/5">
              <div
                className="w-[3px] rounded-full bg-gradient-to-t from-violet-deep to-lavender"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(196,181,253,0.9)]"
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
  const rows = [
    { title: "Late Night Drive", meta: "24 tracks", tone: "dusk" as const },
    { title: "Focus / Deep Work", meta: "18 tracks", tone: "tide" as const },
    { title: "Sunday Morning", meta: "31 tracks", tone: "ember" as const },
    { title: "Liked Songs", meta: "412 tracks", tone: "rose" as const },
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#111018] to-[#08080c]">
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
        <span className="text-[0.5625rem] text-white/30">Search your library</span>
      </div>

      <div className="mt-4 flex-1 space-y-2.5 px-4">
        {rows.map((row, i) => (
          <div key={row.title} className="flex items-center gap-3">
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
            <span className="text-white/20">···</span>
          </div>
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
  const queue = [
    { title: "Midnight Bloom", by: "Aria Vale", active: true },
    { title: "Slow Tide", by: "Kite & Co.", active: false },
    { title: "Paper Lanterns", by: "Nova Reyes", active: false },
  ];

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#160f24] to-[#08080c]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-white/40">
          Listening room
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/12 px-2 py-0.5 text-[0.5rem] font-medium text-emerald-300">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Synced
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 px-4">
        {["AR", "KV", "NR", "+2"].map((initials, i) => (
          <span
            key={initials}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full text-[0.5rem] font-semibold ring-2 ring-[#0b0912]",
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

      <div className="mt-3 flex-1 space-y-2 px-4">
        {queue.map((q) => (
          <div
            key={q.title}
            className={cn(
              "flex items-center justify-between rounded-md px-2 py-1.5",
              q.active ? "bg-violet-core/12" : "bg-white/[0.03]",
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

      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-5">
          <span className="text-[0.5rem] text-white/35">Shared queue</span>
          <span className="rounded-full bg-white px-3 py-1 text-[0.5rem] font-semibold text-black">
            Add song
          </span>
        </div>
      </div>
    </div>
  );
}
