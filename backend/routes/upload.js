"use strict";
const express = require("express");
// const multer = require("multer");

// middlware
const { uploadImage, resizeImage } = require("../middleware/upload");

const router = express.Router();

router.post("/", uploadImage, resizeImage, (req, res) => {
  res.send({ file: req.file, thumbnail: req.thumbnail });
});

module.exports = router;
