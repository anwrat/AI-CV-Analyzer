import type { Application } from "express";
import { fileRouter } from "./file.routes.js";
import { aiRouter } from "./ai.routes.js";
import { webHookRouter } from "./webhook.routes.js";

const routesSetup = (app: Application) => {
  app.use("/api/files", fileRouter);
  app.use("/api/ai", aiRouter);
  app.use("/webhook", webHookRouter);
};

export default routesSetup;
