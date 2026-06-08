import axios from "axios";
import type { AnalysisOutput } from "../interfaces/analysis.interface.js";
import config from "../config/env.config.js";
import { GoogleGenAI } from "@google/genai";

export const AICVanalyse = async (prompt: string): Promise<AnalysisOutput> => {
  if (config.service_type === "ollama") {
    const ollamaapi = axios.create({
      baseURL: `http://localhost:${config.ollama_port}`,
    });
    const response = await ollamaapi.post("/api/generate", {
      model: config.model,
      stream: false,
      format: "json",
      think: false,
      prompt,
    });
    return response.data.response;
  } else {
    const genai = new GoogleGenAI({
      apiKey: config.gemini_api_key,
    });
    const response = await genai.models.generateContent({
      model: config.model,
      contents: prompt,
    });
    console.log("Gemini response: ", response.text);
    return;
  }
};
