"use strict";
const express = require("express");
const ComboDealController = require("../controllers/comboDeal.controller");
const router = express.Router();

router.get("/", ComboDealController.getComboProducts);
router.get("/:id", ComboDealController.getComboProductById);
router.post("/", ComboDealController.createComboProduct);

module.exports = router;
