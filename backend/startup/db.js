const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to mongodb atlas !");
  });
};
