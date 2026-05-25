"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";

export function ResumeModal() {
  const { resumeOpen, setResumeOpen } = useUiStore();

  return (
    <AnimatePresence>
      {resumeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResumeOpen(false)}
            className="absolute inset-0 bg-background/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-8 py-5">
              <div>
                <h2 className="font-display text-xl font-extrabold text-foreground">Ameer_M_Resume.pdf</h2>
                <p className="text-xs font-medium text-muted">Fintech Operations Professional</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="/resume.docx" download="Ameer_M_Fintech_Operations_Resume.docx">
                  <Button variant="secondary" className="h-10 rounded-xl px-5 text-xs">
                    <Download className="h-4 w-4" />
                    Download DOCX
                  </Button>
                </a>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white dark:group-hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Resume Content (Object) */}
            <div className="flex-1 overflow-hidden bg-muted/30 p-4">
              <div className="mx-auto h-full w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                <object
                  data="/resume.pdf"
                  type="application/pdf"
                  className="h-full w-full"
                >
                  <p>Your browser does not support PDFs. <a href="/resume.pdf">Download the PDF</a> instead.</p>
                </object>
              </div>
            </div>

            {/* Footer / Hint */}
            <div className="border-t border-border bg-card-soft/50 px-8 py-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Scroll to view all 2 pages</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
