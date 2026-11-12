"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, QrCode, Search } from "lucide-react";
import { NAV_LINKS, DOWNLOAD_URL, DOWNLOAD_SECTION_ID, IS_EXTERNAL_DOWNLOAD, SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientAudioButton } from "@/components/ui/AmbientAudio";
import { DownloadQRModal } from "@/components/ui/DownloadQRModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import { InstagramIcon, GithubIcon } from "@/components/ui/BrandIcons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [qrOpen, setQrOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
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

  /* Global Keyboard Shortcut for Command Palette: Cmd+K / Ctrl+K */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
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
            ? "border-b border-white/[0.08] bg-void/75 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-h)] items-center justify-between gap-4"
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="MAHII home"
          >
            <span className="relative grid h-7 w-7 place-items-center">
              <span className="absolute inset-0 rounded-[9px] bg-gradient-to-br from-violet-core to-violet-deep opacity-90 transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <span className="relative h-[7px] w-[7px] rounded-full bg-void" />
            </span>
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-semibold tracking-[0.18em] text-ink leading-tight">
                MAHII
              </span>
              <span className="hidden font-mono text-[0.45rem] tracking-[0.12em] text-lavender/70 sm:inline-block">
                ANDROID AUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-surface/50 px-3 py-1 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[0.8125rem] tracking-tight transition-all duration-300",
                    active === link.href
                      ? "text-ink font-medium"
                      : "text-ink-soft hover:text-ink hover:bg-white/[0.04]",
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <span
                      className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-violet-core via-lavender to-violet-deep shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      aria-hidden
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button (Desktop) */}
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-muted transition-all hover:border-violet-core/50 hover:bg-white/[0.06] hover:text-ink"
            >
              <Search size={13} className="text-violet-core" />
              <span className="hidden md:inline">Search</span>
              <kbd className="font-mono text-[0.625rem] bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/10 text-lavender">
                ⌘K
              </kbd>
            </button>

            {/* Ambient Audio Vibe Toggle */}
            <AmbientAudioButton />

            {/* QR Code Quick Modal Trigger (Desktop) */}
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              title="Scan QR Code to install on phone"
              aria-label="Scan QR Code to install on phone"
              className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-white/12 text-ink-muted transition-all hover:border-violet-core/50 hover:bg-white/[0.04] hover:text-ink hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
            >
              <QrCode size={16} />
            </button>

            {/* Main Download Button */}
            <ButtonLink
              href={DOWNLOAD_URL}
              external={IS_EXTERNAL_DOWNLOAD}
              className="hidden sm:inline-flex shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
              size="md"
            >
              Get App
            </ButtonLink>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-ink transition-colors hover:border-white/30 lg:hidden"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {/* QR Code Modal for Desktop */}
      <DownloadQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Mobile Floating Action Bar */}
      <MobileActionBar onOpenCommand={() => setCmdOpen(true)} />

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          "fixed inset-0 z-[60] overflow-y-auto lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-void/90 backdrop-blur-2xl transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "pointer-events-none relative flex h-full flex-col transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="pointer-events-auto shell flex h-[var(--nav-h)] shrink-0 items-center justify-between border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="relative grid h-7 w-7 place-items-center">
                <span className="absolute inset-0 rounded-[8px] bg-gradient-to-br from-violet-core to-violet-deep" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-void" />
              </span>
              <span className="text-[0.9375rem] font-semibold tracking-[0.18em]">
                MAHII
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-ink"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="shell pointer-events-auto flex flex-1 flex-col justify-between py-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {/* Search button in mobile menu */}
              <button
                type="button"
                onClick={() => {
                  close();
                  setTimeout(() => setCmdOpen(true), 200);
                }}
                className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left text-ink-soft hover:text-ink"
              >
                <span className="flex items-center gap-2.5 text-sm">
                  <Search size={16} className="text-violet-core" />
                  <span>Search commands &amp; sections</span>
                </span>
                <span className="font-mono text-[0.625rem] text-ink-muted">⌘K</span>
              </button>

              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="group flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[1.45rem] font-medium tracking-tight text-ink transition-colors hover:text-lavender"
                  style={{
                    transitionDelay: open ? `${60 + i * 40}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(12px)",
                    transitionProperty: "opacity, transform, color",
                    transitionDuration: "500ms",
                  }}
                >
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    {link.label}
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}

              <div className="pt-6">
                <ButtonLink
                  href={DOWNLOAD_URL}
                  external={IS_EXTERNAL_DOWNLOAD}
                  size="lg"
                  onClick={close}
                  className="w-full shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                >
                  Download for Android
                  <ArrowUpRight size={16} strokeWidth={2} />
                </ButtonLink>
                <p className="mt-2 text-center text-[0.6875rem] text-ink-muted">
                  Android 8.0+ · Personal Build · GPL-3.0
                </p>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-ink-muted">Follow development</span>
              <div className="flex items-center gap-3">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harsh's Instagram profile"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft hover:text-white"
                >
                  <InstagramIcon size={14} />
                </a>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harsh's GitHub profile"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-soft hover:text-white"
                >
                  <GithubIcon size={14} />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
