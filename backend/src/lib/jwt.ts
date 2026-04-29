import jwt, {type SignOptions} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ??
  "7d") as SignOptions["expiresIn"];

export type JwtPayload = {
  userId: string;
  role: string;
};

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
