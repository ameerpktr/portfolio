"use client";

import { motion } from "framer-motion";
import { myEdge } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function MyEdgeSection() {
  return (
    <Section id="edge" eyebrow="My Edge" title="The strengths that drive consistency and impact.">
      <div className="mb-8 sm:mb-12 max-w-3xl">
        <p className="text-sm sm:text-base font-medium leading-7 sm:leading-8 text-muted">
          A blend of analytical thinking, operational discipline, and people focus that helps me deliver accurate results and lasting value in every engagement.
        </p>
      </div>
      <div className="relative grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {myEdge.map((edge, index) => (
          <motion.div
            key={edge.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="glass group rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 transition-all hover:border-primary/30"
          >
            <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:group-hover:text-black">
              <edge.icon className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-foreground">{edge.title}</h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium leading-6 sm:leading-7 text-muted">{edge.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
