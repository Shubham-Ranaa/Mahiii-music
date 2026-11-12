"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Heart, Music2, AlignLeft, Sparkles } from "lucide-react";
import { AlbumArtwork, type ArtworkTone } from "./AlbumArtwork";
import { cn } from "@/lib/utils";

export type Track = {
  id: string;
  title: string;
  artist: string;
  tone: ArtworkTone;
  variant: number;
  duration: number; // in seconds
  lyrics: string[];
};

export const DEMO_TRACKS: Track[] = [
  {
    id: "track-1",
    title: "Midnight Bloom",
    artist: "Aria Vale",
    tone: "dusk",
    variant: 0,
    duration: 222,
    lyrics: [
      "City lights are fading slow",
      "and the record starts to spin",
      "I keep your voice on repeat",
      "like a song I let begin",
      "every hour, every echo",
    ],
  },
  {
    id: "track-2",
    title: "Golden Hour",
    artist: "Solar Drift",
    tone: "ember",
    variant: 1,
    duration: 198,
    lyrics: [
      "Amber rays across the bay",
      "chasing shadows in the haze",
      "hold the melody in time",
      "until the evening aligns",
    ],
  },
  {
    id: "track-3",
    title: "Low Tide",
    artist: "Echo Wave",
    tone: "tide",
    variant: 2,
    duration: 245,
    lyrics: [
      "Deep beneath the quiet ocean",
      "whispers move in gentle motion",
      "stay awake into the blue",
      "every beat returning true",
    ],
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function InteractiveNowPlaying({
  initialTrackIndex = 0,
  onTrackChange,
}: {
  initialTrackIndex?: number;
  onTrackChange?: (track: Track) => void;
}) {
  const [trackIndex, setTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(84);
  const [isLiked, setIsLiked] = useState(false);
  const [viewMode, setViewMode] = useState<"player" | "lyrics">("player");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const track = DEMO_TRACKS[trackIndex];

  // Advance time when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => (prev >= track.duration ? 0 : prev + 1));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, track.duration]);

  const handleNext = () => {
    const nextIdx = (trackIndex + 1) % DEMO_TRACKS.length;
    setTrackIndex(nextIdx);
    setCurrentTime(12);
    onTrackChange?.(DEMO_TRACKS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (trackIndex - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length;
    setTrackIndex(prevIdx);
    setCurrentTime(0);
    onTrackChange?.(DEMO_TRACKS[prevIdx]);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTime(Math.floor(ratio * track.duration));
  };

  const progressPercent = (currentTime / track.duration) * 100;

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#181126] via-[#0d0b14] to-[#08080c] select-none text-white">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[0.5625rem] font-medium tracking-wide text-white/70">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 rounded-full bg-violet-core/20 px-1.5 py-0.2 text-[0.45rem] font-semibold text-lavender">
            <Sparkles size={8} /> Hi-Fi
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          <span className="inline-block h-1.5 w-3 rounded-[2px] border border-current opacity-80" />
        </div>
      </div>

      {/* Top Bar Switcher */}
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-1 rounded-full bg-white/6 p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("player")}
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.5rem] font-medium transition-colors",
              viewMode === "player"
                ? "bg-violet-core/80 text-white shadow-sm"
                : "text-white/50 hover:text-white",
            )}
          >
            <Music2 size={9} /> Artwork
          </button>
          <button
            type="button"
            onClick={() => setViewMode("lyrics")}
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.5rem] font-medium transition-colors",
              viewMode === "lyrics"
                ? "bg-violet-core/80 text-white shadow-sm"
                : "text-white/50 hover:text-white",
            )}
          >
            <AlignLeft size={9} /> Lyrics
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="text-white/60 transition-transform active:scale-125"
          aria-label="Like song"
        >
          <Heart
            size={14}
            className={cn(
              "transition-colors",
              isLiked ? "fill-rose-500 text-rose-500" : "hover:text-white",
            )}
          />
        </button>
      </div>

      {/* Main Content Area */}
      {viewMode === "player" ? (
        <div className="flex flex-col px-4 pt-3 flex-1 justify-center">
          <div className="relative mx-auto aspect-square w-full max-w-[210px]">
            {/* Spinning ambient vinyl edge when playing */}
            <div
              className={cn(
                "absolute -inset-1.5 rounded-2xl opacity-60 blur-md transition-all duration-700",
                isPlaying
                  ? "bg-gradient-to-r from-violet-core via-lavender to-violet-deep opacity-80"
                  : "opacity-20",
              )}
            />
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-[1.2rem] shadow-[0_20px_50px_-15px_rgba(168,85,247,0.6)] transition-transform duration-500",
                isPlaying ? "scale-[1.01]" : "scale-[0.98]",
              )}
            >
              <AlbumArtwork
                tone={track.tone}
                title={track.title}
                variant={track.variant}
                rounded="rounded-[1.2rem]"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-semibold tracking-tight text-white">
                {track.title}
              </p>
              <p className="truncate text-[0.6875rem] text-white/50">{track.artist}</p>
            </div>
            <span className="font-mono text-[0.5rem] tracking-wider text-violet-core/90 uppercase">
              SYNCED
            </span>
          </div>
        </div>
      ) : (
        /* Lyrics Screen Mode */
        <div className="flex flex-1 flex-col justify-center space-y-2.5 px-5 pt-3">
          <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
            <AlbumArtwork
              tone={track.tone}
              title=""
              variant={track.variant}
              rounded="rounded-md"
              className="h-7 w-7"
            />
            <div className="min-w-0">
              <p className="truncate text-[0.7rem] font-medium text-white">{track.title}</p>
              <p className="truncate text-[0.5rem] text-white/40">{track.artist}</p>
            </div>
          </div>
          {track.lyrics.map((line, i) => (
            <p
              key={line}
              className={cn(
                "text-[0.8125rem] leading-snug tracking-tight transition-all duration-300",
                i === 2
                  ? "font-semibold text-lavender scale-[1.02] origin-left"
                  : "text-white/35",
              )}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Progress & Scrubbing Bar */}
      <div className="px-5 pt-2">
        <div
          onClick={handleSeek}
          className="group relative h-2.5 w-full cursor-pointer flex items-center"
        >
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15 transition-all group-hover:h-[5px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender transition-[width] duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span
            className="absolute h-2 w-2 rounded-full bg-white opacity-0 shadow-[0_0_8px_#fff] transition-opacity group-hover:opacity-100 -translate-x-1/2"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[0.5rem] tabular-nums text-white/40 pt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="px-5 pb-4 pt-1">
        <div className="flex items-center justify-center gap-5 text-white/80">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous track"
            className="rounded-full p-2 text-white/60 transition-transform hover:text-white active:scale-90"
          >
            <SkipBack size={15} />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-void shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={17} className="fill-void text-void" />
            ) : (
              <Play size={17} className="fill-void text-void translate-x-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next track"
            className="rounded-full p-2 text-white/60 transition-transform hover:text-white active:scale-90"
          >
            <SkipForward size={15} />
          </button>
        </div>

        {/* Live Equalizer Mini Bars */}
        <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-2">
          <div className="flex h-4 items-end gap-[2px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-[2px] rounded-full transition-all duration-300",
                  isPlaying ? "bg-violet-core" : "bg-white/20",
                )}
                style={{
                  height: isPlaying
                    ? `${25 + Math.abs(Math.sin((i + currentTime) * 0.9)) * 75}%`
                    : "20%",
                  transition: "height 0.2s ease",
                }}
              />
            ))}
          </div>
          <span className="text-[0.45rem] tracking-wider text-white/35 uppercase">
            {track.tone} sound profile
          </span>
        </div>
      </div>
    </div>
  );
}

