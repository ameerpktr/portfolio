"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function AchievementsSection() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Numbers that translate trust into momentum.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {achievements.map((achievement, index) => (
          <motion.div key={achievement.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -4 }} className="glass rounded-2xl p-8 text-center">
            <achievement.icon className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-6 font-display text-4xl font-extrabold text-primary">{achievement.value}</p>
            <p className="mt-2 text-sm font-semibold capitalize text-muted">{achievement.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
