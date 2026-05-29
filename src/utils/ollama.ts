import ollamaapi from "../config/axios.config.js";

export const getSimpleResponse = async (prompt: string) => {
  const response = await ollamaapi.post("/api/generate", {
    model: "llama3.2",
    stream: false,
    prompt,
  });
  return response.data.response;
};
