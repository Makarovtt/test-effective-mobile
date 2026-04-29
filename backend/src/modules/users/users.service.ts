import {findUserById, findAllUsers, setUserBlocked} from "./users.repository";
import {AppError} from "../../lib/AppError";

const requireUser = async (id: string) => {
  const user = await findUserById(id);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const getUserById = (id: string) => requireUser(id);

export const getUsers = () => findAllUsers();

export const blockUser = async (id: string) => {
  await requireUser(id);
  return setUserBlocked(id);
};
