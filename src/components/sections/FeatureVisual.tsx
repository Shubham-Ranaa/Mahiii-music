"use client";

import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { FEATURE_SCREENS } from "@/components/ui/FeatureScreens";

type FeatureVisualProps = {
  feature: (typeof FEATURES)[0];
  compact?: boolean;
};

export function FeatureVisual({ feature, compact = false }: FeatureVisualProps) {
  // Every feature renders its own interface, so the mockup changes with the
  // selected entry instead of always showing the same player.
  const Screen = FEATURE_SCREENS[feature.id] ?? FEATURE_SCREENS.discovery;

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
            <div key={feature.id} className="screen-swap h-full w-full">
              <Screen />
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
