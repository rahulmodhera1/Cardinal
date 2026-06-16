"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkline } from "@/components/Sparkline";
import type { Bot } from "@/lib/bots";

const marketBadge = {
  Equities: "bg-white/8 text-white/80 border border-white/15",
  Options:  "bg-cardinal-red/15 text-cardinal-red border border-cardinal-red/30",
  Futures:  "bg-gain/10 text-gain-light border border-gain/20",
};

const riskDot: Record<string, string> = {
  Conservative: "#4CAF80",
  Moderate:     "#D97706",
  Aggressive:   "#B22222",
};

const riskLabel: Record<string, string> = {
  Conservative: "text-gain-light",
  Moderate:     "text-amber-500",
  Aggressive:   "text-cardinal-red",
};

export function BotCard({ bot, delay = 0 }: { bot: Bot; delay?: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="card-glow group bg-navy-surface border border-navy-border rounded-2xl p-6 cursor-pointer relative overflow-hidden"
    >
      {/* Top accent line that reveals on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cardinal-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-ivory-text font-bold text-lg leading-tight">{bot.name}</h3>
        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${marketBadge[bot.market]}`}>
          {bot.market}
        </span>
      </div>

      {/* Risk */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-2 h-2 rounded-full inline-block ring-2 ring-offset-1"
          style={{ backgroundColor: riskDot[bot.risk] }}
        />
        <span className={`text-xs font-mono font-semibold ${riskLabel[bot.risk]}`}>{bot.risk}</span>
      </div>

      {/* Sparkline */}
      <div className="mb-5 rounded-xl overflow-hidden bg-white/5">
        <Sparkline
          data={bot.sparkline}
          width={300}
          height={60}
          lineColor="#B22222"
          fillColor="rgba(178,34,34,0.12)"
          className="w-full"
        />
      </div>

      {/* Stats 2×2 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <div className="font-mono text-ivory-text font-bold text-xl">{bot.winRate}%</div>
          <div className="font-mono text-xs text-muted mt-0.5">Win Rate</div>
        </div>
        <div>
          <div className="font-mono text-gain font-bold text-xl">+{bot.avgReturn}%</div>
          <div className="font-mono text-xs text-muted mt-0.5">Avg Return/Trade</div>
        </div>
        <div>
          <div className="font-mono text-loss font-bold text-xl">{bot.maxDrawdown}%</div>
          <div className="font-mono text-xs text-muted mt-0.5">Max Drawdown</div>
        </div>
        <div>
          <div className="font-mono text-muted font-bold text-base mt-1">{bot.liveSince}</div>
          <div className="font-mono text-xs text-muted mt-0.5">Live Since</div>
        </div>
      </div>

      <div className="border-t border-navy-border mb-5" />

      <button className="w-full border border-white/15 text-white/80 hover:border-cardinal-red hover:text-cardinal-red hover:bg-cardinal-red/8 rounded-xl py-2.5 text-sm font-bold transition-all duration-200">
        View Details
      </button>
    </motion.div>
  );
}
