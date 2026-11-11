"use client";

import { useRef } from "react";
import { Smartphone, ArrowUp } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ButtonLink } from "@/components/ui/Button";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { DOWNLOAD_URL, IS_EXTERNAL_DOWNLOAD } from "@/lib/constants";

export function FinalCTA() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

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
      {/* ambient waves */}
      <div
        data-cta-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 animate-drift-glow rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.26) 0%, rgba(124,58,237,0.10) 45%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.16]">
          <AudioWaveform bars={64} height={300} />
        </div>
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 120%, rgba(8,8,12,0.95) 20%, transparent 60%)",
          }}
        />
      </div>

      <div className="shell relative text-center">
        <p data-cta-fade className="type-eyebrow mb-8">
          Your music journey starts here
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

        <p data-cta-fade className="type-lede mx-auto mb-3 max-w-[34ch]">
          Experience MAHII.
        </p>

        <div data-cta-button className="mt-9 flex justify-center">
          <ButtonLink
            href={DOWNLOAD_URL}
            external={IS_EXTERNAL_DOWNLOAD}
            size="lg"
            className="px-8"
          >
            <Smartphone size={17} strokeWidth={2} />
            Download for Android          </ButtonLink>
        </div>

        <p data-cta-fade className="mt-6 text-[0.75rem] text-ink-muted">
          Free personal build · Android 8.0 and above
        </p>

        <a
          data-cta-fade
          href="#top"
          className="mt-14 inline-flex items-center gap-2 text-[0.75rem] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowUp size={13} strokeWidth={2} />
          Back to top
        </a>
      </div>
    </section>
  );
}
