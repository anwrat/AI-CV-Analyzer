import type { Request, Response, NextFunction } from "express";
import { AnalyzerClient } from "../grpc/client.js";

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
      const filePaths = files.map((file) => file.path);
      const analysisResult = (await AnalyzerClient.analyzeCVs(
        jobTitle,
        jobDescription,
        extraContext,
        filePaths,
      )) as any;
      const formattedResult = analysisResult.results.map((item: any) => {
        try {
          return {
            filename: item.fileName,
            analysis: JSON.parse(item.result),
          };
        } catch (parseErr) {
          return {
            filename: item.fileName,
            analysis: item.result,
          };
        }
      });
      console.log(formattedResult);
      return res
        .status(200)
        .json({ message: "AI analysis complete", data: formattedResult });
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  };
}
