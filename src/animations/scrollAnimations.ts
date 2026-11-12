"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Generic scroll reveal for a section.
 * `[data-reveal]` children fade/rise in on enter; `[data-reveal-line] > span`
 * children unmask line by line.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q("[data-reveal], [data-reveal-line] > span"), {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      const fadeTargets = q("[data-reveal]");
      if (fadeTargets.length) {
        gsap.fromTo(
          fadeTargets,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: scope.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const lineTargets = q("[data-reveal-line] > span");
      if (lineTargets.length) {
        gsap.from(lineTargets, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope, dependencies: [reduced] },
  );

  return scope;
}

/**
 * Words fade from dim to full brightness as the section scrolls through.
 * Used for the editorial About statement.
 */
export function useWordScrollReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      const words = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll("[data-word]"),
      );
      if (!words.length) return;

      if (reduced) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope, dependencies: [reduced] },
  );

  return scope;
}

/**
 * Subtle vertical parallax on `[data-drift]` elements.
 */
export function useDrift<T extends HTMLElement = HTMLElement>(
  distance = 80,
) {
  const scope = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current || reduced) return;

      const targets = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll("[data-drift]"),
      );

      targets.forEach((target) => {
        const depth = Number(target.dataset.drift) || 1;
        gsap.to(target, {
          y: -distance * depth,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    },
    { scope, dependencies: [reduced, distance] },
  );

  return scope;
}
