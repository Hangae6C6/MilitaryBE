const express = require("express");
const router = express.Router();
const {
  mainPage,
  userChallenge,
  preTest,
  search,
  openChallenge1,
  openChallenge2,
  openChallenge3,
  openChallenge4
} = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

//회원님 참여 챌린지
router.get("/main/challenge", authMiddleware, userChallenge);

router.post("/main/preTest", authMiddleware, preTest);

router.get("/search", search);

//챌린지 개설
router.post("/challenge1", authMiddleware, openChallenge1);
router.post("/challenge2", authMiddleware, openChallenge2);
router.post("/challenge3", authMiddleware, openChallenge3);
router.post("/challenge4", authMiddleware, openChallenge4);

module.exports = router;
