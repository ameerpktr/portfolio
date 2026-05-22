"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience timeline" title="Operational timeline with measurable outcomes.">
      <div className="relative">
        <div className="absolute left-1 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/45 to-transparent" />
        <div className="space-y-5 pl-8">
          {experiences.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="absolute -left-[2.18rem] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-[0_0_0_6px_hsl(var(--primary)/0.12)]" />
              <div className="glass group rounded-xl p-6 transition duration-300 hover:border-primary/40">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold text-primary">{item.year}</p>
                    <h3 className="mt-3 font-display text-xl font-extrabold text-foreground">{item.role}</h3>
                    <p className="text-sm font-semibold text-muted">{item.company}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">Responsibilities</p>
                    <ul className="space-y-3 text-base text-muted">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">Key achievements</p>
                    <ul className="space-y-3 text-sm text-muted">
                      {item.wins.map((win) => (
                        <li key={win} className="rounded-xl border border-border bg-card-soft/70 p-4 text-foreground/85 dark:bg-white/[0.03]">
                          {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
