"use client";

import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { contactSchema, submitContact } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { socials } from "@/data/profile";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const mutation = useMutation({ mutationFn: submitContact });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form");
      return;
    }

    try {
      await mutation.mutateAsync(parsed.data);
      toast.success("Message sent. Ameer will respond soon.");
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send message");
    }
  };

  return (
    <Section id="contact" eyebrow="Future goals" title="Let's connect on fintech operations and risk strategy.">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="max-w-md text-sm sm:text-base font-medium leading-7 sm:leading-8 text-muted">Open to fintech operations roles, risk technology projects, and solving complex operational problems.</p>
          <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 text-sm sm:text-base font-semibold">
            <a href="mailto:ameerthanal123@gmail.com" className="flex items-center gap-3 sm:gap-4 text-muted transition hover:text-primary">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              ameerthanal123@gmail.com
            </a>
            <a href="tel:+919567622580" className="flex items-center gap-3 sm:gap-4 text-muted transition hover:text-primary">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              +91 95676 22580
            </a>
            <p className="flex items-center gap-3 sm:gap-4 text-muted">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              India
            </p>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            {socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-foreground transition hover:border-primary/50 hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <input className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} aria-hidden />
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            <label className="text-xs sm:text-sm font-bold text-muted">
              Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 sm:mt-3 h-11 sm:h-12 w-full rounded-xl border border-border bg-card px-4 sm:px-5 text-sm sm:text-base text-foreground outline-none transition focus:border-primary" />
            </label>
            <label className="text-xs sm:text-sm font-bold text-muted">
              Email
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 sm:mt-3 h-11 sm:h-12 w-full rounded-xl border border-border bg-card px-4 sm:px-5 text-sm sm:text-base text-foreground outline-none transition focus:border-primary" />
            </label>
          </div>
          <label className="block text-xs sm:text-sm font-bold text-muted">
            Company
            <input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} className="mt-2 sm:mt-3 h-11 sm:h-12 w-full rounded-xl border border-border bg-card px-4 sm:px-5 text-sm sm:text-base text-foreground outline-none transition focus:border-primary" />
          </label>
          <label className="block text-xs sm:text-sm font-bold text-muted">
            Message
            <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={5} className="mt-2 sm:mt-3 w-full resize-none rounded-xl border border-border bg-card p-4 sm:p-5 text-sm sm:text-base text-foreground outline-none transition focus:border-primary" />
          </label>
          <Button type="submit" disabled={mutation.isPending} className="mt-2 sm:mt-3 h-11 sm:h-12 w-full rounded-xl text-xs sm:text-sm font-bold">
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {mutation.isPending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </Section>
  );
}
