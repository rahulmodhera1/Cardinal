export interface TickerQuote {
  symbol: string;
  price: string;
  change: string;
  positive: boolean;
}

// Large-cap stocks only — no options, futures, or ETFs.
const STOCKS: { symbol: string; base: number }[] = [
  { symbol: "AAPL",  base: 229.42 },
  { symbol: "MSFT",  base: 478.65 },
  { symbol: "NVDA",  base: 142.30 },
  { symbol: "GOOGL", base: 182.55 },
  { symbol: "AMZN",  base: 214.80 },
  { symbol: "META",  base: 612.90 },
  { symbol: "TSLA",  base: 348.20 },
  { symbol: "AVGO",  base: 238.15 },
  { symbol: "JPM",   base: 268.40 },
  { symbol: "V",     base: 352.70 },
  { symbol: "WMT",   base: 98.25  },
  { symbol: "LLY",   base: 842.10 },
];

function makeQuote(symbol: string, price: number, pct: number): TickerQuote {
  return {
    symbol,
    price: `$${price.toFixed(2)}`,
    change: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
    positive: pct >= 0,
  };
}

// Deterministic baseline used for SSR / first paint (prevents hydration mismatch).
export const baseQuotes: TickerQuote[] = [
  makeQuote("AAPL",  229.42,  1.18),
  makeQuote("MSFT",  478.65,  0.92),
  makeQuote("NVDA",  142.30,  2.64),
  makeQuote("GOOGL", 182.55, -0.43),
  makeQuote("AMZN",  214.80,  0.76),
  makeQuote("META",  612.90,  1.45),
  makeQuote("TSLA",  348.20, -1.12),
  makeQuote("AVGO",  238.15,  1.88),
  makeQuote("JPM",   268.40,  0.35),
  makeQuote("V",     352.70,  0.61),
  makeQuote("WMT",   98.25,   0.44),
  makeQuote("LLY",   842.10, -0.58),
];

// Fresh randomized-but-realistic snapshot. New values on every call
// (i.e. every page load and on each live tick).
// To use real exchange data later, swap this for a fetch to your quote API.
export function generateQuotes(): TickerQuote[] {
  return STOCKS.map((s) => {
    const pct = Math.random() * 5 - 2; // roughly -2% .. +3%
    const price = s.base * (1 + pct / 100);
    return makeQuote(s.symbol, price, pct);
  });
}
