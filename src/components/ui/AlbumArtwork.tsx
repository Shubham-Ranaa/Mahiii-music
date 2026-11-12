import { cn } from "@/lib/utils";

/**
 * Generated album artwork.
 * These are CSS compositions standing in for real cover art — deliberately
 * abstract so they never pretend to be real releases.
 */
const PALETTES: Record<string, { from: string; via: string; to: string }> = {
  dusk: { from: "#4C1D95", via: "#A855F7", to: "#1E1B4B" },
  ember: { from: "#7C2D12", via: "#F59E0B", to: "#1C1917" },
  tide: { from: "#0E7490", via: "#22D3EE", to: "#082F49" },
  rose: { from: "#831843", via: "#F472B6", to: "#1F0A16" },
  moss: { from: "#14532D", via: "#4ADE80", to: "#052E16" },
  mono: { from: "#27272A", via: "#A1A1AA", to: "#09090B" },
};

export type ArtworkTone = keyof typeof PALETTES;

export function AlbumArtwork({
  tone = "dusk",
  title,
  className,
  rounded = "rounded-2xl",
  variant = 0,
}: {
  tone?: ArtworkTone;
  title: string;
  className?: string;
  rounded?: string;
  variant?: number;
}) {
  const p = PALETTES[tone] ?? PALETTES.dusk;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        rounded,
        "ring-1 ring-white/10",
        className,
      )}
      style={{
        background: `radial-gradient(120% 120% at 20% 10%, ${p.via} 0%, ${p.from} 45%, ${p.to} 100%)`,
      }}
      aria-hidden
    >
      {/* Geometric patterns - more sophisticated */}
      {variant % 3 === 0 && (
        <>
          <div
            className="absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              background:
                "repeating-linear-gradient(115deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 12px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)`,
            }}
          />
        </>
      )}

      {variant % 3 === 1 && (
        <>
          <div className="absolute -right-1/4 top-1/4 h-[70%] w-[70%] rounded-full border border-white/20" />
          <div className="absolute -right-[10%] top-[35%] h-[45%] w-[45%] rounded-full border border-white/12" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 30%)`,
            }}
          />
        </>
      )}

      {variant % 3 === 2 && (
        <>
          <div className="absolute inset-0 opacity-50 mix-blend-overlay">
            <div className="absolute left-[15%] top-[20%] h-[55%] w-[55%] rounded-full bg-white/30 blur-2xl" />
            <div className="absolute right-[10%] bottom-[10%] h-[40%] w-[40%] rounded-full bg-black/35 blur-xl" />
          </div>
          {/* Diagonal lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent 0 8px, rgba(255,255,255,0.1) 8px 9px)",
            }}
          />
        </>
      )}

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />

      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Title text */}
      <span className="absolute inset-x-3 bottom-2.5 truncate text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white/70">
        {title}
      </span>
    </div>
  );
}
