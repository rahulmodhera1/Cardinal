"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { PricingCard } from "@/components/PricingCard";
import { pricingTiers } from "@/lib/pricing";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-navy-deep py-24">
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
        <p className="text-muted text-center mt-3 mb-10">
          Pause or cancel anytime. No lock-in.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-medium ${!annual ? "text-ivory-text" : "text-muted"}`}>
            Monthly
          </span>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <span className={`text-sm font-medium ${annual ? "text-ivory-text" : "text-muted"}`}>
            Annual{" "}
            <span className="font-mono text-gain-light text-xs ml-1">(Save 20%)</span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} annual={annual} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
