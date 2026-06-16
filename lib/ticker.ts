export interface TickerEntry {
  symbol: string;
  price: string;
  change: string;
  positive: boolean;
}

// Large-cap stocks only — no options, futures, or ETFs.
export const tickerEntries: TickerEntry[] = [
  { symbol: "AAPL",  price: "$229.42", change: "+1.18%", positive: true },
  { symbol: "MSFT",  price: "$478.65", change: "+0.92%", positive: true },
  { symbol: "NVDA",  price: "$142.30", change: "+2.64%", positive: true },
  { symbol: "GOOGL", price: "$182.55", change: "-0.43%", positive: false },
  { symbol: "AMZN",  price: "$214.80", change: "+0.76%", positive: true },
  { symbol: "META",  price: "$612.90", change: "+1.45%", positive: true },
  { symbol: "TSLA",  price: "$348.20", change: "-1.12%", positive: false },
  { symbol: "AVGO",  price: "$238.15", change: "+1.88%", positive: true },
  { symbol: "JPM",   price: "$268.40", change: "+0.35%", positive: true },
  { symbol: "V",     price: "$352.70", change: "+0.61%", positive: true },
  { symbol: "WMT",   price: "$98.25",  change: "+0.44%", positive: true },
  { symbol: "LLY",   price: "$842.10", change: "-0.58%", positive: false },
];
