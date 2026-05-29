import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import routesSetup from "./routes/index.js";

const app = express();
app.use(express.json());

routesSetup(app);

app.use(errorHandler);

export default app;
