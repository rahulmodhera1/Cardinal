"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PricingCard } from "@/components/PricingCard";
import { pricingTiers } from "@/lib/pricing";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          Pricing
        </p>
        <h2
          className="text-ivory-text font-bold text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Simple pricing. No hidden fees.
        </h2>
        <p className="text-muted text-center mt-3 mb-8">
          Pause or cancel anytime. No lock-in.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
