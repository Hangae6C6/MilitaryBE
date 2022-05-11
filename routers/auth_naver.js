const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const passport = require('../passport/NaverStrategy')
dotenv.config()

const router = express.Router()

//네이버 로그인 하기
router.get('/naver',passport.authenticate('naver'))

//콜백 url
router.get('/oauth', passport.authenticate('naver',{
    sessiom:false,
    failureRedirect: "/",
}),
(req,res)=>{
    try {
        const token = createJwtToken(req.user._id);
        console.log("여긴 ok 잘됩니당")
        //쿠키로 토큰을 발급한 후 리다이렉트
        res.status(200).redirect("??")
    }catch (error) {
        console.log(error)
        console.log("auth_naver.js 콜백url -> 여기서 에러발생함")
        res.status(400).json({result:false,msg:"콜백 실패..."})
    }
}
)

export default router