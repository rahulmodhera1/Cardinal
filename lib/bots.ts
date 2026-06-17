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
  placeholder?: boolean;
  comingSoon?: boolean;
}

export const bots: Bot[] = [
  {
    id: "money-printer",
    name: "Money Printer",
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
    placeholder: true,
  },
  {
    id: "theta",
    name: "Cardinal Theta",
    market: "Options",
    risk: "Moderate",
    winRate: 61,
    avgReturn: 4.8,
    maxDrawdown: -12.1,
    liveSince: "TBA",
    totalTrades: 0,
    bestMonth: "—",
    worstMonth: "—",
    overallReturn: "—",
    description: "Options premium capture strategy. Coming soon.",
    sparkline: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    comingSoon: true,
  },
  {
    id: "apex",
    name: "Cardinal Apex",
    market: "Futures",
    risk: "Aggressive",
    winRate: 57,
    avgReturn: 6.2,
    maxDrawdown: -18.5,
    liveSince: "TBA",
    totalTrades: 0,
    bestMonth: "—",
    worstMonth: "—",
    overallReturn: "—",
    description: "High-conviction futures swing strategy. Coming soon.",
    sparkline: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    comingSoon: true,
  },
  {
    id: "sentinel",
    name: "Cardinal Sentinel",
    market: "Equities",
    risk: "Conservative",
    winRate: 72,
    avgReturn: 1.9,
    maxDrawdown: -4.2,
    liveSince: "TBA",
    totalTrades: 0,
    bestMonth: "—",
    worstMonth: "—",
    overallReturn: "—",
    description: "Low-volatility defensive swing strategy. Coming soon.",
    sparkline: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    comingSoon: true,
  },
];
