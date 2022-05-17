const express = require("express");
const router = express.Router();
const {
    detailPage,
    detailJoin,
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 가져오기 기능
//썬더클라이언트 테스트 완료
router.get("/challengeDetail", authMiddleware, detailPage);

router.post('/challengeJoin',authMiddleware, detailJoin)



module.exports = router;
