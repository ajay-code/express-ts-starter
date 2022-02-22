import express from "express";
import logger from "morgan";
import path from "path";
import apiV1Router from "@/routes/api/v1";
import errorHandler from "@/middleware/errorHandler";
import notFound from "@/middleware/notFound";
import { NODE_ENV } from "@/config/env";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

if (NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// serving static files
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1", apiV1Router);

// catch 404
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
