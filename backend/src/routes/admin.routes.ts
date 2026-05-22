import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export const adminRouter = Router();

adminRouter.use(requireAuth);

adminRouter.get("/overview", (_req, res) => {
  res.json({
    ok: true,
    data: {
      modules: ["projects", "blog", "contactMessages", "analytics"],
      status: "admin architecture ready"
    }
  });
});
