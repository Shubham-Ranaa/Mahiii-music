"use client";

import { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";
import { InstagramIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { SOCIALS, CREDITS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss/40">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* Brand side */}
          <div>
            <p className="text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.85] tracking-[-0.055em] text-ink">
              MAHII
            </p>
            <p className="mt-4 text-[0.9375rem] font-medium tracking-tight text-lavender/90">
              Music. Memories. Together.
            </p>
            <p className="mt-6 max-w-[34ch] text-[0.8125rem] leading-relaxed text-ink-muted">
              A modern Android music experience built with a passion for
              technology, music and creativity.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between lg:justify-end lg:gap-16">
            <div>
              <p className="type-eyebrow mb-4">Explore</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["Experience", "#experience"],
                  ["Features", "#features"],
                  ["Listen Together", "#listen-together"],
                  ["Roadmap", "#roadmap"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-eyebrow mb-4">Connect</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    <InstagramIcon size={13} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    <GithubIcon size={13} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIALS.contact}
                    className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    <Mail size={13} strokeWidth={1.75} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Credits section */}
        <div className="mt-14 rounded-2xl border border-white/[0.06] bg-void/30">
          <button
            type="button"
            onClick={() => setCreditsOpen((v) => !v)}
            aria-expanded={creditsOpen}
            aria-controls="credits-panel"
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left rounded-2xl transition-colors duration-300 hover:bg-white/[0.02] hover:border-violet-core/20"
          >
            <span className="flex flex-col gap-1">
              <span className="text-[0.8125rem] font-medium tracking-tight text-ink">
                Open-source acknowledgements &amp; license
              </span>
              <span className="text-[0.6875rem] text-ink-muted">
                Derived from Echo Music · GPL-3.0
              </span>
            </span>
            <ChevronDown
              size={15}
              strokeWidth={1.75}
              className={cn(
                "shrink-0 text-ink-muted transition-transform duration-400",
                creditsOpen && "rotate-180",
              )}
            />
          </button>

          <div
            id="credits-panel"
            className={cn(
              "grid transition-all duration-500",
              creditsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="overflow-hidden">
              <div className="space-y-4 border-t border-white/[0.06] px-5 py-5">
                <p className="max-w-[68ch] text-[0.8125rem] leading-relaxed text-ink-soft">
                  {CREDITS.summary}
                </p>
                <p className="text-[0.8125rem] leading-relaxed text-ink">
                  {CREDITS.license}
                </p>
                <p className="max-w-[68ch] text-[0.8125rem] leading-relaxed text-ink-soft">
                  {CREDITS.retention}
                </p>
                <p className="max-w-[68ch] text-[0.8125rem] leading-relaxed text-ink-soft">
                  {CREDITS.thirdParty}
                </p>

                <ul className="flex flex-wrap gap-2 pt-1">
                  {CREDITS.projects.map((p) => (
                    <li
                      key={p.name}
                      className="rounded-full border border-white/10 px-3 py-1 text-[0.6875rem] text-ink-soft"
                    >
                      {p.name}
                      <span className="ml-2 text-ink-muted">{p.note}</span>
                    </li>
                  ))}
                </ul>

                <p className="pt-1 text-[0.6875rem] leading-relaxed text-ink-muted">
                  Full license text:{" "}
                  <a
                    href="https://www.gnu.org/licenses/gpl-3.0.html"
                    target="__blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/20 underline-offset-2 transition-colors duration-300 hover:text-ink"
                  >
                    GNU General Public License v3.0
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <p className="text-[0.75rem] text-ink-muted">MAHII &copy; 2026</p>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5 text-[0.6875rem] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.4 Beta
            </span>
          </div>

          <p className="text-[0.75rem] text-ink-muted">
            Crafted with passion by{" "}
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-lavender transition-colors duration-300 hover:underline"
            >
              Harsh
              <GithubIcon size={11} className="inline-block" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
