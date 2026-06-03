import type { Request, Response, NextFunction } from "express";
import { AICVanalyse } from "../utils/ollama.js";
import { parsePDF } from "../utils/pdfparse.js";
import { normalizeText } from "../utils/normalizer.js";
import { buildPrompt } from "../utils/buildprompt.js";

export class AIController {
  public static analyzeCV = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { jobTitle, jobDescription, extraContext = "" } = req.body;
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
        const prompt = buildPrompt(
          {
            jobTitle,
            jobDescription,
            cvContent: normalizedText,
          },
          extraContext,
        );
        const analysisResult = await AICVanalyse(prompt);
        console.log(analysisResult);
      }
      return res.status(200).json({ message: "AI analysis complete" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
