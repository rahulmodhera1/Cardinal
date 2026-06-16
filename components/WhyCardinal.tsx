"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

const problems = [
  "Watching charts for hours only to miss the entry",
  "Emotional decisions that override your own rules",
  "Strategies that work on paper, fail in real markets",
  "No time to monitor positions during market hours",
];

const solutions = [
  "Bots execute the moment your setup triggers — no hesitation",
  "Every strategy is backtested on historical data, then forward-tested live",
  "Subscribe to the bots that fit your market and risk tolerance",
  "Track performance transparently — we show you the drawdowns too",
];

export function WhyCardinal() {
  const prefersReduced = useReducedMotion();

  const slideIn = (direction: "left" | "right") => ({
    initial: { opacity: 0, x: prefersReduced ? 0 : direction === "left" ? -40 : 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: {
      duration: prefersReduced ? 0 : 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          The Problem with Manual Trading
        </p>
        <h2 className="text-navy font-bold text-center mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Stop guessing. Start executing.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Problems */}
          <motion.div {...slideIn("left")}>
            <div className="bg-ivory-warm rounded-2xl p-8">
              <h3 className="text-navy font-semibold text-xl mb-6">
                Manual trading is exhausting
              </h3>
              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-cardinal-red flex-shrink-0 mt-0.5" />
                    <span className="text-navy/80 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — Solutions */}
          <motion.div {...slideIn("right")}>
            <div className="bg-white border border-ivory-warm rounded-2xl p-8 shadow-sm">
              <h3 className="text-navy font-semibold text-xl mb-6">
                A systematic edge, running 24/5
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gain flex-shrink-0 mt-0.5" />
                    <span className="text-navy/80 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
