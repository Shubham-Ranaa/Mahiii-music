"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      setProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
    };

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 inset-x-0 z-[70] h-[2px] bg-transparent"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-deep via-violet-core to-lavender transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 12px rgba(168,85,247,0.85)",
        }}
      />
    </div>
  );
}
