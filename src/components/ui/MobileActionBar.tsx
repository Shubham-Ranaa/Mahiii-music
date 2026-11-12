"use client";

import { useEffect, useState } from "react";
import { Smartphone, ArrowUp, Search, Sparkles } from "lucide-react";
import { DOWNLOAD_URL } from "@/lib/constants";
import { AmbientAudioButton } from "@/components/ui/AmbientAudio";
import { cn } from "@/lib/utils";

export function MobileActionBar({
  onOpenCommand,
}: {
  onOpenCommand: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (approx 450px)
      setVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Quick mobile actions"
      className={cn(
        "fixed bottom-4 inset-x-4 z-40 lg:hidden transition-all duration-500 ease-out",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-12 opacity-0 pointer-events-none",
      )}
    >
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-surface/90 p-2 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
        {/* Quick Search */}
        <button
          type="button"
          onClick={onOpenCommand}
          aria-label="Open command palette"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-muted transition-colors active:scale-95 hover:text-white"
        >
          <Search size={16} />
        </button>

        {/* Ambient Audio Pill */}
        <AmbientAudioButton minimal className="shrink-0 h-10 px-3.5" />

        {/* Download Action Button */}
        <a
          href={DOWNLOAD_URL}
          download
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-core via-violet-deep to-lavender px-4 h-10 text-xs font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95"
        >
          <Smartphone size={14} />
          <span>Get MAHII</span>
        </a>

        {/* Scroll Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-muted transition-colors active:scale-95 hover:text-white"
        >
          <ArrowUp size={15} />
        </button>
      </div>
    </aside>
  );
}

