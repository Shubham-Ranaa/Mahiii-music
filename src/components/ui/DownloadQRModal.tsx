"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Download, Copy, Check, Smartphone, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DOWNLOAD_URL, DOWNLOAD_ATTR, SITE } from "@/lib/constants";

/** MAHII dot mark, embedded in the middle of the QR code. */
const BRAND_MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#101016"/><circle cx="16" cy="16" r="6" fill="#A855F7"/></svg>',
)}`;

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

  if (!isOpen || typeof document === "undefined") return null;

  // Absolute URL of the APK so the QR code and the copied link both work
  // when scanned from another device.
  const fullUrl =
    typeof window !== "undefined"
      ? new URL(DOWNLOAD_URL, window.location.origin).toString()
      : new URL(DOWNLOAD_URL, SITE.url).toString();

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Portalled to <body> so the overlay is pinned to the viewport: the page
  // <main> is transformed by GSAP, which would otherwise turn `fixed` into
  // an element positioned against the whole (very tall) page.
  return createPortal(
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

        {/* QR Code — encodes the real APK link */}
        <div className="my-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="relative rounded-xl bg-white p-3 shadow-lg">
            <QRCodeSVG
              value={fullUrl}
              size={160}
              level="H"
              marginSize={1}
              bgColor="#FFFFFF"
              fgColor="#0A0A12"
              imageSettings={{
                src: BRAND_MARK,
                height: 28,
                width: 28,
                excavate: true,
              }}
            />
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
            download={DOWNLOAD_ATTR}
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
    </div>,
    document.body,
  );
}

