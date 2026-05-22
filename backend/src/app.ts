import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { apiRateLimit } from "./middleware/rate-limit.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { adminRouter } from "./routes/admin.routes.js";
import { contactRouter } from "./routes/contact.routes.js";
import { healthRouter } from "./routes/health.routes.js";

export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "50kb" }));
app.use(morgan("combined"));
app.use("/api", apiRateLimit);

app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);
