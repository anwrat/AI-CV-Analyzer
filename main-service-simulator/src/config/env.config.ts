import dotenv from "dotenv";

dotenv.config();

interface Config {
  main_port: number;
}

const config: Config = {
  main_port: Number(process.env.MAIN_PORT),
};

export default config;
