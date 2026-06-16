export interface TickerEntry {
  symbol: string;
  type: "LONG" | "SHORT";
  return: string;
  duration: string;
  positive: boolean;
}

export const tickerEntries: TickerEntry[] = [
  { symbol: "AAPL", type: "LONG", return: "+8.4%", duration: "3d", positive: true },
  { symbol: "SPY PUTS", type: "SHORT", return: "+22.1%", duration: "1d", positive: true },
  { symbol: "/ES", type: "LONG", return: "+5.7%", duration: "6h", positive: true },
  { symbol: "NVDA", type: "LONG", return: "+11.3%", duration: "4d", positive: true },
  { symbol: "TSLA CALLS", type: "LONG", return: "+18.9%", duration: "2d", positive: true },
  { symbol: "QQQ", type: "SHORT", return: "+7.2%", duration: "1d", positive: true },
  { symbol: "/NQ", type: "LONG", return: "+9.4%", duration: "8h", positive: true },
  { symbol: "MSFT", type: "LONG", return: "+6.1%", duration: "5d", positive: true },
  { symbol: "AMD CALLS", type: "LONG", return: "+31.4%", duration: "3d", positive: true },
  { symbol: "GLD", type: "LONG", return: "+4.8%", duration: "2d", positive: true },
];
