import { JWT_LIFETIME, JWT_SECRET } from "@/config/env";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const creatJWT = ({ payload }: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_LIFETIME });
};

export const attachCookieToResponse = ({
  payload,
  res,
}: {
  payload: User;
  res: Response;
}) => {
  const token = creatJWT({ payload });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    signed: true,
  });
};

export const isTokenValid = (token: string) => jwt.verify(token, JWT_SECRET);
