"use client";

import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { InteractiveNowPlaying, DEMO_TRACKS, type Track } from "@/components/ui/InteractiveNowPlaying";
import { AlbumArtwork } from "@/components/ui/AlbumArtwork";

type FeatureVisualProps = {
  feature: (typeof FEATURES)[0];
  compact?: boolean;
};

export function FeatureVisual({ feature, compact = false }: FeatureVisualProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  // Map feature ID to a demo track
  const trackIndex = FEATURES.findIndex((f) => f.id === feature.id) % DEMO_TRACKS.length;

  const track = DEMO_TRACKS[trackIndex];

  return (
    <div className="relative">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-2xl opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Feature card */}
      <div
        className={cn(
          "relative rounded-2xl border border-white/[0.06] bg-surface/60 p-4 sm:p-5 backdrop-blur-xl",
          "transition-all duration-500 hover:border-violet-core/30 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.2)]",
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted">
              {feature.index}
            </span>
            <h3 className="mt-1 text-[1rem] font-medium tracking-tight text-ink">
              {feature.title}
            </h3>
          </div>
          <span className="rounded-full bg-violet-core/10 px-2.5 py-1 text-[0.5625rem] font-medium text-lavender">
            {feature.mockLabel}
          </span>
        </div>

        {/* Phone mockup showcase */}
        <div className="mx-auto max-w-[220px] sm:max-w-[240px]">
          <PhoneMockup width={compact ? 180 : 220} label={feature.mockLabel}>
            <div className="flex h-full flex-col">
              {/* Status bar */}
              <div className="flex items-center justify-between px-3 py-2 text-[0.5rem] font-medium tracking-wide text-white/70">
                <span>9:41</span>
                <span className="flex items-center gap-1 text-[0.45rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-core/50" />
                  Hi-Fi
                </span>
              </div>

              {/* Mini album display */}
              <div className="flex flex-1 items-center justify-center px-3">
                <div className="relative mx-auto w-16 sm:w-20">
                  <AlbumArtwork
                    tone={track.tone}
                    title={track.title}
                    variant={track.variant}
                    rounded="rounded-lg"
                    className="aspect-square w-full shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                  />
                  {isPlaying && (
                    <div
                      className="absolute -inset-2 rounded-lg opacity-40 blur-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 60%)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Track info */}
              <div className="px-3 pb-2">
                <p className="truncate text-[0.7rem] font-medium text-white">
                  {track.title}
                </p>
                <p className="truncate text-[0.5rem] text-white/40">{track.artist}</p>
              </div>

              {/* Play/Pause control */}
              <div className="mt-auto flex items-center justify-center py-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white text-void shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={12} className="fill-void text-void" />
                  ) : (
                    <Play size={12} className="fill-void text-void translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Mini progress bar */}
              <div className="px-3 py-1">
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender transition-all duration-300"
                    style={{ width: isPlaying ? "54%" : "54%" }}
                  />
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>

        {/* Description for desktop */}
        {!compact && (
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-soft tracking-tight-body">
            {feature.description}
          </p>
        )}
      </div>
    </div>
  );
}
