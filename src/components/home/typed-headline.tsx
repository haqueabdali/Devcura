"use client";

import { useEffect, useState } from "react";

/** Cycles through phrases with a typewriter effect; static under reduced motion. */
export function TypedHeadline({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let p = 0;
    let i = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = phrases[p];
      i += deleting ? -1 : 1;
      setText(full.slice(0, i));
      let delay = deleting ? 35 : 70;
      if (!deleting && i === full.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && i === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    i = phrases[0].length;
    deleting = true;
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, [phrases]);

  return (
    <span aria-label={phrases[0]}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-accent-400 motion-safe:animate-pulse"
      />
    </span>
  );
}
