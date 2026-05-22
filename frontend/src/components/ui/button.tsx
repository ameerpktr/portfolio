import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
        variant === "primary" && "bg-primary text-white shadow-[0_12px_28px_rgba(8,120,86,0.22)] hover:-translate-y-0.5 hover:brightness-105 dark:text-black dark:shadow-[0_12px_28px_rgba(230,153,83,0.2)]",
        variant === "secondary" && "border border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/50 dark:bg-transparent",
        variant === "ghost" && "text-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
