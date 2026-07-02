import dotenv from "dotenv";

dotenv.config();

interface Config {
  main_port: number;
  api_key_grpc: string;
}

const config: Config = {
  main_port: Number(process.env.MAIN_PORT),
  api_key_grpc: String(process.env.API_KEY_GRPC),
};

export default config;
