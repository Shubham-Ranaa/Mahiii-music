"use client";

import { useRef, useState } from "react";
import { Smartphone, ArrowUp, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ButtonLink } from "@/components/ui/Button";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { DownloadQRModal } from "@/components/ui/DownloadQRModal";
import { DOWNLOAD_URL, DOWNLOAD_ATTR, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [qrOpen, setQrOpen] = useState(false);

  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-cta-fade], [data-cta-word]"), {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 60%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-cta-glow]"), { opacity: 0, scale: 0.65, duration: 1.5 })
        .from(
          q("[data-cta-word]"),
          { opacity: 0, y: 35, duration: 0.9, stagger: 0.07 },
          0.08,
        )
        .from(q("[data-cta-fade]"), { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.35)
        .from(
          q("[data-cta-button]"),
          { opacity: 0, scale: 0.9, duration: 0.7, ease: "back.out(1.6)" },
          0.65,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      ref={scope}
      id="download"
      className="grain relative isolate flex min-h-[86svh] items-center overflow-hidden border-t border-white/[0.05] section-pad-sm"
    >
      {/* Ambient glow and waveforms */}
      <div
        data-cta-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[85vh] w-[85vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.28) 0%, rgba(124,58,237,0.12) 45%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.18]">
          <AudioWaveform bars={72} height={340} />
        </div>
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 120%, rgba(7,7,11,0.95) 20%, transparent 60%)",
          }}
        />

        {/* Subtle light rays */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: `linear-gradient(135deg, transparent 40%, rgba(168, 85, 247, 0.3) 45%, rgba(168, 85, 247, 0.3) 55%, transparent 60%)`,
          }}
        />
      </div>

      <div className="shell relative text-center">
        {/* Eyebrow */}
        <p data-cta-fade className="type-eyebrow mb-8 flex items-center justify-center gap-2 text-lavender">
          <Sparkles size={11} className="text-violet-core" />
          <span>Your music journey starts here</span>
        </p>

        {/* Main heading */}
        <h2 className="mb-6">
          <span className="mask-line">
            <span
              data-cta-word
              className="block text-[clamp(2.25rem,6.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-ink"
            >
              Ready to find
            </span>
          </span>
          <span className="mask-line">
            <span
              data-cta-word
              className="block text-[clamp(2.25rem,6.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-gradient-violet pb-1"
            >
              your rhythm?
            </span>
          </span>
        </h2>

        {/* Description */}
        <p data-cta-fade className="type-lede mx-auto mb-8 max-w-[34ch] tracking-tight-body">
          Experience MAHII. High-fidelity audio, synchronized listening rooms, zero ads.
        </p>

        {/* Action buttons */}
        <div data-cta-button className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <ButtonLink
            href={DOWNLOAD_URL}
            download={DOWNLOAD_ATTR}
            external={IS_EXTERNAL_DOWNLOAD}
            size="lg"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-core to-violet-deep px-10 py-4 text-base font-medium text-white shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-[1.04] active:scale-[0.98] group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Smartphone size={17} strokeWidth={2} className="relative z-10" />
            <span className="relative z-10">Download for Android</span>
          </ButtonLink>

          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="relative inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-base font-medium text-ink backdrop-blur-md transition-all duration-300 hover:border-violet-core/60 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] active:scale-[0.98]"
          >
            <QrCode size={18} className="text-lavender" />
            Scan QR Code
          </button>
        </div>

        {/* Trust badges */}
        <div data-cta-fade className="mt-7 flex items-center justify-center gap-3 text-[0.75rem] text-ink-muted">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Free personal build · Android 8.0 and above · GPL-3.0</span>
        </div>

        {/* Back to top */}
        <div data-cta-fade className="mt-12">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-[0.75rem] text-ink-muted transition-all duration-300 hover:border-violet-core/50 hover:bg-white/[0.06] hover:text-ink hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ArrowUp size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>

      {/* QR Modal */}
      <DownloadQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </section>
  );
}
