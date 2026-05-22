"use client";

import { motion } from "framer-motion";
import { myEdge } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function MyEdgeSection() {
  return (
    <Section id="edge" eyebrow="My Edge" title="The strengths that drive consistency and impact.">
      <div className="mb-12 max-w-3xl">
        <p className="text-base font-medium leading-8 text-muted">
          A blend of analytical thinking, operational discipline, and people focus that helps me deliver accurate results and lasting value in every engagement.
        </p>
      </div>
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {myEdge.map((edge, index) => (
          <motion.div
            key={edge.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="glass group rounded-[2rem] p-8 transition-all hover:border-primary/30"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:group-hover:text-black">
              <edge.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-foreground">{edge.title}</h3>
            <p className="mt-4 text-sm font-medium leading-7 text-muted">{edge.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
