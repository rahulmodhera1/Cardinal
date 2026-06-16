"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Choose Your Bots",
    body: "Browse our tested roster — equities, options, or futures. Filter by risk level, market type, and historical return profile.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Subscribe & Connect",
    body: "Pick a plan. Link your broker account via our secure connection. Cardinal handles the rest — no manual configuration needed.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Let Them Trade",
    body: "Your subscribed bots monitor the market and execute trades automatically. Real-time alerts and a live performance dashboard keep you informed.",
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="how-it-works" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          How It Works
        </p>
        <h2
          className="text-ivory-text font-bold text-center mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Up and running in minutes.
        </h2>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px border-t border-dashed border-navy-border z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReduced ? 0 : 0.5,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 bg-navy-surface border border-navy-border rounded-2xl p-8 hover:border-cardinal-red/40 hover:shadow-lg hover:shadow-cardinal-red/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <Icon className="w-8 h-8 text-cardinal-red" />
                  <span className="font-mono text-sm text-cardinal-red/60">{step.number}</span>
                </div>
                <h3 className="text-ivory-text font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-muted text-base leading-relaxed">{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
