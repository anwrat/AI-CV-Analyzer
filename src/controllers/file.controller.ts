import type { Request, Response, NextFunction } from "express";
import path from "path";
import { extractZipFile } from "../utils/zipExtractor.js";

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
      const fileExt = path.extname(req.file?.originalname!);
      if (fileExt === ".zip") {
        const outputDir = path.join(
          path.dirname(filePath),
          path.basename(filePath, ".zip"),
        );
        extractZipFile(filePath, outputDir);
      }
      return res
        .status(200)
        .json({ message: "File uploaded successfully", filePath });
    } catch (err) {
      next(err);
    }
  };
}
