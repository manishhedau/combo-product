const path = require("path");

// image upload route
const imageUploadRoute = require("../routes/upload");

// product route
const ProductRoute = require("../routes/product.route");

// combo product route
const ComboProductRoute = require("../routes/comboDeal.route");

// middleware route
const error = require("../middleware/error");

const baseUrl = "/api/v1";

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Backend server is running!");
  });

  // products route
  app.use(baseUrl + "/products", ProductRoute);
  // products route
  app.use(baseUrl + "/combo-deals", ComboProductRoute);

  // image upload route
  app.use(baseUrl + "/upload", imageUploadRoute);

  // 404
  app.use(function (req, res, next) {
    res
      .status(404)
      .send({ isSuccess: false, status: 404, message: "Page Not Found" });
  });

  app.use(error);
};
