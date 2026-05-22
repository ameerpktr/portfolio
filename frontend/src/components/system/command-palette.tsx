"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

const actions = [
  { label: "Open Experience", target: "experience" },
  { label: "Open Operations", target: "operations" },
  { label: "Open Contact", target: "contact" }
];

export function CommandPalette() {
  const open = useUiStore((state) => state.commandOpen);
  const setOpen = useUiStore((state) => state.setCommandOpen);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  const jump = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60 p-4 backdrop-blur-xl" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            className="glass mx-auto mt-24 max-w-xl rounded-2xl p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-black/10 px-3 py-3 dark:border-white/10">
              <Search className="h-4 w-4 text-blue-800 dark:text-sky-300" />
              <span className="flex-1 text-sm text-black dark:text-white">Command palette</span>
              <button aria-label="Close command palette" onClick={() => setOpen(false)} className="text-black dark:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-2">
              {actions.map((action) => (
                <button key={action.target} onClick={() => jump(action.target)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-black transition hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
                  {action.label}
                  <span className="text-xs text-blue-800 dark:text-sky-300">Enter</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
