"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
  annual: boolean;
  delay?: number;
}

export function PricingCard({ tier, annual, delay = 0 }: PricingCardProps) {
  const prefersReduced = useReducedMotion();
  const price = annual ? tier.annualPrice : tier.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay }}
      className={`relative rounded-2xl p-8 flex flex-col ${
        tier.recommended
          ? "border-2 border-cardinal-red bg-navy-surface scale-[1.03] shadow-2xl shadow-cardinal-red/10"
          : "border border-navy-border bg-navy-surface"
      }`}
    >
      {tier.recommended && (
        <span className="absolute -top-3.5 right-6 bg-cardinal-red text-ivory text-xs font-mono px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-ivory-text font-bold text-xl mb-2">{tier.name}</h3>

      <div className="mb-6 mt-1" style={{ minHeight: "72px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tier.name}-${annual ? "annual" : "monthly"}`}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
          >
            <span className="font-mono text-5xl font-bold text-ivory-text">${price}</span>
            <span className="font-mono text-muted text-base ml-1">/mo</span>
            {annual && (
              <p className="font-mono text-xs text-gain-light mt-1">Billed annually</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {[
          { label: "Bots", value: tier.bots },
          { label: "Markets", value: tier.markets },
          { label: "Dashboard", value: tier.dashboard },
          { label: "Support", value: tier.support },
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
        className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
          tier.recommended
            ? "bg-cardinal-red hover:bg-cardinal-red-dark text-ivory"
            : "border border-navy-border text-ivory-text hover:border-cardinal-red"
        }`}
      >
        Get Started
      </motion.a>
    </motion.div>
  );
}
