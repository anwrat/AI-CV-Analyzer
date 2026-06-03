import { Router } from "express";
import { AIController } from "../controllers/ai.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

export const aiRouter = Router();

aiRouter.post("/analyze-cv", upload.array("file"), AIController.analyzeCV);
