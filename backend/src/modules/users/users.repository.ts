import prisma from "../../lib/prisma";

const publicFields = {
  id: true,
  fullName: true,
  birthDate: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
} as const;

export const findUserById = (id: string) =>
  prisma.user.findUnique({where: {id}, select: publicFields});

export const findAllUsers = () => prisma.user.findMany({select: publicFields});

export const setUserBlocked = (id: string) =>
  prisma.user.update({
    where: {id},
    data: {isActive: false},
    select: publicFields,
  });
