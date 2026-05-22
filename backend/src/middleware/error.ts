import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger.js";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.path}`));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(422).json({
      ok: false,
      message: "Validation failed",
      details: error.flatten()
    });
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;

  if (statusCode >= 500) {
    logger.error(error);
  }

  return res.status(statusCode).json({
    ok: false,
    message: error.message || "Internal server error"
  });
};
