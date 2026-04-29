import {Request, Response, NextFunction} from "express";
import {getUserById, getUsers, blockUser} from "./users.service";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.json(await getUserById(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.json(await getUsers());
  } catch (error) {
    next(error);
  }
};

export const blockUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.json(await blockUser(req.params.id));
  } catch (error) {
    next(error);
  }
};
