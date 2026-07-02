import type { Request, Response, NextFunction } from "express";

export class WebHookController {
  public static getAnalysisResponse = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const payload = req.body;
      console.dir(payload, {
        depth: null,
        colors: true,
      });
      return res.status(200).send("Analysis result received successfully");
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
