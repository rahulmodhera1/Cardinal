export interface BotIndicator {
  name: string;
  purpose: string;
}

export interface BotDetails {
  strategy: string;
  indicators: BotIndicator[];
  holdTime: string;
  entryRule: string;
  exitRule: string;
  riskPerTrade: string;
}

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
  details?: BotDetails;
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
    details: {
      strategy:
        "Momentum swing strategy targeting large-cap NYSE and NASDAQ equities. Scans for high-probability breakout setups using a multi-indicator confirmation stack before committing to any position.",
      indicators: [
        { name: "RSI (14)", purpose: "Entry timing — avoids overbought conditions above 70" },
        { name: "EMA 20 / EMA 50", purpose: "Trend filter — only longs above both moving averages" },
        { name: "MACD (12, 26, 9)", purpose: "Momentum confirmation before entry is triggered" },
        { name: "Volume Profile", purpose: "Breakout validated by volume > 1.5× 20-day average" },
        { name: "ATR (14)", purpose: "Dynamic position sizing and stop-loss placement" },
      ],
      holdTime: "3–7 trading days",
      entryRule:
        "Enters on confirmed breakout above resistance with RSI below 70, MACD bullish cross, and above-average volume.",
      exitRule:
        "Exits at a 2× ATR profit target or on momentum loss confirmed by MACD bearish cross.",
      riskPerTrade: "1–2% of account per position",
    },
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
];
