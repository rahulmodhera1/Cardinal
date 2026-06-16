"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { bots } from "@/lib/bots";

const stats = [
  { display: "4",    suffix: "",    label: "Live Bots Deployed",          numericEnd: 4   },
  { display: "11mo", suffix: "mo",  label: "Average Live Track Record",   numericEnd: 11  },
  { display: "100%", suffix: "%",   label: "Trade History Transparency",  numericEnd: 100 },
];

function CountUp({ end, suffix, duration = 1400, prefersReduced }: { end: number; suffix: string; duration?: number; prefersReduced: boolean | null }) {
  const [value, setValue] = useState(prefersReduced ? end : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || prefersReduced) { setValue(end); return; }
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration, prefersReduced]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function PerformanceSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="performance" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          Performance
        </p>
        <h2
          className="text-ivory-text font-bold text-center mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          We show you the full picture.
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — copy + count-up stats */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted text-lg leading-relaxed max-w-md mb-12">
              Most algo trading platforms cherry-pick their winners. At Cardinal, every
              bot&apos;s full trade history — including the losing trades — is available to
              subscribers before they commit. Our edge isn&apos;t hiding drawdowns. It&apos;s
              surviving them.
            </p>

            <div className="space-y-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReduced ? 0 : 0.5, delay: i * 0.14 }}
                  className="flex items-baseline gap-5"
                >
                  <span
                    className="font-mono font-bold text-cardinal-red leading-none"
                    style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
                  >
                    <CountUp
                      end={stat.numericEnd}
                      suffix={stat.suffix}
                      prefersReduced={prefersReduced}
                    />
                  </span>
                  <span className="text-ivory-text text-sm uppercase tracking-widest font-bold">
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
            transition={{ duration: prefersReduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-navy-surface border border-navy-border rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-border/60">
                    {["Bot", "Market", "Trades", "Win Rate", "Best Mo.", "Worst Mo.", "Total"].map((col) => (
                      <th
                        key={col}
                        className="text-muted font-bold text-xs uppercase tracking-wider font-mono px-4 py-3.5 text-left first:pl-5"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bots.map((bot, i) => (
                    <tr
                      key={bot.id}
                      className={`transition-colors hover:bg-cardinal-red/8 ${i % 2 === 0 ? "bg-transparent" : "bg-white/3"}`}
                    >
                      <td className="px-4 py-3.5 pl-5 font-bold text-ivory-text font-mono text-xs whitespace-nowrap">
                        {bot.name.replace("Cardinal ", "")}
                      </td>
                      <td className="px-4 py-3.5 text-muted font-mono text-xs">{bot.market}</td>
                      <td className="px-4 py-3.5 text-ivory-text font-mono text-xs">{bot.totalTrades}</td>
                      <td className="px-4 py-3.5 text-ivory-text font-mono text-xs font-bold">{bot.winRate}%</td>
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-gain">{bot.bestMonth}</td>
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-loss">{bot.worstMonth}</td>
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-gain">{bot.overallReturn}</td>
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
