import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export function signToken(userId: string) {
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret) as { userId: string };
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
}
