"use client";

import { useEffect, useState } from "react";
import { baseQuotes, generateQuotes, type TickerQuote } from "@/lib/ticker";

export function TickerTape() {
  // Start from the deterministic baseline so SSR and first client render match.
  const [quotes, setQuotes] = useState<TickerQuote[]>(baseQuotes);

  useEffect(() => {
    // New snapshot on every page load…
    setQuotes(generateQuotes());
    // …and keep it ticking live while the page is open.
    const id = setInterval(() => setQuotes(generateQuotes()), 3500);
    return () => clearInterval(id);
  }, []);

  const entries = [...quotes, ...quotes];

  return (
    <div
      className="w-full overflow-hidden bg-navy-surface border-b border-navy-border"
      style={{ height: "36px" }}
      aria-hidden="true"
    >
      <div className="ticker-track h-full items-center flex">
        {entries.map((entry, i) => (
          <span key={i} className="flex items-center gap-2 px-4 whitespace-nowrap">
            <span className="text-cardinal-red text-xs">●</span>
            <span className="font-mono text-xs font-semibold text-ivory-text">
              {entry.symbol}
            </span>
            <span className="font-mono text-xs text-muted">{entry.price}</span>
            <span
              className={`font-mono text-xs font-semibold ${
                entry.positive ? "text-gain-light" : "text-loss"
              }`}
            >
              {entry.change}
            </span>
            <span className="text-navy-border mx-2 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
