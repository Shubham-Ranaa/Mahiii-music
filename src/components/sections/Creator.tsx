"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check, Sparkles, Terminal, Heart } from "lucide-react";
import { InstagramIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { SOCIALS } from "@/lib/constants";
import { useScrollReveal } from "@/animations/scrollAnimations";

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

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("jhaharsh604@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[40vw] w-[40vw] -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="shell" ref={scope}>
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">07 — Creator &amp; Craft</span>
          <span className="hairline flex-1" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-20 items-center">
          {/* Holographic Typographic Card */}
          <div data-reveal className="relative">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-surface via-abyss to-void shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.2)] transition-all duration-500 hover:border-violet-core/60 hover:shadow-[0_0_60px_rgba(168,85,247,0.35)]">
              {/* Holographic light sheen */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    "radial-gradient(70% 60% at 30% 20%, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 22px)",
                }}
              />

              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-core/30 bg-violet-core/10 px-3 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-lavender uppercase backdrop-blur-md">
                    <Sparkles size={10} /> CREATOR
                  </span>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div>
                  <p className="text-[clamp(2.8rem,7vw,4.8rem)] font-bold leading-[0.88] tracking-[-0.05em] text-ink">
                    Harsh
                  </p>
                  <p className="mt-3 text-[0.8125rem] font-medium text-lavender/90">
                    Founder &amp; Android Audio Engineer
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Passionate about Kotlin, Jetpack Compose and shared music rooms
                  </p>

                  {/* Built with love badge */}
                  <div className="mt-6 flex items-center gap-2 text-xs text-ink-soft">
                    <Heart size={14} className="text-rose-400 fill-rose-400" />
                    <span>Crafted for true audiophiles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Social Connect */}
          <div className="flex flex-col justify-center">
            <h2 data-reveal className="type-section mb-6 max-w-[16ch] text-ink">
              Built with passion by Harsh.
            </h2>

            <p data-reveal className="type-lede mb-5 max-w-[48ch]">
              MAHII was born from an obsessive pursuit: build an Android music app
              that sounds pristine, looks cinematic and brings people together in synchronized rooms.
            </p>

            <p data-reveal className="mb-6 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              Every detail is engineered with respect for the listener — zero ads, full offline support,
              hi-res equalizer controls and complete open-source transparency.
            </p>

            {/* Tech Stack Chips */}
            <div data-reveal className="mb-8 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-soft transition-colors hover:border-violet-core/40 hover:text-ink hover:bg-violet-core/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Social Links & Contact */}
            <div data-reveal className="flex flex-col gap-2.5">
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
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-violet-core/40 hover:bg-white/[0.05] hover:shadow-[0_10px_25px_-10px_rgba(168,85,247,0.3)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-ink-muted group-hover:text-lavender transition-colors">
                      <Icon size={16} />
                    </span>
                    <span className="text-[0.9375rem] font-medium text-ink">
                      {label}
                    </span>
                    <span className="text-[0.8125rem] text-ink-muted">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender"
                  />
                </a>
              ))}

              {/* Copy Email Button with instant feedback */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-violet-core/40 hover:bg-white/[0.05]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-ink-muted group-hover:text-lavender transition-colors">
                    <Mail size={16} />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-ink">
                    Email Harsh
                  </span>
                  <span className="text-[0.8125rem] text-ink-muted">
                    jhaharsh604@gmail.com
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ink-muted group-hover:text-lavender">
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
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
