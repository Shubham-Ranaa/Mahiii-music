"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Smartphone,
  Volume2,
  Users,
  Sliders,
  MapPin,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { DOWNLOAD_URL, SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "Audio & App" | "Links";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  shortcut?: string;
};

export function CommandPalette({
  isOpen,
  onClose,
  onToggleAudio,
  isAudioPlaying,
}: {
  isOpen: boolean;
  onClose: () => void;
  onToggleAudio?: () => void;
  isAudioPlaying?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1500);
  };

  const items: CommandItem[] = [
    {
      id: "download",
      title: "Download MAHII for Android (APK v2.4)",
      category: "Audio & App",
      icon: Smartphone,
      action: () => scrollTo("#download"),
      shortcut: "↵",
    },
    {
      id: "audio",
      title: isAudioPlaying ? "Mute Ambient Lo-Fi Soundscape" : "Play Ambient Lo-Fi Soundscape",
      category: "Audio & App",
      icon: Volume2,
      action: () => {
        onToggleAudio?.();
        onClose();
      },
      shortcut: "Space",
    },
    {
      id: "together",
      title: "Listen Together Sync Rooms",
      category: "Navigation",
      icon: Users,
      action: () => scrollTo("#listen-together"),
    },
    {
      id: "features",
      title: "Parametric Equalizer & Hi-Res Sound",
      category: "Navigation",
      icon: Sliders,
      action: () => scrollTo("#features"),
    },
    {
      id: "experience",
      title: "Explore 5 App Surfaces Mockups",
      category: "Navigation",
      icon: Sparkles,
      action: () => scrollTo("#experience"),
    },
    {
      id: "roadmap",
      title: "View Product Roadmap & Milestones",
      category: "Navigation",
      icon: MapPin,
      action: () => scrollTo("#roadmap"),
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      category: "Navigation",
      icon: HelpCircle,
      action: () => scrollTo("#faq"),
    },
    {
      id: "copy",
      title: copied ? "Link Copied to Clipboard!" : "Copy Website Link",
      category: "Links",
      icon: copied ? Check : Copy,
      action: handleCopyLink,
    },
    {
      id: "github",
      title: "Harsh's GitHub Repository (jhaharsh604)",
      category: "Links",
      icon: GithubIcon,
      action: () => {
        window.open(SOCIALS.github, "_blank");
        onClose();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[120] grid place-items-start sm:place-items-center p-3 sm:p-6 pt-16 sm:pt-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-void/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Palette Card */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/12 bg-surface/95 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-white/[0.08] px-5 py-4">
          <Search size={18} className="text-lavender mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm sm:text-base text-ink placeholder:text-ink-muted/70 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded-md border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[0.625rem] text-ink-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-ink-muted">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-150",
                    isSelected
                      ? "bg-violet-core/20 text-white shadow-sm ring-1 ring-violet-core/50"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-colors",
                        isSelected
                          ? "bg-violet-core text-white shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                          : "bg-white/[0.04] text-ink-muted",
                      )}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="truncate text-xs sm:text-sm font-medium">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[0.625rem] text-ink-muted hidden sm:inline-block">
                      {item.category}
                    </span>
                    {item.shortcut ? (
                      <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-muted">
                        {item.shortcut}
                      </kbd>
                    ) : (
                      <ArrowRight size={13} className={isSelected ? "text-lavender" : "opacity-0"} />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-void/50 px-5 py-2.5 text-[0.6875rem] text-ink-muted">
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span className="text-lavender font-mono">MAHII Command Palette</span>
        </div>
      </div>
    </div>
  );
}
