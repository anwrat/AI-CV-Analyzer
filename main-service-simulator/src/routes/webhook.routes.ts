import { Router } from "express";
import { WebHookController } from "../controllers/webhook.controller.js";

export const webHookRouter = Router();

webHookRouter.post("/analysis", WebHookController.getAnalysisResponse);
