import {Prisma} from "@prisma/client";
import prisma from "../../lib/prisma";
import {hashPassword, comparePasswords} from "../../lib/hash";
import {signToken} from "../../lib/jwt";
import {AppError} from "../../lib/AppError";
import type {RegisterDto, LoginDto} from "./auth.schemas";

export const registerUser = async (dto: RegisterDto) => {
  const password = await hashPassword(dto.password);

  try {
    return await prisma.user.create({
      data: {
        fullName: dto.fullName,
        birthDate: dto.birthDate,
        email: dto.email,
        password,
        role: dto.role,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError("Email already in use", 409);
    }
    throw error;
  }
};

export const loginUser = async (dto: LoginDto) => {
  const user = await prisma.user.findUnique({where: {email: dto.email}});

  if (!user || !(await comparePasswords(dto.password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is blocked", 403);
  }

  return {token: signToken({userId: user.id, role: user.role})};
};
