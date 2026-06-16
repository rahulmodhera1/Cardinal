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

  const cardBody = (
    <div
      className={`relative flex flex-col h-full p-8 ${
        tier.recommended
          ? "bg-navy-surface animated-border-inner"
          : "bg-navy-surface rounded-2xl border border-navy-border"
      }`}
    >
      {tier.recommended && (
        <span className="absolute -top-4 right-6 bg-cardinal-red text-ivory text-xs font-bold font-mono px-3 py-1 rounded-full shadow-lg shadow-cardinal-red/30">
          Most Popular
        </span>
      )}

      <h3 className="text-ivory-text font-bold text-xl mb-2">{tier.name}</h3>

      {/* Price with AnimatePresence transition */}
      <div className="mb-6 mt-1" style={{ minHeight: "76px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tier.name}-${annual ? "annual" : "monthly"}`}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            transition={{ duration: prefersReduced ? 0 : 0.22 }}
          >
            <span className="font-mono text-5xl font-bold text-ivory-text">${price}</span>
            <span className="font-mono text-muted text-base ml-1">/mo</span>
            {annual && (
              <p className="font-mono text-xs text-gain-light mt-1">Billed annually</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature rows */}
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
        className={`block text-center py-3 rounded-full font-bold text-sm transition-colors ${
          tier.recommended
            ? "btn-glow bg-cardinal-red hover:bg-cardinal-red-dark text-ivory"
            : "border border-navy-border text-ivory-text hover:border-cardinal-red hover:text-cardinal-red"
        }`}
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
      transition={{ duration: prefersReduced ? 0 : 0.55, delay }}
      className={tier.recommended ? "scale-[1.04] z-10" : ""}
    >
      {tier.recommended ? (
        /* Animated gradient border wraps recommended card */
        <div className="animated-border shadow-2xl shadow-cardinal-red/15 rounded-2xl">
          {cardBody}
        </div>
      ) : (
        cardBody
      )}
    </motion.div>
  );
}
