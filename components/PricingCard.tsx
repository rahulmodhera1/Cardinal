"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { PricingTier } from "@/lib/pricing";

const included = [
  "Backtested strategies",
  "Real-time trade alerts",
  "Broker integration included",
  "Live performance dashboard",
];

interface PricingCardProps {
  tier: PricingTier;
  delay?: number;
}

export function PricingCard({ tier, delay = 0 }: PricingCardProps) {
  const prefersReduced = useReducedMotion();
  const price = tier.monthlyPrice;

  if (tier.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReduced ? 0 : 0.55, delay }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="bg-navy-surface border border-navy-border rounded-2xl p-8 flex flex-col h-full">
          {/* Blurred background content */}
          <div className="opacity-25 pointer-events-none select-none">
            <h3 className="text-ivory-text font-bold text-xl mb-2">{tier.name}</h3>
            <div className="mb-6 mt-1">
              <span className="font-mono text-5xl font-bold text-ivory-text">${price}</span>
              <span className="font-mono text-muted text-base ml-1">/mo</span>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                { label: "Bots",      value: tier.bots },
                { label: "Markets",   value: tier.markets },
                { label: "Dashboard", value: tier.dashboard },
                { label: "Support",   value: tier.support },
              ].map((item) => (
                <li key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted font-mono">{item.label}</span>
                  <span className="text-ivory-text font-semibold">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-navy-border mb-6" />
            <ul className="space-y-2 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2 font-mono text-sm text-muted">
                  <CheckCircle className="h-4 w-4 text-gain-light flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="block text-center py-3 rounded-full border border-navy-border text-ivory-text text-sm font-bold">
              Get Started
            </div>
          </div>

          {/* Coming soon overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-3 px-8">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">Coming Soon</span>
            <div className="w-8 h-px bg-cardinal-red/40" />
            <span className="text-muted/60 text-xs text-center leading-relaxed">
              This payment plan is currently in development and will be available in a future release.
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  const cardBody = (
    <div className="relative flex flex-col h-full p-8 bg-navy-surface animated-border-inner">
      <span className="absolute -top-4 right-6 bg-cardinal-red text-ivory text-xs font-bold font-mono px-3 py-1 rounded-full shadow-lg shadow-cardinal-red/30">
        Most Popular
      </span>

      <h3 className="text-ivory-text font-bold text-xl mb-2">{tier.name}</h3>

      <div className="mb-6 mt-1">
        <span className="font-mono text-5xl font-bold text-ivory-text">${price}</span>
        <span className="font-mono text-muted text-base ml-1">/mo</span>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {[
          { label: "Bots",      value: tier.bots },
          { label: "Markets",   value: tier.markets },
          { label: "Dashboard", value: tier.dashboard },
          { label: "Support",   value: tier.support },
        ].map((item) => (
          <li key={item.label} className="flex justify-between text-sm">
            <span className="text-muted font-mono">{item.label}</span>
            <span className="text-ivory-text font-semibold text-right">{item.value}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-navy-border mb-6" />

      <ul className="space-y-2 mb-8">
        {included.map((item) => (
          <li key={item} className="flex items-center gap-2 font-mono text-sm text-muted">
            <CheckCircle className="h-4 w-4 text-gain-light flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <motion.a
        href="#"
        whileHover={prefersReduced ? {} : { scale: 1.03 }}
        transition={{ duration: 0.15 }}
        className="block text-center py-3 rounded-full font-bold text-sm btn-glow bg-cardinal-red hover:bg-cardinal-red-dark text-ivory"
      >
        Get Started
      </motion.a>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={prefersReduced ? {} : { y: -10, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
      transition={{ duration: prefersReduced ? 0 : 0.55, delay }}
      className="scale-[1.04] z-10"
    >
      <div className="animated-border shadow-2xl shadow-cardinal-red/15 rounded-2xl">
        {cardBody}
      </div>
    </motion.div>
  );
}
