const express = require("express");
const router = express.Router();
const {
    detailPage,
    detailJoin,
    detailJoinList,
    detailJoinout,
    detailSteps
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 가져오기 기능
//썬더클라이언트 테스트 완료
router.get("/challengeDetail", authMiddleware, detailPage);

//하나의 챌린지에 누가 참여하고있고 참여한 유저의 챌린지 진행현황 확인할수있는 기능
//썬더클라이언트 테스트 완료
router.post('/challengeJoin',authMiddleware, detailJoin);

//챌린지 참여한 유저 및 챌린지 진행 현황 확인 기능
//썬더클라이언트 테스트 완료
router.get('/challengeJoin',authMiddleware, detailJoinList);

//참여중인 챌린지 나가기
//썬더클라이언트 테스트 완료
router.delete('/challengeout',authMiddleware, detailJoinout);

router.post('/challengeStep',authMiddleware, detailSteps);

module.exports = router;
