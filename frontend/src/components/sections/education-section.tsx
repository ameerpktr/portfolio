"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" title="Technical foundation and scientific grounding.">
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item, index) => (
          <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass flex gap-6 rounded-[2rem] p-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-extrabold text-foreground">{item}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-muted">Built analytical discipline, systems thinking, and a durable technical base for operational excellence.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
