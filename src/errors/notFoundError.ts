import CustomAPIError from "./customAPIError";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  constructor(message: string = "route not found") {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
