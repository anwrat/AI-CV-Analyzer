import ollamaapi from "../config/axios.config.js";
import type { AnalysisOutput } from "../interfaces/analysis.interface.js";

export const AICVanalyse = async (prompt: string): Promise<AnalysisOutput> => {
  const response = await ollamaapi.post("/api/generate", {
    model: "gemma3:4b",
    stream: false,
    format: "json",
    think: false,
    prompt,
  });
  return response.data.response;
};
