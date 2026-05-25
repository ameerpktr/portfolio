"use client";

import { motion } from "framer-motion";

const skills = [
  "Fraud Detection", "SEON Monitoring", "Customer Onboarding", "AML/KYC Compliance",
  "Transaction Monitoring", "Billing Operations", "Risk Management", "Data Analytics",
  "Fintech Systems", "Operational Excellence", "Stripe", "Zoho Suite", "SQL", "Excel"
];

export function SkillTicker() {
  return (
    <div className="relative w-full h-12 flex items-center overflow-hidden">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center px-8">
            <span className="text-[#d97706] font-mono text-sm uppercase tracking-widest font-bold">
              {skill}
            </span>
            <span className="ml-8 text-white/20">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
