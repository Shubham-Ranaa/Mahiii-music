"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check, Sparkles, Heart } from "lucide-react";
import { SOCIAL_ICONS } from "@/components/ui/BrandIcons";
import { CREATORS, type Creator, type CreatorLink } from "@/lib/constants";
import { useScrollReveal } from "@/animations/scrollAnimations";

const TECH_STACK = [
  "Kotlin",
  "Jetpack Compose",
  "Android Media3",
  "ExoPlayer Audio",
  "Material You",
  "WebSockets Sync",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Creator() {
  const scope = useScrollReveal<HTMLDivElement>();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard?.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2200);
    } catch {
      setCopiedEmail(null);
    }
  };

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.05] section-pad">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 -z-10 h-[45vw] w-[45vw] -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative" ref={scope}>
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4 sm:mb-14 lg:mb-16">
          <span className="type-eyebrow">07 — Creators &amp; Craft</span>
          <span className="flex-1 hairline" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Holographic typographic cards - one per creator, equal weight */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:sticky lg:top-28 lg:self-start">
            {CREATORS.map((creator) => (
              <CreatorCard key={creator.name} creator={creator} />
            ))}
          </div>

          {/* Details & Social */}
          <div className="flex flex-col justify-center">
            <h2 data-reveal className="type-section mb-5 max-w-[16ch]">
              Built with passion by {CREATORS.map((c) => c.name.split(" ")[0]).join(" & ")}.
            </h2>

            <p data-reveal className="type-lede mb-4 max-w-[46ch]">
              MAHII was born from an obsessive pursuit: build an Android music app
              that sounds pristine, looks cinematic and brings people together in synchronized rooms.
            </p>

            <p data-reveal className="mb-7 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              Every detail is engineered with respect for the listener — zero ads, full offline support,
              hi-res equalizer controls and complete open-source transparency.
            </p>

            {/* Tech stack chips */}
            <div data-reveal className="mb-9 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-soft transition-all duration-300 hover:border-violet-core/40 hover:text-ink hover:bg-violet-core/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Contact panels - one per creator, identical weight */}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {CREATORS.map((creator) => (
                <div
                  key={creator.name}
                  data-reveal
                  className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-violet-core/25 hover:bg-white/[0.035]"
                >
                  {/* Panel header */}
                  <div className="mb-3 flex items-center gap-3 border-b border-white/[0.06] pb-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-core to-violet-deep text-[0.6875rem] font-semibold tracking-wide text-white ring-1 ring-white/10">
                      {initials(creator.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[0.875rem] font-semibold text-ink">
                        {creator.name}
                      </p>
                      <p className="truncate text-[0.6875rem] text-ink-muted">
                        {creator.role}
                      </p>
                    </div>
                  </div>

                  {/* Links */}
                  <ul className="flex flex-col gap-0.5">
                    {creator.links.map((link) => (
                      <li key={link.label}>
                        <CreatorLinkRow link={link} name={creator.name} />
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(creator.email)}
                        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-200 hover:bg-white/[0.04]"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-ink-muted transition-colors duration-300 group-hover:text-lavender">
                          <Mail size={15} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.8125rem] font-medium text-ink">
                            Email
                          </span>
                          <span className="block truncate text-[0.6875rem] text-ink-muted">
                            {creator.email}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-[0.6875rem] text-ink-muted transition-colors duration-300 group-hover:text-lavender">
                          {copiedEmail === creator.email ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-emerald-300 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div data-reveal className="relative">
      <div
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-surface via-abyss to-void shadow-[0_35px_100px_-25px_rgba(0,0,0,0.9),0_0_60px_rgba(168,85,247,0.2)] transition-all duration-500 hover:border-violet-core/50 hover:shadow-[0_35px_100px_-25px_rgba(0,0,0,0.9),0_0_70px_rgba(168,85,247,0.35)]"
      >
        {/* Holographic light sheen */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
          style={{
            background:
              "radial-gradient(70% 60% at 30% 20%, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 24px)",
          }}
        />

        {/* Ghost monogram watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[27%] -translate-x-1/2 -translate-y-1/2 select-none font-bold leading-none tracking-[-0.06em] text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.065]"
          style={{ fontSize: "min(46%, 12rem)" }}
        >
          {initials(creator.name)}
        </span>

        {/* Corner accents */}
        <span
          aria-hidden
          className="absolute left-4 top-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-violet-core/50 to-transparent"
        />
        <span
          aria-hidden
          className="absolute right-4 top-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-violet-core/50 to-transparent"
        />
        <span
          aria-hidden
          className="absolute bottom-4 left-4 h-8 w-0.5 rounded-full bg-gradient-to-t from-transparent to-violet-core/50"
        />
        <span
          aria-hidden
          className="absolute bottom-4 right-4 h-8 w-0.5 rounded-full bg-gradient-to-t from-transparent to-violet-core/50"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.18em] text-lavender uppercase backdrop-blur-md sm:text-[0.625rem]">
              <Sparkles size={10} />
              Creator
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="text-[clamp(1.25rem,2.4vw,1.875rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
              {creator.name}
            </p>
            <p className="mt-2.5 text-[0.6875rem] font-medium text-lavender/90 sm:text-[0.8125rem]">
              {creator.role}
            </p>
            <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-muted">
              {creator.blurb}
            </p>

            {/* Tagline */}
            <div className="mt-3.5 flex items-center gap-1.5 text-[0.6875rem] text-ink-soft">
              <Heart size={12} className="text-rose-400 fill-rose-400" />
              <span>Crafted for true audiophiles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorLinkRow({
  link,
  name,
}: {
  link: CreatorLink;
  name: string;
}) {
  const Icon = SOCIAL_ICONS[link.label];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on ${link.label}`}
      className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-white/[0.04]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-ink-muted transition-colors duration-300 group-hover:text-lavender">
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.8125rem] font-medium text-ink">
          {link.label}
        </span>
        <span className="block truncate text-[0.6875rem] text-ink-muted">
          {link.handle}
        </span>
      </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender"
      />
    </a>
  );
}
