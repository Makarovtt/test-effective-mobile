import {Request, Response, NextFunction} from "express";
import {registerSchema, loginSchema} from "./auth.schemas";
import {registerUser, loginUser} from "./auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({error: parsed.error.flatten()});
    return;
  }

  try {
    res.status(201).json(await registerUser(parsed.data));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({error: parsed.error.flatten()});
    return;
  }

  try {
    res.json(await loginUser(parsed.data));
  } catch (error) {
    next(error);
  }
};
