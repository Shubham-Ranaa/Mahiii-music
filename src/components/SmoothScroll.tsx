"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Global smooth scrolling.
 *
 * - Lenis owns the scroll position and drives ScrollTrigger from its own RAF.
 * - `autoRaf` is left off: GSAP's ticker is the single animation loop, so there
 *   is exactly one RAF and no competing loops.
 * - Touch devices keep native scrolling (`syncTouch: false`) so mobile inertia
 *   and pull-to-refresh behave the way people expect.
 * - Reduced motion gets no smoothing at all.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
      autoRaf: false,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for in-page anchor buttons that are not plain links.
    const root = document.documentElement;
    root.dataset.lenis = "on";

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      window.history.replaceState(null, "", id);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete root.dataset.lenis;
    };
  }, [reduced]);

  return null;
}
