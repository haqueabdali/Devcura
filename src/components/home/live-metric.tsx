"use client";

import { useEffect, useState } from "react";

/** Pipeline readout whose latency and request count tick like a live canary. */
export function LiveMetric() {
  const [p95, setP95] = useState(184);
  const [rps, setRps] = useState(2140);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setP95((v) => Math.round(Math.min(215, Math.max(162, v + (Math.random() - 0.5) * 14))));
      setRps((v) => Math.round(Math.min(2600, Math.max(1800, v + (Math.random() - 0.5) * 120))));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      p95 {p95}ms · {rps.toLocaleString("en-US")} rps · errors 0.00%
    </span>
  );
}
