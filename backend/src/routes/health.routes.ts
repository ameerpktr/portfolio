import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ ok: true, data: { service: "ameer-portfolio-api", status: "healthy" } });
});
