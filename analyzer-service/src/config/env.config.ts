import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  ollama_port: number;
}

const config: Config = {
  port: Number(process.env.PORT),
  ollama_port: Number(process.env.OLLAMA_PORT),
};

export default config;
