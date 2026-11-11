"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, DOWNLOAD_URL, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);

  /* Scrolled state: swap to a blurred surface */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section indicator */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock background scroll only while the menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-h)] items-center justify-between gap-6"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="MAHII home"
          >
            <span className="relative grid h-7 w-7 place-items-center">
              <span className="absolute inset-0 rounded-[9px] bg-gradient-to-br from-violet-core to-violet-deep opacity-90 transition-transform duration-500 group-hover:rotate-[18deg]" />
              <span className="relative h-[7px] w-[7px] rounded-full bg-void" />
            </span>
            <span className="text-[0.9375rem] font-semibold tracking-[0.18em] text-ink">
              MAHII
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] tracking-tight transition-colors duration-300",
                    active === link.href
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-px origin-left bg-gradient-to-r from-violet-core to-transparent transition-transform duration-500",
                      active === link.href ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={DOWNLOAD_URL}
              external={IS_EXTERNAL_DOWNLOAD}
              className="hidden sm:inline-flex"
              size="md"
            >
              Download App
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-ink transition-colors hover:border-white/30 lg:hidden"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-void/95 backdrop-blur-2xl transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "relative flex h-full flex-col transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <span className="text-[0.9375rem] font-semibold tracking-[0.18em]">
              MAHII
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-ink"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="shell flex flex-1 flex-col justify-center gap-1 pb-10"
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="group flex items-baseline justify-between border-b border-white/[0.07] py-4 text-[1.75rem] font-medium tracking-tight text-ink transition-colors hover:text-lavender"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(14px)",
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "600ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted">
                  0{i + 1}
                </span>
              </a>
            ))}

            <ButtonLink
              href={DOWNLOAD_URL}
              external={IS_EXTERNAL_DOWNLOAD}
              size="lg"
              onClick={close}
              className="mt-8 w-full"
            >
              Download App
              <ArrowUpRight size={16} strokeWidth={2} />
            </ButtonLink>
          </nav>
        </div>
      </div>
    </>
  );
}
