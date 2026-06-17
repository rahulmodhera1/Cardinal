"use client";

import { useState } from "react";
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
  const [flipped, setFlipped] = useState(false);

  if (bot.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReduced ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-navy-surface border border-navy-border rounded-2xl p-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-2xl z-10 flex flex-col items-center justify-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Coming Soon</span>
          <div className="w-8 h-px bg-cardinal-red/40" />
          <span className="text-muted/60 text-xs text-center px-6">This strategy is in development and will be available in a future release.</span>
        </div>
        <div className="opacity-30 pointer-events-none select-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-ivory-text font-bold text-lg">{bot.name}</h3>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${marketBadge[bot.market]}`}>
              {bot.market}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: riskDot[bot.risk] }} />
            <span className={`text-xs font-mono font-semibold ${riskLabel[bot.risk]}`}>{bot.risk}</span>
          </div>
          <div className="mb-5 rounded-xl overflow-hidden bg-white/5 h-[60px]" />
          <div className="grid grid-cols-2 gap-3 mb-5">
            {["Win Rate", "Avg Return", "Max Drawdown", "Live Since"].map((label) => (
              <div key={label}>
                <div className="font-mono text-ivory-text font-bold text-xl">—</div>
                <div className="font-mono text-xs text-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative [transform-style:preserve-3d] min-h-[440px]"
      >
        {/* ── Front face ── */}
        <div className="card-glow group bg-navy-surface border border-navy-border rounded-2xl p-6 relative overflow-hidden [backface-visibility:hidden] h-full flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cardinal-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-ivory-text font-bold text-lg leading-tight">{bot.name}</h3>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${marketBadge[bot.market]}`}>
              {bot.market}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full inline-block ring-2 ring-offset-1"
              style={{ backgroundColor: riskDot[bot.risk] }}
            />
            <span className={`text-xs font-mono font-semibold ${riskLabel[bot.risk]}`}>{bot.risk}</span>
          </div>

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

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <div className="font-mono text-ivory-text font-bold text-xl">{bot.placeholder ? "X" : `${bot.winRate}%`}</div>
              <div className="font-mono text-xs text-muted mt-0.5">Win Rate</div>
            </div>
            <div>
              <div className="font-mono text-gain font-bold text-xl">{bot.placeholder ? "X" : `+${bot.avgReturn}%`}</div>
              <div className="font-mono text-xs text-muted mt-0.5">Avg Return/Trade</div>
            </div>
            <div>
              <div className="font-mono text-loss font-bold text-xl">{bot.placeholder ? "X" : `${bot.maxDrawdown}%`}</div>
              <div className="font-mono text-xs text-muted mt-0.5">Max Drawdown</div>
            </div>
            <div>
              <div className="font-mono text-muted font-bold text-base mt-1">{bot.placeholder ? "X" : bot.liveSince}</div>
              <div className="font-mono text-xs text-muted mt-0.5">Live Since</div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="border-t border-navy-border mb-5" />
            <button
              onClick={() => setFlipped(true)}
              className="w-full border border-white/15 text-white/80 hover:border-cardinal-red hover:text-cardinal-red hover:bg-cardinal-red/8 rounded-xl py-2.5 text-sm font-bold transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>

        {/* ── Back face ── */}
        <div className="absolute inset-0 bg-navy-surface border border-cardinal-red/30 rounded-2xl p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(178,34,34,0.8), transparent)" }}
          />

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cardinal-red mb-1">Strategy Overview</p>
            <h3 className="text-ivory-text font-bold text-lg mb-4">{bot.name}</h3>

            {bot.details && (
              <>
                <p className="text-muted leading-relaxed text-sm mb-5">{bot.details.overview}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {bot.details.stats.map((s) => (
                    <div key={s.label} className="bg-white/4 border border-white/6 rounded-xl px-3 py-2.5">
                      <div className="font-mono text-ivory-text font-bold text-sm">{s.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-cardinal-red/10 border border-cardinal-red/40 hover:bg-cardinal-red/20 hover:border-cardinal-red text-cardinal-red rounded-xl py-2.5 text-sm font-bold transition-all duration-200"
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>←</span> Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
