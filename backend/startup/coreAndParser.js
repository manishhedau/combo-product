const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

module.exports = function (app) {
  app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    // );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // const corsOptions = {
  //   origin: process.env.FRONTEND_URI,
  //   credentials: true, //access-control-allow-credentials:true
  //   optionSuccessStatus: 200,
  // };

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/images", express.static("uploads"));
};
