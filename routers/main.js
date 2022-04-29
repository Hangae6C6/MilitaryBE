const express = require("express");
const router = express.Router();
const {} = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.get("/main", (req, res) => {
  const {
    challengeNum,
    challengeProgress,
    challengeImage,
    challengeTitle,
    challengeType,
    challengeCnt,
    challengeViewCnt,
  } = req.body;
});

module.exports = router;
