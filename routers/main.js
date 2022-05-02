const express = require("express");
const router = express.Router();
const {
  mainPage,
  userChallenge,
  preTest,
  search,
} = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

router.get("/main/challenge", authMiddleware, userChallenge);

router.post("/main/preTest", authMiddleware, preTest);

router.get("/search", search);

module.exports = router;
