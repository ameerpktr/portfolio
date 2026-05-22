import type { Request, Response } from "express";
import { AppError } from "../middleware/error.js";
import { createContactMessage } from "../services/contact.service.js";

export const submitContact = async (req: Request, res: Response) => {
  if (req.body.website) {
    throw new AppError(400, "Spam detected");
  }

  const message = await createContactMessage(req.body, {
    sourceIp: req.ip,
    userAgent: req.headers["user-agent"]
  });

  res.status(201).json({
    ok: true,
    data: { id: message.id },
    message: "Message received. Ameer will respond soon."
  });
};
