const express = require("express");
const router = express.Router();
const {myPage,
    userProfileread,
    userProfilepatch,
    myPageChallengeread,
    // preTestread,
    // preTestpatch,
} = require("../controllers/mypage");
const authMiddleware = require("../middleware/authMiddleWare");

//마이페이지 조회
//썬더클라이언트 테스트 완료
router.get("/myPage", authMiddleware, myPage);

//프로필 조회
//썬더클라이언트 테스트 완료
router.get("/myPage/userProfile", authMiddleware, userProfileread);

//프로필 수정하기
//썬더클라이언트 테스트 완료
router.put("/myPage/userProfile", authMiddleware, userProfilepatch);

//마이페이지 - 나의챌린지 수정 query(userNum)
router.put("/myPage/userChallenge", authMiddleware, myPageChallengeread);

// //나의 목표페이지 조회하기
// router.get("/mypage/preTest", authMiddleware, preTestread);

// //나의 목표페이지 수정하기
// router.patch("/mypage/preTest", authMiddleware, preTestpatch);

module.exports = router;