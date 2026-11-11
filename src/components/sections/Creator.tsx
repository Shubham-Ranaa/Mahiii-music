"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { SOCIALS } from "@/lib/constants";
import { useScrollReveal } from "@/animations/scrollAnimations";

export function Creator() {
  const scope = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[40vw] w-[40vw] -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="shell" ref={scope}>
        <div className="mb-14 flex items-center gap-4 sm:mb-20">
          <span className="type-eyebrow">07 — Creator</span>
          <span className="hairline flex-1" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-20">
          {/* Typographic portrait — no invented photo */}
          <div data-reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-surface via-abyss to-void">
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(70% 60% at 30% 20%, rgba(168,85,247,0.28) 0%, transparent 65%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 22px)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className="font-mono text-[0.5625rem] tracking-[0.22em] text-ink-muted">
                  FOUNDER
                </span>
                <div>
                  <p className="text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-ink">
                    Harsh
                  </p>
                  <p className="mt-3 text-[0.75rem] text-ink-soft">
                    Founder &amp; Lead Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 data-reveal className="type-section mb-6 max-w-[16ch] text-ink">
              Built with passion by Harsh.
            </h2>

            <p data-reveal className="type-lede mb-5 max-w-[48ch]">
              MAHII started as a personal project driven by an interest in
              Android development, music technology and product design.
            </p>

            <p data-reveal className="mb-9 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              What began as a customization project is evolving into a larger
              vision: creating a connected music experience.
            </p>

            <div data-reveal className="flex flex-col gap-2">
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
                  className="group flex items-center justify-between gap-4 border-b border-white/[0.07] py-3.5 transition-colors hover:border-white/20"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} className="text-ink-muted" />
                    <span className="text-[0.9375rem] font-medium text-ink">
                      {label}
                    </span>
                    <span className="text-[0.8125rem] text-ink-muted">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.75}
                    className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender"
                  />
                </a>
              ))}
              <a
                href={SOCIALS.contact}
                className="group flex items-center justify-between gap-4 border-b border-white/[0.07] py-3.5 transition-colors hover:border-white/20"
              >
                <span className="flex items-center gap-3">
                  <Mail size={16} strokeWidth={1.75} className="text-ink-muted" />
                  <span className="text-[0.9375rem] font-medium text-ink">
                    Contact
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.75}
                  className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
