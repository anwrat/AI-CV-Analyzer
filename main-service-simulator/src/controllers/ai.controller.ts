import type { Request, Response, NextFunction } from "express";
import { AnalyzerClient } from "../grpc/client.js";
import { uploadToS3 } from "../services/storage.service.js";

export class AIController {
  public static analyzeCV = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        jobTitle,
        jobDescription,
        requiredSkills,
        experienceLevel,
        extraContext = "",
      } = req.body;
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const fileKeys = await Promise.all(
        files.map((f) => uploadToS3(f.buffer, f.originalname)),
      );
      const analysisResponse = (await AnalyzerClient.analyzeCVs(
        jobTitle,
        jobDescription,
        JSON.parse(requiredSkills),
        Number(experienceLevel),
        extraContext,
        fileKeys,
      )) as any;
      return res.status(200).json(analysisResponse);
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  };
}
// import type { Request, Response, NextFunction } from "express";
// import { AnalyzerClient } from "../grpc/client.js";
// import { uploadToS3 } from "../services/storage.service.js";

// export class AIController {
//   public static analyzeCV = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       const {
//         jobTitle,
//         jobDescription,
//         requiredSkills,
//         experienceLevel,
//         extraContext = "",
//       } = req.body;
//       console.log({
//         requiredSkills,
//         type: typeof requiredSkills,
//         isArray: Array.isArray(requiredSkills),
//       });
//       const files = req.files as Express.Multer.File[];
//       if (!files || files.length === 0) {
//         return res.status(400).json({ message: "No files uploaded" });
//       }
//       const fileKeys = await Promise.all(
//         files.map((f) => uploadToS3(f.buffer, f.originalname)),
//       );
//       console.log(fileKeys);
//       const analysisResult = (await AnalyzerClient.analyzeCVs(
//         jobTitle,
//         jobDescription,
//         JSON.parse(requiredSkills),
//         Number(experienceLevel),
//         extraContext,
//         fileKeys,
//       )) as any;
//       console.log(analysisResult);
//       const formattedResult = analysisResult.results.map((item: any) => {
//         try {
//           return {
//             filename: item.fileName,
//             analysis: JSON.parse(item.result),
//             status: item.status,
//           };
//         } catch (parseErr) {
//           return {
//             filename: item.fileName,
//             analysis: item.result,
//             status: item.status,
//             error: item.error,
//           };
//         }
//       });
//       // console.log(formattedResult);
//       return res
//         .status(200)
//         .json({ message: "AI analysis complete", data: formattedResult });
//     } catch (err: any) {
//       console.error(err);
//       next(err);
//     }
//   };
// }
