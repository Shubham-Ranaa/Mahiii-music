"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generative Ambient Audio Engine using Web Audio API.
 * Synthesizes a calming, warm, dreamy ambient chord progression (F#m7 -> Dmaj7 -> A -> E)
 * with low-pass filtered oscillators and gentle chorus. Zero audio files required!
 */
export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Chord frequencies (Hz) for a warm chill aesthetic
  const CHORDS = [
    [185.0, 220.0, 277.18, 329.63], // F#m7
    [146.83, 220.0, 293.66, 369.99], // Dmaj7
    [220.0, 277.18, 329.63, 440.0],  // A
    [164.81, 246.94, 329.63, 392.0], // Em7
  ];

  const stopAudio = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playChord = useCallback((ctx: AudioContext, masterGain: GainNode, notes: number[]) => {
    const now = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + 2);
    filter.frequency.exponentialRampToValueAtTime(450, now + 4.8);
    filter.connect(masterGain);

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);
      // Slight detune for warm analog chorus warmth
      osc.detune.setValueAtTime((idx - 1.5) * 6, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.065 / notes.length, now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 4.9);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(now);
      osc.stop(now + 5.0);
    });
  }, []);

  const startAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(volume, ctx.currentTime);
      master.connect(ctx.destination);
      gainNodeRef.current = master;

      let chordIdx = 0;
      playChord(ctx, master, CHORDS[chordIdx]);

      timerRef.current = window.setInterval(() => {
        chordIdx = (chordIdx + 1) % CHORDS.length;
        if (ctx.state === "running") {
          playChord(ctx, master, CHORDS[chordIdx]);
        }
      }, 4800);

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [playChord, volume]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return { isPlaying, toggle, volume, setVolume };
}

/**
 * Ambient Audio Pill Controller
 * Renders in the navbar or bottom floating corner
 */
export function AmbientAudioButton({
  className,
  minimal = false,
}: {
  className?: string;
  minimal?: boolean;
}) {
  const { isPlaying, toggle } = useAmbientAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      title={isPlaying ? "Mute ambient vibe" : "Play ambient soundscape"}
      aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-violet-core/50 hover:bg-surface-hi hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]",
        isPlaying && "border-violet-core/60 bg-violet-core/10 text-lavender shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        className,
      )}
    >
      {isPlaying ? (
        <>
          <div className="flex h-3.5 items-end gap-[2px]">
            <span className="w-[2px] rounded-full bg-violet-core animate-wave-pulse" style={{ height: "60%", animationDuration: "0.8s" }} />
            <span className="w-[2px] rounded-full bg-lavender animate-wave-pulse" style={{ height: "100%", animationDuration: "1.1s" }} />
            <span className="w-[2px] rounded-full bg-violet-deep animate-wave-pulse" style={{ height: "45%", animationDuration: "0.7s" }} />
          </div>
          {!minimal && (
            <span className="text-[0.6875rem] font-medium tracking-tight text-lavender">
              Vibe On
            </span>
          )}
          <Volume2 size={13} className="text-violet-core" />
        </>
      ) : (
        <>
          <Sparkles size={13} className="text-ink-muted transition-colors group-hover:text-lavender" />
          {!minimal && (
            <span className="text-[0.6875rem] font-medium text-ink-muted group-hover:text-ink">
              Audio Vibe
            </span>
          )}
          <VolumeX size={13} className="text-ink-muted/70 group-hover:text-ink-soft" />
        </>
      )}
    </button>
  );
}

