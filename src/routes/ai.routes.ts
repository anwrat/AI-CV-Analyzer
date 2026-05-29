import { Router } from "express";
import { AIController } from "../controllers/ai.controller.js";

export const aiRouter = Router();

aiRouter.post("/generate", AIController.generateResponse);
