"use client";

import { useRef, useState } from "react";
import { Smartphone, ArrowUp, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ButtonLink } from "@/components/ui/Button";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { DownloadQRModal } from "@/components/ui/DownloadQRModal";
import { DOWNLOAD_URL, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";

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
        scrollTrigger: { trigger: scope.current, start: "top 65%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(q("[data-cta-glow]"), { opacity: 0, scale: 0.7, duration: 1.6 })
        .from(
          q("[data-cta-word]"),
          { opacity: 0, y: 40, duration: 1, stagger: 0.08 },
          0.1,
        )
        .from(q("[data-cta-fade]"), { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, 0.4)
        .from(
          q("[data-cta-button]"),
          { opacity: 0, scale: 0.92, duration: 0.8, ease: "back.out(1.5)" },
          0.7,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      ref={scope}
      id="download"
      className="grain relative isolate flex min-h-[88svh] items-center overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      {/* Ambient glow and waveforms */}
      <div
        data-cta-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.12) 45%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.2]">
          <AudioWaveform bars={64} height={320} />
        </div>
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 120%, rgba(8,8,12,0.95) 20%, transparent 60%)",
          }}
        />
      </div>

      <div className="shell relative text-center">
        <p data-cta-fade className="type-eyebrow mb-8 flex items-center justify-center gap-2 text-lavender">
          <Sparkles size={12} className="text-violet-core" />
          <span>Your music journey starts here</span>
        </p>

        <h2 className="mb-6">
          <span className="mask-line">
            <span
              data-cta-word
              className="block text-[clamp(2.25rem,6.4vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-ink"
            >
              Ready to find
            </span>
          </span>
          <span className="mask-line">
            <span
              data-cta-word
              className="block text-[clamp(2.25rem,6.4vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-violet-gradient pb-1"
            >
              your rhythm?
            </span>
          </span>
        </h2>

        <p data-cta-fade className="type-lede mx-auto mb-4 max-w-[36ch] tracking-tight-body">
          Experience MAHII. High-fidelity audio, synchronized listening rooms, zero ads.
        </p>

        {/* Action Buttons */}
        <div data-cta-button className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <ButtonLink
            href={DOWNLOAD_URL}
            external={IS_EXTERNAL_DOWNLOAD}
            size="lg"
            className="px-9 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] hover:scale-105 active:scale-95"
          >
            <Smartphone size={17} strokeWidth={2} />
            Download for Android
          </ButtonLink>

          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-base font-medium text-ink backdrop-blur-md transition-all hover:border-violet-core/60 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] active:scale-95"
          >
            <QrCode size={18} className="text-lavender" />
            Scan QR Code
          </button>
        </div>

        <div data-cta-fade className="mt-6 flex items-center justify-center gap-3 text-[0.75rem] text-ink-muted">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Free personal build · Android 8.0 and above · GPL-3.0</span>
        </div>

        {/* Back to top */}
        <div data-cta-fade className="mt-12">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[0.75rem] text-ink-muted transition-all hover:border-violet-core/50 hover:bg-white/[0.08] hover:text-ink hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ArrowUp size={13} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>

      {/* QR Modal */}
      <DownloadQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </section>
  );
}
