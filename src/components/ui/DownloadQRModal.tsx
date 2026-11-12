"use client";

import { useEffect, useState } from "react";
import { X, QrCode, Download, Copy, Check, Smartphone, ShieldCheck } from "lucide-react";
import { DOWNLOAD_URL, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DownloadQRModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${DOWNLOAD_URL.startsWith("#") ? DOWNLOAD_URL : ""}`
      : "https://mahii.app";

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Download MAHII for Android"
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-void/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#181824] via-[#101018] to-void p-6 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_60px_rgba(168,85,247,0.18)] sm:p-8 animate-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-white/25 hover:text-ink"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-core to-violet-deep text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <Smartphone size={20} />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              Get MAHII for Android
            </h3>
            <p className="text-xs text-ink-muted">Version 2.4 Beta · Free &amp; Open</p>
          </div>
        </div>

        {/* QR Code Canvas Mockup */}
        <div className="my-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="relative rounded-xl bg-white p-3 shadow-lg">
            {/* SVG QR Code Pattern */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="text-void"
              fill="currentColor"
            >
              {/* Corner position locators */}
              {/* Top-Left */}
              <rect x="10" y="10" width="40" height="40" rx="6" />
              <rect x="16" y="16" width="28" height="28" rx="3" fill="white" />
              <rect x="22" y="22" width="16" height="16" rx="2" />

              {/* Top-Right */}
              <rect x="110" y="10" width="40" height="40" rx="6" />
              <rect x="116" y="16" width="28" height="28" rx="3" fill="white" />
              <rect x="122" y="22" width="16" height="16" rx="2" />

              {/* Bottom-Left */}
              <rect x="10" y="110" width="40" height="40" rx="6" />
              <rect x="16" y="116" width="28" height="28" rx="3" fill="white" />
              <rect x="22" y="122" width="16" height="16" rx="2" />

              {/* Random-looking decorative data blocks */}
              <rect x="60" y="14" width="8" height="8" rx="1.5" />
              <rect x="74" y="14" width="14" height="8" rx="1.5" />
              <rect x="94" y="26" width="8" height="14" rx="1.5" />
              <rect x="60" y="32" width="22" height="8" rx="1.5" />
              <rect x="14" y="60" width="8" height="18" rx="1.5" />
              <rect x="28" y="70" width="18" height="8" rx="1.5" />
              <rect x="36" y="86" width="12" height="12" rx="1.5" />
              <rect x="60" y="60" width="12" height="12" rx="2" />
              <rect x="78" y="64" width="18" height="8" rx="1.5" />
              <rect x="102" y="60" width="14" height="14" rx="2" />
              <rect x="124" y="68" width="18" height="12" rx="1.5" />
              <rect x="60" y="80" width="18" height="8" rx="1.5" />
              <rect x="84" y="78" width="12" height="18" rx="1.5" />
              <rect x="102" y="82" width="8" height="16" rx="1.5" />
              <rect x="116" y="88" width="18" height="10" rx="1.5" />
              <rect x="60" y="110" width="12" height="20" rx="1.5" />
              <rect x="78" y="116" width="18" height="10" rx="1.5" />
              <rect x="102" y="110" width="14" height="8" rx="1.5" />
              <rect x="122" y="116" width="18" height="18" rx="2" />
              <rect x="80" y="132" width="12" height="12" rx="1.5" />
              <rect x="100" y="124" width="14" height="14" rx="2" />
              <rect x="140" y="130" width="10" height="14" rx="1.5" />

              {/* Center MAHII branding badge inside QR code */}
              <rect x="66" y="66" width="28" height="28" rx="8" fill="#101016" />
              <circle cx="80" cy="80" r="5" fill="#A855F7" />
            </svg>
          </div>
          <p className="mt-4 text-xs font-medium text-ink">
            Scan with your phone&apos;s camera
          </p>
          <p className="mt-1 text-[0.6875rem] text-ink-muted">
            Instant direct download for Android 8.0+
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={DOWNLOAD_URL}
            download
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-void transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
          >
            <Download size={15} />
            Direct Download
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-medium text-ink transition-all hover:border-white/30 hover:bg-white/[0.05]"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-ink-muted" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[0.6875rem] text-ink-muted">
          <ShieldCheck size={14} className="text-violet-core" />
          <span>No trackers · No telemetry · Verified safe</span>
        </div>
      </div>
    </div>
  );
}

