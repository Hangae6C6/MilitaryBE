const express = require("express");
const router = express.Router();
const { mainPage, userChallenge } = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

router.get("/main/Challenge", authMiddleware, userChallenge);

module.exports = router;
