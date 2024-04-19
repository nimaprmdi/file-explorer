import { compare, hash } from "bcryptjs";
import { Secret, verify } from "jsonwebtoken";

export interface UserPayload {
  email: string;
  // Other expected properties
}

export async function hasPassword(password: any) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function verifyToken(token: string, secretKey: Secret) {
  try {
    const result = verify(token, secretKey) as UserPayload;
    return Object.keys(result).length ? { email: result.email } : false;
  } catch (error: any) {
    console.log(error.message);
  }
}
