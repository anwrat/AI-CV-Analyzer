import type { Request, Response, NextFunction } from "express";
import { AnalyzerClient } from "../grpc/client.js";

export class FileController {
  public static unzipFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const filePath = req.file?.path;
      if (!filePath) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const result = await AnalyzerClient.uploadAndUnzip(filePath);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
