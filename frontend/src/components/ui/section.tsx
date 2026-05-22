import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-12 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-6xl border-t border-border pt-4">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
