import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "./error.js";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new AppError(401, "Authentication required");
  }

  try {
    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
};
