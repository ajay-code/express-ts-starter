#!/usr/bin/env node

/**
 * Module dependencies.
 */
import "module-alias/register";
import "express-async-errors";
import app from "../app";
import debugServer from "debug";
import connectDB from "@/db/connect";
import http from "http";
import { HttpError } from "http-errors";
import { MONGO_URI, PORT } from "@/config/env";

const debug = debugServer("src:server");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Starter function
 */
const start = async () => {
  try {
    if (MONGO_URI) {
      await connectDB(MONGO_URI);
    }
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, onStart);
    server.on("error", onError);
    server.on("listening", onListening);
  } catch (error) {
    console.log(error);
  }
};

start();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}

function onStart() {
  const addr = server.address();
  if (typeof addr === "string") {
    console.log(`app listening at ${addr}`);
  } else {
    const port = addr?.port;
    console.log("app listening at http://localhost:%s", port);
  }
}
