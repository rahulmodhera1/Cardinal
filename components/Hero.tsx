"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkline } from "@/components/Sparkline";

const heroSparkline = [100, 104, 101, 108, 106, 112, 110, 118, 115, 122, 119, 128];

const trades = [
  { symbol: "AAPL", side: "LONG", ret: "+8.4%", status: "CLOSED" },
  { symbol: "SPY PUTS", side: "SHORT", ret: "+22.1%", status: "CLOSED" },
  { symbol: "/ES", side: "LONG", ret: "+5.7%", status: "CLOSED" },
  { symbol: "NVDA", side: "LONG", ret: "+11.3%", status: "CLOSED" },
  { symbol: "TSLA CALLS", side: "LONG", ret: "+18.9%", status: "CLOSED" },
];

export function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReduced ? 0 : 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative min-h-screen bg-navy-deep chart-grid-bg flex items-center pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-xs tracking-[0.2em] uppercase text-cardinal-red mb-6"
            >
              Professional Trading Solutions
            </motion.p>

            <div className="space-y-1 mb-8">
              <motion.h1
                {...fadeUp(0.06)}
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-ivory-text">Swing Trading.</span>
              </motion.h1>
              <motion.h1
                {...fadeUp(0.18)}
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-ivory-text">Automated. </span>
                <span className="text-cardinal-red">Tested.</span>
              </motion.h1>
              <motion.h1
                {...fadeUp(0.3)}
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-ivory-text">Built to Perform.</span>
              </motion.h1>
            </div>

            <motion.p
              {...fadeUp(0.44)}
              className="text-muted text-lg leading-relaxed max-w-xl"
            >
              Cardinal gives you access to a suite of swing trading bots designed for
              stocks, options, and futures — vetted through real market conditions
              before you ever pay a dollar.
            </motion.p>

            <motion.div
              {...fadeUp(0.56)}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href="#pricing"
                className="bg-cardinal-red hover:bg-cardinal-red-dark text-ivory-text font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
              >
                Explore Plans
              </a>
              <a
                href="#performance"
                className="border border-navy-border text-ivory-text hover:border-cardinal-red px-8 py-3.5 rounded-full transition-all duration-200"
              >
                See Performance
              </a>
            </motion.div>

            <motion.p
              {...fadeUp(0.65)}
              className="font-mono text-sm text-muted mt-6 flex flex-wrap gap-4"
            >
              <span>✓ Cancel anytime</span>
              <span>✓ No lock-in</span>
              <span>✓ Live track record</span>
            </motion.p>
          </div>

          {/* Right — Live Bot Card */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            <div className="bg-navy-surface border border-navy-border rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-ivory-text text-lg">Cardinal Alpha-1</span>
                <span className="flex items-center gap-1.5 bg-cardinal-red/20 border border-cardinal-red text-cardinal-red text-xs font-mono px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cardinal-red animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Sparkline */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <Sparkline
                  data={heroSparkline}
                  width={340}
                  height={80}
                  lineColor="#B22222"
                  fillColor="rgba(178,34,34,0.18)"
                  className="w-full"
                />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Win Rate", value: "68%", green: true },
                  { label: "Avg Hold", value: "2.4d", green: false },
                  { label: "MTD Return", value: "+14.2%", green: true },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className={`font-mono text-lg font-bold ${
                        stat.green ? "text-gain-light" : "text-ivory-text"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-navy-border my-4" />

              {/* Last 5 trades */}
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">Last 5 Trades</p>
                {trades.map((trade, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-ivory-text font-semibold w-24 truncate">
                      {trade.symbol}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                        trade.side === "LONG"
                          ? "bg-gain/20 text-gain-light"
                          : "bg-loss/20 text-loss"
                      }`}
                    >
                      {trade.side}
                    </span>
                    <span className="text-gain-light font-semibold">{trade.ret}</span>
                    <span className="text-muted">✓ {trade.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
