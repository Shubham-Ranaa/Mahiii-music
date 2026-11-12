"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero entrance timeline.
 * Returns a scope ref — every selector inside is scoped to the hero element,
 * so nothing leaks into other sections and cleanup is automatic via useGSAP.
 */
export function useHeroAnimation() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-hero-glow], [data-hero-wordmark], [data-hero-line] > span, [data-hero-fade], [data-hero-phone], [data-hero-art], [data-hero-scroll]"), {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
        return;
      }

      if (reduced) {
        gsap.set(q("[data-hero-fade], [data-hero-line] > span"), {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(q("[data-hero-glow]"), {
        opacity: 0,
        scale: 0.85,
        duration: 1.8,
      })
        .from(
          q("[data-hero-wordmark]"),
          { yPercent: 110, opacity: 0, duration: 1.25 },
          0.15,
        )
        .from(
          q("[data-hero-line] > span"),
          { yPercent: 108, duration: 1.15, stagger: 0.09 },
          0.35,
        )
        .from(
          q("[data-hero-fade]"),
          { opacity: 0, y: 22, duration: 1, stagger: 0.11 },
          0.75,
        )
        .from(
          q("[data-hero-phone]"),
          { opacity: 0, y: 60, scale: 0.92, rotate: -3, duration: 1.5 },
          0.5,
        )
        .from(
          q("[data-hero-art]"),
          {
            opacity: 0,
            scale: 0.6,
            y: 30,
            duration: 1.1,
            stagger: { each: 0.12, from: "random" },
          },
          0.9,
        )
        .from(
          q("[data-hero-scroll]"),
          { opacity: 0, y: 12, duration: 0.8 },
          1.5,
        );

      return () => tl.kill();
    },
    { scope, dependencies: [reduced] },
  );

  return scope;
}

/**
 * Desktop-only mouse parallax. Skipped on touch and reduced motion.
 */
export function useMouseParallax(
  scope: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  active: boolean,
) {
  useGSAP(
    () => {
      if (!enabled || !scope.current) return;

      const el = scope.current;
      const layers = gsap.utils.toArray<HTMLElement>(
        el.querySelectorAll("[data-parallax]"),
      );
      if (!layers.length) return;

      const setters = layers.map((layer) => ({
        depth: Number(layer.dataset.parallax) || 1,
        x: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power2.out" }),
        y: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power2.out" }),
        rx: gsap.quickTo(layer, "rotateX", {
          duration: 1,
          ease: "power2.out",
        }),
        ry: gsap.quickTo(layer, "rotateY", {
          duration: 1,
          ease: "power2.out",
        }),
      }));

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        setters.forEach((s) => {
          const tx = nx * 22 * s.depth;
          const ty = ny * 16 * s.depth;
          const trx = -ny * 4.5 * s.depth;
          const try_ = nx * 5 * s.depth;

          s.x(tx);
          s.y(ty);
          s.rx(trx);
          s.ry(try_);
        });
      };

      const onLeave = () => {
        setters.forEach((s) => {
          s.x(0);
          s.y(0);
          s.rx(0);
          s.ry(0);
        });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope, dependencies: [enabled, active] },
  );
}
