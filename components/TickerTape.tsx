import { tickerEntries } from "@/lib/ticker";

export function TickerTape() {
  const entries = [...tickerEntries, ...tickerEntries];

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
            <span
              className={`font-mono text-xs font-semibold ${
                entry.positive ? "text-gain-light" : "text-loss"
              }`}
            >
              {entry.return}
            </span>
            <span className="font-mono text-xs text-muted">{entry.duration}</span>
            <span className="text-navy-border mx-2 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
