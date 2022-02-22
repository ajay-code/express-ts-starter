import { login, logout, register } from "@/controllers/authController";
import express from "express";

let r;
const authRouter = (r = express.Router());

r.route("/register").post(register);
r.route("/login").post(login);
r.route("/logout").get(logout);

export default authRouter;
