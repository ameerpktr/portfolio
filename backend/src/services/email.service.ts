import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const sendContactEmail = async (payload: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}) => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: env.MAIL_TO,
    replyTo: payload.email,
    subject: `Portfolio inquiry from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company || "N/A"}\n\n${payload.message}`
  });

  return { skipped: false };
};
