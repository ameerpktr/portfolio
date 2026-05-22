"use client";

import { motion } from "framer-motion";
import { Command, Download, Eye, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

const links = ["about", "experience", "operations", "contact"];

export function Navbar() {
  const setCommandOpen = useUiStore((state) => state.setCommandOpen);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
      className="absolute left-0 right-0 top-0 z-40 px-5 py-5 sm:px-8 lg:px-10"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link}`} className="text-sm font-bold capitalize text-foreground transition hover:text-primary">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Open command palette" className="rounded-full p-2 text-muted transition hover:bg-primary/10 hover:text-primary" onClick={() => setCommandOpen(true)}>
            <Command className="h-4 w-4" />
          </button>
          <button aria-label="Toggle theme" className="rounded-full p-2 text-muted transition hover:bg-primary/10 hover:text-primary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="/resume.docx" download="Ameer_M_Fintech_Operations_Resume.docx">
            <Button className="hidden h-11 rounded-lg px-6 text-sm sm:inline-flex">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
