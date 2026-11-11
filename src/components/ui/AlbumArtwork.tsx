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
      {/* geometric motif, varies by variant */}
      {variant % 3 === 0 && (
        <div
          className="absolute inset-0 opacity-45 mix-blend-soft-light"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 14px)",
          }}
        />
      )}
      {variant % 3 === 1 && (
        <>
          <div className="absolute -right-1/4 top-1/4 h-[70%] w-[70%] rounded-full border border-white/25" />
          <div className="absolute -right-[10%] top-[35%] h-[45%] w-[45%] rounded-full border border-white/15" />
        </>
      )}
      {variant % 3 === 2 && (
        <div className="absolute inset-0 opacity-60 mix-blend-overlay">
          <div className="absolute left-[15%] top-[20%] h-[55%] w-[55%] rounded-full bg-white/35 blur-2xl" />
          <div className="absolute right-[10%] bottom-[10%] h-[40%] w-[40%] rounded-full bg-black/40 blur-xl" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/5" />
      <span className="absolute inset-x-3 bottom-2.5 truncate text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white/70">
        {title}
      </span>
    </div>
  );
}
