import {Request, Response, NextFunction} from "express";

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user?.role === "admin") {
    next();
    return;
  }
  res.status(403).json({error: "Forbidden"});
};

export const authorizeAdminOrSelf = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {user} = req;
  if (user?.role === "admin" || user?.userId === req.params.id) {
    next();
    return;
  }
  res.status(403).json({error: "Forbidden"});
};
