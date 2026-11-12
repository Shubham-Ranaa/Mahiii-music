"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check, Sparkles, Heart } from "lucide-react";
import { InstagramIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { SOCIALS } from "@/lib/constants";
import { useScrollReveal } from "@/animations/scrollAnimations";
import { cn } from "@/lib/utils";

const TECH_STACK = [
  "Kotlin",
  "Jetpack Compose",
  "Android Media3",
  "ExoPlayer Audio",
  "Material You",
  "WebSockets Sync",
];

export function Creator() {
  const scope = useScrollReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard?.writeText("jhaharsh604@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
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
        <div className="mb-16 flex items-center gap-4 sm:mb-20 lg:mb-24">
          <span className="type-eyebrow">07 — Creator &amp; Craft</span>
          <span className="flex-1 hairline" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-24 items-center">
          {/* Holographic typographic card */}
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
                className="absolute left-4 bottom-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-transparent to-violet-core/50"
              />
              <span
                aria-hidden
                className="absolute right-4 bottom-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-transparent to-violet-core/50"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-3 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-lavender uppercase backdrop-blur-md">
                    <Sparkles size={10} />
                    CREATOR
                  </span>
                  <span className="mt-4 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="flex flex-col items-center text-center">
                  <p className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-ink">
                    Harsh
                  </p>
                  <p className="mt-3 text-[0.8125rem] font-medium text-lavender/90">
                    Founder &amp; Android Audio Engineer
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Passionate about Kotlin, Jetpack Compose and shared music rooms
                  </p>

                  {/* Tagline */}
                  <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
                    <Heart size={13} className="text-rose-400 fill-rose-400" />
                    <span>Crafted for true audiophiles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Social */}
          <div className="flex flex-col justify-center">
            <h2 data-reveal className="type-section mb-6 max-w-[15ch]">
              Built with passion by Harsh.
            </h2>

            <p data-reveal className="type-lede mb-5 max-w-[46ch]">
              MAHII was born from an obsessive pursuit: build an Android music app
              that sounds pristine, looks cinematic and brings people together in synchronized rooms.
            </p>

            <p data-reveal className="mb-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              Every detail is engineered with respect for the listener — zero ads, full offline support,
              hi-res equalizer controls and complete open-source transparency.
            </p>

            {/* Tech stack chips */}
            <div data-reveal className="mb-8 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-soft transition-all duration-300 hover:border-violet-core/40 hover:text-ink hover:bg-violet-core/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div data-reveal className="flex flex-col gap-3">
              {[
                {
                  href: SOCIALS.instagram,
                  label: "Instagram",
                  handle: "@jhaharsh604",
                  Icon: InstagramIcon,
                },
                {
                  href: SOCIALS.github,
                  label: "GitHub",
                  handle: "github.com/jhaharsh604",
                  Icon: GithubIcon,
                },
              ].map(({ href, label, handle, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-violet-core/40 hover:bg-white/[0.04] hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.3)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-ink-muted group-hover:text-lavender transition-colors duration-300">
                      <Icon size={15} />
                    </span>
                    <div>
                      <span className="text-[0.9375rem] font-medium text-ink">
                        {label}
                      </span>
                      <span className="ml-2 text-[0.8125rem] text-ink-muted">
                        {handle}
                      </span>
                    </div>
                  </span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.75}
                    className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender"
                  />
                </a>
              ))}

              {/* Email button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-violet-core/40 hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-ink-muted group-hover:text-lavender transition-colors duration-300">
                    <Mail size={15} />
                  </span>
                  <div>
                    <span className="text-[0.9375rem] font-medium text-ink">
                      Email Harsh
                    </span>
                    <span className="ml-2 text-[0.8125rem] text-ink-muted">
                      jhaharsh604@gmail.com
                    </span>
                  </div>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ink-muted group-hover:text-lavender transition-colors">
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
