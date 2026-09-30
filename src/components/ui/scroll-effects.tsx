"use client";

import { useEffect, useRef } from "react";

/** Top scroll-progress bar + a soft blue glow that follows the cursor. */
export function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onMove = (e: PointerEvent) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".spotlight");
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-500 via-accent-300 to-cyan-400"
      />
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[500px] rounded-full bg-accent-500/10 blur-[120px] will-change-transform [@media(pointer:fine)]:block"
      />
    </>
  );
}
