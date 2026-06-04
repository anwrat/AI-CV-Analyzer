import { Router } from "express";
import { FileController } from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

export const fileRouter = Router();

fileRouter.post("/unzip", upload.single("file"), FileController.unzipFile);
