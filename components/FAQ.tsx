"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/faq";

export function FAQ() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="faq" className="bg-navy-deep py-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          FAQ
        </p>
        <h2
          className="text-ivory-text font-bold text-center mb-12"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
        >
          Common questions, honest answers.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
