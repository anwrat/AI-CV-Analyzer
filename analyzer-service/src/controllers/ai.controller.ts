import { AICVanalyse } from "../utils/ollama.js";
import { parsePDF } from "../utils/pdfparse.js";
import { normalizeText } from "../utils/normalizer.js";
import { buildPrompt } from "../utils/buildprompt.js";
import fs from "fs";

export class AIController {
  public static analyzeCV = async (call: any, callback: any) => {
    try {
      const {
        jobTitle,
        jobDescription,
        extraContext = "",
        filePaths,
      } = call.request;
      if (!filePaths || filePaths.length === 0) {
        return callback({ message: "No files selected for analysis" });
      }
      const results = [];
      for (const filePath of filePaths) {
        if (!fs.existsSync(filePath)) {
          continue;
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
        console.log(`Analysis result for ${filePath}: `, analysisResult);
        results.push({
          fileName: filePath.split("/").pop(),
          result: JSON.stringify(analysisResult),
        });
      }
      return callback(null, { results: results });
    } catch (err: any) {
      console.error(err);
      return callback({ message: err.message });
    }
  };
}
