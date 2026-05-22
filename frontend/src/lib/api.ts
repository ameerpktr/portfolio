import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell Ameer a little more"),
  website: z.string().optional()
});

export type ContactValues = z.infer<typeof contactSchema>;

export const submitContact = async (values: ContactValues) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to send message");
  }

  return data;
};
