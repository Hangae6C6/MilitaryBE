const express = require("express");
const router = express.Router();
const { mainPage } = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

module.exports = router;
