import {Request, Response, NextFunction} from "express";
import {verifyToken} from "../lib/jwt";
import prisma from "../lib/prisma";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({error: "Unauthorized"});
    return;
  }

  try {
    const token = authHeader.slice(7);
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {id: payload.userId},
      select: {isActive: true},
    });

    if (!user?.isActive) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    req.user = payload;
    next();
  } catch {
    res.status(401).json({error: "Invalid token"});
  }
};
