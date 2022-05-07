const express = require("express");
const router = express.Router();
const {
  mainPage,
  userChallenge,
  preTest,
  search,
  openChallenge1,
} = require("../controllers/main");
const authMiddleware = require("../middleware/authMiddleWare");

router.get("/main", mainPage);

//회원님 참여 챌린지
router.get("/main/challenge", authMiddleware, userChallenge);

router.post("/main/preTest", authMiddleware, preTest);

router.get("/search", search);

//챌린지 개설
router.post("/challenge", authMiddleware, openChallenge1);



module.exports = router;
