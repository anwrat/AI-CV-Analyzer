import type { Request, Response, NextFunction } from "express";
import { getSimpleResponse } from "../utils/ollama.js";
import { parsePDF } from "../utils/pdfparse.js";
import { normalizeText } from "../utils/normalizer.js";

export class AIController {
  public static generateResponse = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { prompt } = req.body;
      const response = await getSimpleResponse(prompt);
      return res.status(200).json({ response });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public static analyzeCV = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const results = [];
      for (const file of files) {
        const filePath = file.path;
        if (!filePath) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        const parsedText = await parsePDF(filePath);
        const normalizedText = normalizeText(parsedText);
        results.push({ fileName: file.originalname, content: normalizedText });
      }
      console.log(results);
      return res.status(200).json({ message: "Data parsed from CV" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
