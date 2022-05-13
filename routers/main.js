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

router.get("/main", mainPage); //회원 + 비회원 둘다 가능

//회원님 참여 챌린지
router.get("/main/challenge", authMiddleware, userChallenge); //회원만 가능

router.post("/main/preTest", authMiddleware, preTest); // 회원만 가능

router.post("/main/preTest", preTest); // 비회원도 가능 

router.get("/search", search);

//챌린지 개설
router.post("/challenge1", authMiddleware, openChallenge1);


module.exports = router;
