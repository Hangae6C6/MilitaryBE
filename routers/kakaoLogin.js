const express = require('express');
const router = express.Router();
const {kakaoLogin,kakaoRegister} = require("../controllers/kakao")




router.get("/kakao/login",kakaoLogin);

router.get("/kakao",kakaoRegister);


module.exports = router;