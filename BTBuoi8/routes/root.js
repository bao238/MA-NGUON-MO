const express = require("express");
const HomeController = require("../controllers/home_controller");

const router = express.Router();
router.get("/", HomeController.index);
router.get("/about", HomeController.about);

module.exports = router;
