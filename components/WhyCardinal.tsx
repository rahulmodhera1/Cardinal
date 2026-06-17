"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

const problems = [
  "Hours of screen time, and you still miss the entry.",
  "Emotional decisions that override your own rules.",
  "Strategies that test well on paper but fail in live markets.",
  "No time to monitor positions through the trading day.",
];

const solutions = [
  "Cardinal enters and exits automatically the moment its conditions are met.",
  "The strategy is built and backtested on historical market data.",
  "Every position is sized and protected with an automatic stop loss.",
  "Every trade is visible in full, so you retain complete oversight of your account.",
];

const cardHover = {
  rest: { y: 0, boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)" },
  hover: { y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(178,34,34,0.18), 0 0 0 1px rgba(178,34,34,0.45)" },
};

const cardHoverSolution = {
  rest: { y: 0, boxShadow: "0 0 0 1px rgba(178,34,34,0.20), 0 4px 24px rgba(0,0,0,0.4)" },
  hover: { y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 50px rgba(178,34,34,0.25), 0 0 0 1px rgba(178,34,34,0.55)" },
};

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
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 z-0 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          The Problem with Manual Trading
        </p>
        <h2 className="text-ivory-text font-bold text-center mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Stop guessing. Start executing.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Problems */}
          <motion.div {...slideIn("left")}>
            <motion.div
              initial="rest"
              whileHover={prefersReduced ? "rest" : "hover"}
              variants={cardHover}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="bg-navy-surface rounded-2xl p-8 h-full cursor-default"
              style={{ willChange: "transform" }}
            >
              <h3 className="text-ivory-text font-semibold text-xl mb-6">
                Manual trading is exhausting
              </h3>
              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-cardinal-red flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right — Solutions */}
          <motion.div {...slideIn("right")}>
            <motion.div
              initial="rest"
              whileHover={prefersReduced ? "rest" : "hover"}
              variants={cardHoverSolution}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="bg-navy-surface rounded-2xl p-8 h-full cursor-default"
              style={{ willChange: "transform", border: "1px solid rgba(178,34,34,0.20)" }}
            >
              <h3 className="text-ivory-text font-semibold text-xl mb-6">
                A systematic edge, every market day
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gain-light flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
