"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, QrCode } from "lucide-react";
import { NAV_LINKS, DOWNLOAD_URL, DOWNLOAD_ATTR, IS_EXTERNAL_DOWNLOAD, CREATORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DownloadQRModal } from "@/components/ui/DownloadQRModal";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import { SOCIAL_ICONS } from "@/components/ui/BrandIcons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [qrOpen, setQrOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Scrolled state with smoother threshold */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

    let activeTimeout: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(activeTimeout);
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          activeTimeout = setTimeout(() => setActive(`#${visible.target.id}`), 50);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      clearTimeout(activeTimeout);
    };
  }, []);

  /* Global keyboard handling */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQrOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Lock background scroll only while the menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "border-b border-white/[0.06] bg-void/80 backdrop-blur-2xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-h)] items-center justify-between gap-4"
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="MAHII home"
          >
            <BrandLogo
              size={32}
              priority
              className="h-8 w-8 shrink-0 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110"
            />
            <div>
              <span className="text-[0.9375rem] font-semibold tracking-[0.2em] text-ink leading-tight">
                MAHII
              </span>
              <span className="hidden font-mono text-[0.45rem] tracking-[0.14em] text-violet-core/70 sm:inline-block">
                ANDROID AUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.02] px-2 py-1 backdrop-blur-xl lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-[0.8125rem] tracking-tight transition-all duration-300",
                    active === link.href
                      ? "text-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <span
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-violet-core via-violet-bright to-violet-deep shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                      aria-hidden
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* QR Code Modal Trigger (Desktop) */}
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              title="Scan QR Code to install on phone"
              aria-label="Scan QR Code to install on phone"
              className="hidden md:grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-ink-muted transition-all duration-300 hover:border-violet-core/50 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <QrCode size={15} />
            </button>

            {/* Download Button */}
            <ButtonLink
              href={DOWNLOAD_URL}
              download={DOWNLOAD_ATTR}
              external={IS_EXTERNAL_DOWNLOAD}
              className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-violet-core to-violet-deep px-5 py-2 text-sm font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              size="md"
            >
              Get App
              <ArrowUpRight size={14} strokeWidth={2} className="ml-0.5" />
            </ButtonLink>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-ink transition-colors duration-300 hover:border-white/30 lg:hidden"
            >
              <Menu size={17} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* QR Code Modal */}
      <DownloadQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Mobile Floating Action Bar */}
      <MobileActionBar />

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          "fixed inset-0 z-[60] overflow-y-auto lg:hidden transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
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
            "relative flex h-full flex-col transition-all duration-500 ease-out lg:hidden",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Header */}
          <div className="flex h-[var(--nav-h)] shrink-0 items-center justify-between border-b border-white/[0.05] bg-void/80 backdrop-blur-xl px-5">
            <div className="flex items-center gap-2.5">
              <BrandLogo size={30} className="h-[30px] w-[30px] shrink-0" />
              <span className="text-[0.9375rem] font-semibold tracking-[0.2em] text-ink">
                MAHII
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] text-ink transition-colors hover:border-white/30"
            >
              <X size={17} strokeWidth={1.75} />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 py-6">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="group flex items-center justify-between rounded-xl border-b border-white/[0.04] py-4 text-[1.375rem] font-medium tracking-tight text-ink transition-all duration-300"
                  style={{
                    transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(16px)",
                    transitionProperty: "opacity, transform, color",
                    transitionDuration: "500ms",
                  }}
                >
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    {link.label}
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-muted transition-colors duration-300 group-hover:text-violet-core">
                    {link.href.replace("#", "")}
                  </span>
                </a>
              ))}

              <div className="mt-6 pt-4 border-t border-white/[0.05]">
                <ButtonLink
                  href={DOWNLOAD_URL}
                  download={DOWNLOAD_ATTR}
                  external={IS_EXTERNAL_DOWNLOAD}
                  size="lg"
                  onClick={close}
                  className="w-full rounded-full bg-gradient-to-r from-violet-core to-violet-deep px-6 py-3.5 text-base font-medium text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
                >
                  Download for Android
                  <ArrowUpRight size={16} strokeWidth={2} className="ml-1" />
                </ButtonLink>
                <p className="mt-3 text-center text-[0.6875rem] text-ink-muted tracking-wide">
                  Android 8.0+ · Personal Build · GPL-3.0
                </p>
              </div>
            </div>
          </nav>

          {/* Mobile Footer */}
          <div className="border-t border-white/[0.05] px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-ink-muted">Follow development</span>
              <div className="flex items-center gap-3">
                {CREATORS.map((creator, index) => (
                  <span key={creator.name} className="flex items-center gap-3">
                    {index > 0 && (
                      <span
                        aria-hidden
                        className="h-4 w-px bg-white/10"
                      />
                    )}
                    {creator.links.map((link) => {
                      const Icon = SOCIAL_ICONS[link.label];
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${creator.name}'s ${link.label} profile`}
                          className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] text-ink-soft transition-all duration-300 hover:text-white hover:border-violet-core/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        >
                          <Icon size={14} />
                        </a>
                      );
                    })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
