import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants/keys";

export function signJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
