const express = require("express");
const router = express.Router();
const {
    detailPage,
    userdetailPage,
    test,
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 가져오기 기능
//썬더클라이언트 테스트 완료
router.get("/challengeDetail", authMiddleware, detailPage);

//챌린지 리스트 기능(참여하고있는 사용자들 가져오기)
//챌린지 1번(황인호,이성영,정대규,김태균 + 챌린지 진행 현황)
router.get('/userchallengeDetail', authMiddleware, userdetailPage)

//test
router.post('/userchallengeDetail', authMiddleware, test)

module.exports = router;
