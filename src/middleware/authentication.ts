import { UnauthenticatedError, UnauthorizedError } from "@/errors";
import { isTokenValid } from "@/utils/jwt";
import { Request, Response } from "express";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, _id, email, role } = isTokenValid(token) as User;
    req.user = { name, _id, email, role };
  } catch {
    console.log("error, invalid token");
    throw new UnauthenticatedError("invalid token");
  }
  next();
};

export const authorizePermissions =
  (...roles: string[]) =>
  (req: Request, res: Response, next: Function) => {
    const isAuthorized = roles.includes(req.user?.role as string);
    if (!isAuthorized) {
      throw new UnauthorizedError("Forbidden");
    }
    next();
  };
