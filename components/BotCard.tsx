"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkline } from "@/components/Sparkline";
import type { Bot } from "@/lib/bots";

const marketBadge = {
  Equities: "bg-navy/10 text-navy",
  Options: "bg-cardinal-red/10 text-cardinal-red",
  Futures: "bg-gain/10 text-gain",
};

const riskDot = {
  Conservative: "bg-gain-light",
  Moderate: "#D97706",
  Aggressive: "bg-cardinal-red",
};

const riskLabel = {
  Conservative: "text-gain-light",
  Moderate: "text-amber-500",
  Aggressive: "text-cardinal-red",
};

export function BotCard({ bot, delay = 0 }: { bot: Bot; delay?: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
      className="group bg-white border border-ivory rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-t-2 hover:border-t-cardinal-red"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-navy font-semibold text-lg">{bot.name}</h3>
        <span
          className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${marketBadge[bot.market]}`}
        >
          {bot.market}
        </span>
      </div>

      {/* Risk indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{
            backgroundColor:
              bot.risk === "Moderate"
                ? riskDot.Moderate
                : bot.risk === "Conservative"
                ? "#4CAF80"
                : "#B22222",
          }}
        />
        <span className={`text-xs font-mono ${riskLabel[bot.risk]}`}>{bot.risk}</span>
      </div>

      {/* Sparkline */}
      <div className="mb-5 rounded-lg overflow-hidden bg-ivory/50">
        <Sparkline
          data={bot.sparkline}
          width={300}
          height={60}
          lineColor="#1B2A4A"
          fillColor="rgba(27,42,74,0.12)"
          className="w-full"
        />
      </div>

      {/* Stats 2x2 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <div className="font-mono text-navy font-bold text-lg">{bot.winRate}%</div>
          <div className="font-mono text-xs text-muted">Win Rate</div>
        </div>
        <div>
          <div className="font-mono text-gain font-bold text-lg">+{bot.avgReturn}%</div>
          <div className="font-mono text-xs text-muted">Avg Return/Trade</div>
        </div>
        <div>
          <div className="font-mono text-loss font-bold text-lg">{bot.maxDrawdown}%</div>
          <div className="font-mono text-xs text-muted">Max Drawdown</div>
        </div>
        <div>
          <div className="font-mono text-navy/70 font-bold text-base">{bot.liveSince}</div>
          <div className="font-mono text-xs text-muted">Live Since</div>
        </div>
      </div>

      <div className="border-t border-ivory mb-5" />

      {/* CTA */}
      <button className="w-full border border-navy/30 text-navy hover:border-cardinal-red hover:text-cardinal-red rounded-lg py-2.5 text-sm font-semibold transition-all duration-200">
        View Details
      </button>
    </motion.div>
  );
}
