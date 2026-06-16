export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Do I need to be an experienced trader to use Cardinal?",
    answer:
      "No. Our bots handle the execution. You choose a strategy based on risk level and market type, connect your broker, and the bot does the rest. We do recommend understanding basic market concepts before subscribing.",
  },
  {
    question: "Which brokers are supported?",
    answer:
      "We support Interactive Brokers, TD Ameritrade (now Schwab), TradeStation, and Alpaca Markets. Additional brokers are added regularly — contact us if yours isn't listed.",
  },
  {
    question: "How are the bots tested before going live?",
    answer:
      "Each strategy goes through two phases: backtesting against 5+ years of historical data, then a minimum 90-day forward-test period on a paper account. Only strategies that clear both phases with documented results are offered to clients.",
  },
  {
    question: "Can I run multiple bots at the same time?",
    answer:
      "Yes — depending on your plan. The Pro plan supports up to 4 simultaneous bots across different markets. Institutional has no limit.",
  },
  {
    question: "What happens if a bot has a losing streak?",
    answer:
      "Every bot has defined drawdown thresholds. If a bot breaches its max drawdown parameter, it pauses automatically and you're notified immediately. You can review and reactivate once market conditions normalize.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Cancel from your dashboard at any time. No calls, no friction. Your bots will stop executing at the end of your billing period.",
  },
  {
    question: "Are the bots trading with my real money?",
    answer:
      "Yes — they execute in your own brokerage account. Cardinal never holds your funds. You maintain full control and visibility through your broker's native platform.",
  },
  {
    question: "What markets do Cardinal bots support?",
    answer:
      "Regular equities (stocks), options (calls and puts on equities and indices), and futures (/ES, /NQ, /CL, and others). Each bot's page specifies exactly which instruments it trades.",
  },
];
