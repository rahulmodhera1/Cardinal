"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CTABanner() {
  const prefersReduced = useReducedMotion();

  return (
    <section className={`relative py-28 overflow-hidden ${prefersReduced ? "bg-cardinal-red" : "cta-bg-animate"}`}>
      {/* Subtle radial glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.55 }}
          className="text-ivory font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)", letterSpacing: "-0.025em" }}
        >
          Your edge is waiting.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.55, delay: 0.12 }}
          className="text-ivory/80 text-xl max-w-xl mx-auto mt-5 leading-relaxed"
        >
          Join Cardinal and start running strategies that have already been
          proven through real market conditions.
        </motion.p>

        <motion.a
          href="#pricing"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.45, delay: 0.26 }}
          whileHover={prefersReduced ? {} : { scale: 1.05, y: -2 }}
          className="inline-block bg-ivory text-cardinal-red hover:bg-ivory-warm font-bold px-10 py-4 rounded-full text-lg mt-10 transition-all duration-200"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.25), 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          Get Access Now
        </motion.a>
      </div>
    </section>
  );
}
