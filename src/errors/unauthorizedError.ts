import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customAPIError";

class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
