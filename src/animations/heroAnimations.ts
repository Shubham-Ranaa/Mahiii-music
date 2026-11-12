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

      // Every animated piece of the first section.
      const targets = q(
        "[data-hero-glow], [data-hero-wordmark], [data-hero-line], [data-hero-fade], [data-hero-hint], [data-hero-phone], [data-hero-art], [data-hero-scroll]",
      );

      if (reduced) {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
        return;
      }

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        // Hand the elements back to the stylesheet once the entrance is over so
        // hover states and CSS transitions behave normally afterwards.
        onComplete: () => {
          gsap.set(targets, { clearProps: "transform,opacity" });
        },
      });

      tl.fromTo(
        q("[data-hero-glow]"),
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.8 },
      )
        .fromTo(
          q("[data-hero-wordmark]"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.25 },
          0.1,
        )
        .fromTo(
          q("[data-hero-line]"),
          { yPercent: 108 },
          { yPercent: 0, duration: 1.15, stagger: 0.09 },
          0.25,
        )
        .fromTo(
          q("[data-hero-fade]"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0.6,
        )
        .fromTo(
          q("[data-hero-phone]"),
          { opacity: 0, y: 80, scale: 0.9, rotate: -4 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.6,
            ease: "back.out(1.25)",
          },
          0.35,
        )
        .fromTo(
          q("[data-hero-hint]"),
          { opacity: 0, y: -14, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          0.55,
        )
        .fromTo(
          q("[data-hero-art]"),
          { opacity: 0, scale: 0.5, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.25,
            stagger: { each: 0.12, from: "random" },
            ease: "back.out(1.6)",
          },
          0.65,
        )
        .fromTo(
          q("[data-hero-scroll]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.2,
        );

      const triggerHero = () => {
        if (tl && tl.progress() === 0) {
          tl.play();
        }
      };

      if (typeof window !== "undefined") {
        window.addEventListener("mahii:loader-exit", triggerHero, { once: true });
      }

      // Safety fallback: the loader dispatches `mahii:loader-exit` when its
      // curtains lift. If it never shows (or fails to fire), run the entrance
      // anyway so the hero can never be left invisible.
      const fallbackTimer = setTimeout(triggerHero, 4500);

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("mahii:loader-exit", triggerHero);
        }
        clearTimeout(fallbackTimer);
        tl.kill();
      };
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
