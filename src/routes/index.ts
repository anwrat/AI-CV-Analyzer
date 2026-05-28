import type { Application } from "express";
import { fileRouter } from "./file.routes.js";

const routesSetup = (app: Application) => {
  app.use("/api/files", fileRouter);
};

export default routesSetup;
