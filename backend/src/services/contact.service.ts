import { prisma } from "../config/prisma.js";
import { sendContactEmail } from "./email.service.js";
import type { ContactInput } from "../schemas/contact.schema.js";

export const createContactMessage = async (
  input: ContactInput,
  context: { sourceIp?: string; userAgent?: string }
) => {
  const message = await prisma.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      company: input.company || null,
      message: input.message,
      sourceIp: context.sourceIp,
      userAgent: context.userAgent
    }
  });

  await sendContactEmail({
    name: input.name,
    email: input.email,
    company: input.company,
    message: input.message
  });

  return message;
};
