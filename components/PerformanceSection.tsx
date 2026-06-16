"use client";

import { motion, useReducedMotion } from "framer-motion";
import { bots } from "@/lib/bots";

const stats = [
  { value: "4", label: "Live Bots Deployed" },
  { value: "11mo", label: "Average Live Track Record" },
  { value: "100%", label: "Trade History Transparency" },
];

export function PerformanceSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="performance" className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          Performance
        </p>
        <h2
          className="text-navy font-bold text-center mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          We show you the full picture.
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — copy + stats */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-navy/80 text-lg leading-relaxed max-w-md mb-10">
              Most algo trading platforms cherry-pick their winners. At Cardinal, every
              bot&apos;s full trade history — including the losing trades — is available to
              subscribers before they commit. Our edge isn&apos;t hiding drawdowns. It&apos;s
              surviving them.
            </p>

            <div className="space-y-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReduced ? 0 : 0.5, delay: i * 0.12 }}
                  className="flex items-baseline gap-5"
                >
                  <span className="font-mono font-bold text-cardinal-red" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                    {stat.value}
                  </span>
                  <span className="text-navy text-sm uppercase tracking-widest font-semibold">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — performance table */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white border border-ivory-warm rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ivory-warm">
                    {["Bot", "Market", "Trades", "Win Rate", "Best Mo.", "Worst Mo.", "Total"].map(
                      (col) => (
                        <th
                          key={col}
                          className="text-navy font-semibold text-xs uppercase tracking-wider font-mono px-4 py-3 text-left first:pl-5"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bots.map((bot, i) => (
                    <tr
                      key={bot.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-ivory"}
                    >
                      <td className="px-4 py-3 pl-5 font-semibold text-navy font-mono text-xs whitespace-nowrap">
                        {bot.name.replace("Cardinal ", "")}
                      </td>
                      <td className="px-4 py-3 text-muted font-mono text-xs">{bot.market}</td>
                      <td className="px-4 py-3 text-navy font-mono text-xs">{bot.totalTrades}</td>
                      <td className="px-4 py-3 text-navy font-mono text-xs font-semibold">
                        {bot.winRate}%
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-gain">
                        {bot.bestMonth}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-loss">
                        {bot.worstMonth}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-gain">
                        {bot.overallReturn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
