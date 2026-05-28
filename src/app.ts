import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import routesSetup from "./routes/index.js";

const app = express();

routesSetup(app);

app.use(errorHandler);

export default app;
