const express = require("express");
const router = express.Router();
const {myPage,
    userProfileread,
    userProfilepatch,
    myPageChallengeread,
    myPageChallengetest,
} = require("../controllers/mypage");
const authMiddleware = require("../middleware/authMiddleWare");

//마이페이지 조회
//썬더클라이언트 테스트 완료
router.get("/myPage", authMiddleware, myPage);

//프로필 조회
//썬더클라이언트 테스트 완료
router.get("/myPage/userProfile", authMiddleware, userProfileread);

//프로필 수정하기
//썬더클라이언트 수정 필요
router.put("/myPage/userProfile", authMiddleware, userProfilepatch);

//마이페이지 - 사전결과테스트
router.get("/myPage/test", authMiddleware, myPageChallengetest);

//마이페이지 - 나의챌린지 수정 query(userNum)
//썬더클라이언트 테스트 완료
router.put("/myPage/userChallenge", authMiddleware, myPageChallengeread);

module.exports = router;