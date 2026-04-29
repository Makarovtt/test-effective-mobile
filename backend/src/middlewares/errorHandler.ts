import {Request, Response, NextFunction} from "express";
import {AppError} from "../lib/AppError";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({error: error.message});
    return;
  }
  res.status(500).json({error: "Internal server error"});
};
