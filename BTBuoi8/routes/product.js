const express = require("express");
const ProductController = require("../controllers/categorie_controller");

const router = express.Router();

router.get("/", ProductController.index);

module.exports = router;
