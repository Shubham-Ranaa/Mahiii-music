"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP plugins.
 * Importing this module anywhere guarantees plugins are registered exactly once.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;

  // Lenis drives the scroll, so ScrollTrigger should not try to smooth it again.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };

export const EASE = {
  out: "power3.out",
  outExpo: "expo.out",
  inOut: "power2.inOut",
  soft: "power1.out",
} as const;

/** Shared defaults so every section animates with the same feel. */
export const DEFAULTS = {
  duration: 0.9,
  ease: EASE.out,
} as const;
