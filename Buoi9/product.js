const express = require("express");
const ProductController = require("../controllers/product_controler");

const router = express.Router();

router.get("/", ProductController.index);
router.get("/delete/:id", ProductController.delete);

module.exports = router;