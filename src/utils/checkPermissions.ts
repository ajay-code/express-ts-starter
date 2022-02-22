import { Types } from "mongoose";
import { UnauthorizedError } from "@/errors";

const checkPermissions = (
  requestUser: User,
  resourceUserId: Types.ObjectId
) => {
  if (requestUser.role === "admin") return;

  if (requestUser._id === resourceUserId.toString()) return;

  throw new UnauthorizedError("forbidden");
};

export default checkPermissions;
