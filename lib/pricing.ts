export interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  bots: string;
  markets: string;
  dashboard: string;
  support: string;
  recommended: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 79,
    annualPrice: 63,
    bots: "1 bot",
    markets: "Equities only",
    dashboard: "Basic",
    support: "Email",
    recommended: false,
  },
  {
    name: "Pro",
    monthlyPrice: 179,
    annualPrice: 143,
    bots: "Up to 4 bots",
    markets: "Stocks + Options",
    dashboard: "Full analytics",
    support: "Priority email",
    recommended: true,
  },
  {
    name: "Institutional",
    monthlyPrice: 499,
    annualPrice: 399,
    bots: "Unlimited",
    markets: "All markets",
    dashboard: "Priority + API",
    support: "Dedicated manager",
    recommended: false,
  },
];
