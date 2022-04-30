const express = require("express");
const router = express.Router();
const { mainPage, userChallenge, myTcp } = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

router.get("/main/Challenge", authMiddleware, userChallenge);

router.post("/main/myTcp", myTcp);

module.exports = router;
