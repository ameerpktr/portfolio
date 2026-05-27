"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/profile";
import { Section } from "@/components/ui/section";

export function AboutSection() {
  return (
    <Section id="about" eyebrow="About me" title="Fintech precision, operational impact.">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr] lg:gap-12">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
          <p className="max-w-xl text-justify text-[15px] sm:text-base font-medium leading-7 sm:leading-8 text-muted">
            Fintech Operations Associate with expertise in fraud detection, SEON monitoring, customer onboarding, AML/KYC compliance, billing operations, and payment workflows across ACH, wire, RTP, and check systems.
            Passionate about fintech technology, modern operational workflows, and scalable risk systems.
          </p>
          <p className="mt-6 max-w-xl text-justify text-[15px] sm:text-base font-medium leading-7 sm:leading-8 text-muted">
            With over 3 years of experience in data-intensive environments, I specialize in identifying anomalies and streamlining subscription lifecycles. My background includes managing 500+ daily transactions with a 99.9% accuracy rate, leveraging tools like Zoho Suite to ensure seamless CRM management and reporting. I thrive in fast-paced, high-pressure environments, consistently delivering operational excellence and driving 40% reductions in fraud-related incidents.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-4 sm:p-6"
            >
              <stat.icon className="mb-4 sm:mb-6 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <p className="font-display text-xl sm:text-3xl font-extrabold text-foreground">{stat.value}</p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm font-semibold leading-tight sm:leading-5 text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
