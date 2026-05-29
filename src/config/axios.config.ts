import axios from "axios";
import config from "../config/env.config.js";

const ollamaapi = axios.create({
  baseURL: `http://localhost:${config.ollama_port}`,
});

export default ollamaapi;
