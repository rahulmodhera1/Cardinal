export interface Bot {
  id: string;
  name: string;
  market: "Equities" | "Options" | "Futures";
  risk: "Conservative" | "Moderate" | "Aggressive";
  winRate: number;
  avgReturn: number;
  maxDrawdown: number;
  liveSince: string;
  totalTrades: number;
  bestMonth: string;
  worstMonth: string;
  overallReturn: string;
  description: string;
  sparkline: number[];
}

export const bots: Bot[] = [
  {
    id: "alpha-1",
    name: "Cardinal Alpha-1",
    market: "Equities",
    risk: "Moderate",
    winRate: 68,
    avgReturn: 3.1,
    maxDrawdown: -8.4,
    liveSince: "Mar 2024",
    totalTrades: 142,
    bestMonth: "+19.2%",
    worstMonth: "-6.1%",
    overallReturn: "+41.3%",
    description:
      "Swing momentum strategy on large-cap stocks. Targets 3–7 day holds on high-volume breakout setups.",
    sparkline: [100, 104, 101, 108, 106, 112, 110, 118, 115, 122, 119, 128],
  },
  {
    id: "theta",
    name: "Cardinal Theta",
    market: "Options",
    risk: "Moderate",
    winRate: 61,
    avgReturn: 4.8,
    maxDrawdown: -12.1,
    liveSince: "Jun 2024",
    totalTrades: 88,
    bestMonth: "+24.7%",
    worstMonth: "-9.3%",
    overallReturn: "+33.6%",
    description:
      "Options premium capture on equities and indices. Trades defined-risk spreads on swing setups.",
    sparkline: [100, 108, 105, 114, 109, 118, 115, 124, 120, 130, 126, 135],
  },
  {
    id: "apex",
    name: "Cardinal Apex",
    market: "Futures",
    risk: "Aggressive",
    winRate: 57,
    avgReturn: 6.2,
    maxDrawdown: -18.5,
    liveSince: "Sep 2024",
    totalTrades: 64,
    bestMonth: "+31.4%",
    worstMonth: "-14.2%",
    overallReturn: "+28.9%",
    description:
      "High-conviction swing strategy on /ES and /NQ futures. Larger moves, shorter timeframes.",
    sparkline: [100, 112, 106, 118, 110, 125, 118, 134, 124, 140, 132, 145],
  },
  {
    id: "sentinel",
    name: "Cardinal Sentinel",
    market: "Equities",
    risk: "Conservative",
    winRate: 72,
    avgReturn: 1.9,
    maxDrawdown: -4.2,
    liveSince: "Jan 2024",
    totalTrades: 198,
    bestMonth: "+11.3%",
    worstMonth: "-3.1%",
    overallReturn: "+22.4%",
    description:
      "Low-volatility defensive swing strategy. Targets steady, consistent gains over aggressive returns.",
    sparkline: [100, 102, 101, 104, 103, 106, 105, 108, 107, 110, 109, 112],
  },
];
