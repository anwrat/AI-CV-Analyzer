import type { Request, Response, NextFunction } from "express";
import { getSimpleResponse } from "../utils/ollama.js";

export class AIController {
  public static generateResponse = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { prompt } = req.body;
      const response = await getSimpleResponse(prompt);
      return res.status(200).json({ response });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
