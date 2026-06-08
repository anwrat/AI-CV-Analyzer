import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  service_type: string;
  model: string;
  ollama_port: number;
  gemini_api_key: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  service_type: String(process.env.SERVICE_TYPE),
  model: String(process.env.MODEL),
  ollama_port: Number(process.env.OLLAMA_PORT),
  gemini_api_key: String(process.env.GEMINI_API_KEY),
};

export default config;
