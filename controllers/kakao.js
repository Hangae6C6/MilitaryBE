const express = require('express');
const rp = require('request-promise');
const {User} = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { or, and, like, eq } = sequelize.Op;


const kakao = {
    clientid: `${process.env.CLIENTED}`, //REST API
    redirectUri	: 'http://localhost:3000/api/kakao'
}

// kakao login page URL --> HTML BUTTON CLICK --> ROUTER.KAKAOLOGIN

//router.get kakaoLogin
const  kakaoLogin = async (req,res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakao.clientid}&redirect_uri=${kakao.redirectUri}`
    res.redirect(kakaoAuthURL);
};

//router.get kakao
// kakao register --> REDIRECT URI
const kakaoRegister = async (req,res) => {

    const { code } = req.query;
    console.log("123213213213123",code);
    const options = {
        url : "https://kauth.kakao.com/oauth/token",
        method : 'POST',
        form: {
            grant_type: "authorization_code",
            client_id: kakao.clientid,
            redirect_uri: kakao.redirectUri,
            code: code
        },
        headers: {
            "content-type" : "application/x-www-form-urlencoded"
        },
        json: true
    }
    
   const kakaotoken = await rp(options);
   console.log("ttttttttt",kakaotoken);
   const options1 = {
        url : "https://kapi.kakao.com/v2/user/me",
        method : 'GET',
        headers: {
            Authorization: `Bearer ${kakaotoken.access_token}`,
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
        },
        json: true
    }
    const userInfo = await rp(options1);
    console.log("1111111111",userInfo);
   
    const userId = userInfo.id;
    const userNick = userInfo.kakao_account.profile.nickname;
    const existUser = await User.findAll({userId});

     console.log("--------->",existUser);


    //  const existUsers = await User.findAll({
    //       where: { [Op.eq]: [{ userId }, { userNick }] },
    //      });
     
    if(!existUser.length){
        const from = 'kakao'
        const user = new User({ userId, userNick, from })
        await User.create({ userId, userNick, from });
    }

    const loginUser = await User.findOne({userId});
    const token = jwt.sign({ userId : loginUser.userId }, `${process.env.KEY}`);

    res.status(200).json({
        token,
        userId,
        userNick
    });
};

module.exports = {kakaoLogin,kakaoRegister};