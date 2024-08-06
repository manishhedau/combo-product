"use strict";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const app = express();

require("./startup/coreAndParser")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const server = app;

process.on("uncaughtException", function (err) {
  console.log("uncaughtException", { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("uncaughtException", { message: err.message, stack: err.stack });
  process.exit(1);
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}`);
});
