import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(1500),
  website: z.string().max(0).optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
