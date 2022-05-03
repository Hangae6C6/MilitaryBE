// const express = require('express')
// const router = express.Router()

// //스키마
// const User = require('../schemas/user')
// const Challengers = require('../schemas/challengers')

// //미들웨어
// const authMiddleWare = require('../middleware/authMiddleWare')

// //토큰
// const jwt = require('jsonwebtoken')
// const fs = require('fs')
// const myKey = fs.readFileSync(__dirname + "/../middleware/key.txt").toString()


// //마이페이지 조회
// router.get('/myPage',authMiddleWare, (req,res)=> {
//     try {
//         let challenges = await Challengers.find({}).sort({challengeDate:-1})
//         const users = await User.find({userId,userNick})
//         const Token = req.headers.authorization;
        
//         if (Token) {
//             //로그인 시 생기는 회원별 token 값
//             const logInToken = Token.replace('Bearer', '')
//             const token = jwt.verify(logInToken, myKey)
//             userId = token.userId
//         }
//         res.status(200).json({result:true,msg:"마이페이지 조회 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 조회 -> 여기서 오류발생함')
//         res.status(400).json({result:false,msg:"마이페이지조회 실패..."})
//     }
// })

// //프로필 조회
// router.get('/myPage/userProfile', authMiddleWare,(req,res)=> {
//     try {

//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"프로필 조회 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 프로필 조회하기 -> 여기서 오류발생함')
//         res.status(400).json({result:false,msg:"프로필 조회 실패..."})
//     }
// })

// //프로필 수정하기 query(userNum)
// router.patch('/myPage/userProfile',authMiddleWare,(req,res)=> {
//     try {
//         const {userNum} = req.query
//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"프로필 수정 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 프로필 수정하기 -> 여기서 오류발생함')
//         res.status(400).json({result:false,msg:"프로필 수정 실패..."})
//     }
// })

// //마이페이지 - 나의챌린지 조회 query(userNum)
// router.get('/mypage',authMiddleWare,(req,res)=> {
//     try {
//         const {userNum} = req.query
//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"나의 챌린지 조회 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 나의 챌린지 조회 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"나의 챌린지 조회 실패..."})
//     }
// })

// //마이페이지 - 나의목표페이지 조회 query(userNum)
// router.get('/mypage/preTest',authMiddleWare,(req,res)=> {
//     try {
//         const {userNum} = req.query
//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"나의 목표 조회 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 나의 목표 페이지 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"나의 목표페이지 조회 실패..."})
//     }
// })

// //마이페이지 - 나의목표페이지 수정
// router.patch('/mypage',authMiddleWare,(req,res)=> {
//     try {
//         const {userNum,stepNum} = req.query
//         const Token = req.headers.authorization;

//         await Challengers.updateOne({stepContent,isChecked})
//         res.status(200).json({result:true,msg:"나의목표페이지 수정 완료"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 나의 목표페이지 수정 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"나의목표페이지 수정 실패"})
//     }
// })

// module.exports = router