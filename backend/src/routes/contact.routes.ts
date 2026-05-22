import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { contactRateLimit } from "../middleware/rate-limit.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema } from "../schemas/contact.schema.js";

export const contactRouter = Router();

contactRouter.post("/", contactRateLimit, validateBody(contactSchema), submitContact);
