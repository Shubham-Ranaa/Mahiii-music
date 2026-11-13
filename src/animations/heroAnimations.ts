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
          gsap.set(q("[data-hero-letter], [data-hero-word]"), {
            clearProps: "transform,opacity,filter",
          });
          gsap.set(q("[data-hero-reveal]"), {
            clearProps: "transform,opacity,clipPath",
          });
        },
      });

      /* ---------------- Ambient light field ---------------- */
      tl.fromTo(
        q("[data-hero-glow]"),
        { opacity: 0, scale: 0.86 },
        { opacity: 1, scale: 1, duration: 2.4, ease: "expo.out" },
      );

      /* ---------------- Status badge ---------------- */
      tl.fromTo(
        q("[data-hero-wordmark]"),
        { opacity: 0, scale: 0.7, y: -20, rotate: -5 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 1.2,
          ease: "back.out(1.8)",
        },
        0.05,
      );

      /* ---------------- Wordmark: per-letter flip up ---------------- */
      tl.fromTo(
        q("[data-hero-letter]"),
        {
          yPercent: 130,
          opacity: 0,
          rotateX: -92,
          scale: 0.78,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.35,
          stagger: 0.085,
          ease: "expo.out",
        },
        0.18,
      );

      /* ---------------- Highlight sweeping across the letters --------- */
      tl.fromTo(
        q("[data-hero-letter]"),
        { backgroundPosition: "100% 0%" },
        {
          backgroundPosition: "0% 0%",
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        0.55,
      );

      /* ---------------- Tagline: word-by-word reveal ---------------- */
      tl.fromTo(
        q("[data-hero-word]"),
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -70,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.075,
          ease: "expo.out",
        },
        0.5,
      );

      /* ---------------- Supporting copy: masked line reveals ---------- */
      tl.fromTo(
        q("[data-hero-reveal]"),
        {
          opacity: 0,
          y: 30,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          stagger: 0.12,
          ease: "expo.out",
        },
        0.75,
      );

      /* ---------------- CTAs: spring in ---------------- */
      tl.fromTo(
        q("[data-hero-cta]"),
        { opacity: 0, y: 38, scale: 0.82, rotate: -2.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.15,
          stagger: 0.09,
          ease: "back.out(2)",
        },
        0.92,
      );

      /* ---------------- Chips ---------------- */
      tl.fromTo(
        q("[data-hero-chips]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
        1.18,
      );

      /* ---------------- Device: 3D tumble into place ---------------- */
      tl.fromTo(
        q("[data-hero-device]"),
        {
          opacity: 0,
          y: 120,
          scale: 0.78,
          rotateX: 32,
          rotateY: -18,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 2,
          ease: "expo.out",
        },
        0.35,
      );

      /* ---------------- Floating artwork ---------------- */
      tl.fromTo(
        q("[data-hero-art-inner]"),
        {
          opacity: 0,
          scale: 0.35,
          y: 70,
          rotate: -18,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: { each: 0.13, from: "random" },
          ease: "back.out(1.6)",
        },
        0.85,
      );

      /* ---------------- Hint pill + scroll cue ---------------- */
      tl.fromTo(
        q("[data-hero-hint]"),
        { opacity: 0, y: -20, scale: 0.86 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "back.out(1.7)",
        },
        1.05,
      ).fromTo(
        q("[data-hero-scroll]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        1.35,
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
