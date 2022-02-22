import express from "express";
import { StatusCodes } from "http-status-codes";
import authRoutes from "./authRouter";
import userRouter from "./usersRouter";

let router;
const apiRouter = (router = express.Router());

router.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.status(StatusCodes.OK).json({ msg: "json api v1" });
});

router.use("/auth", authRoutes);
router.use("/users", userRouter);

export default apiRouter;
