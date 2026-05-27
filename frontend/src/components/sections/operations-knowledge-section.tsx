"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { operationsKnowledge } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function OperationsKnowledgeSection() {
  return (
    <Section id="operations" eyebrow="Operations Knowledge" title="Specialized operational knowledge applied to fintech.">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {operationsKnowledge.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass group rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 transition-colors hover:border-primary/30"
          >
            <div className="mb-6 sm:mb-8 flex items-center gap-4 sm:gap-5">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:group-hover:text-black">
                <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-foreground">{item.title}</h3>
            </div>
            
            <p className="mb-6 sm:mb-8 text-sm sm:text-base font-medium leading-relaxed text-muted">
              {item.description}
            </p>

            <ul className="space-y-4">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-3 sm:gap-4 text-sm font-semibold leading-6 text-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
