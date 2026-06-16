"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CTABanner() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cardinal-red py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.5 }}
          className="text-ivory font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          Your edge is waiting.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.12 }}
          className="text-ivory/80 text-xl max-w-xl mx-auto mt-5 leading-relaxed"
        >
          Join Cardinal and start running strategies that have already been
          proven through real market conditions.
        </motion.p>

        <motion.a
          href="#pricing"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.25 }}
          whileHover={prefersReduced ? {} : { scale: 1.04 }}
          className="inline-block bg-ivory text-cardinal-red hover:bg-ivory-warm font-semibold px-10 py-4 rounded-full text-lg mt-10 transition-colors duration-200"
        >
          Get Access Now
        </motion.a>
      </div>
    </section>
  );
}
