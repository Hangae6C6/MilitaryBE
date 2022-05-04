const { Challenge, User, UserData } = require("../models");
const sequelize = require("sequelize");
const { or, and, like } = sequelize.Op;

//마이페이지 조회 GET
//썬더클라이언트 테스트 완료
const myPage = async (req, res) => {
    try {
        const {userId} = req.query
        console.log(userId)
        // const {userId} = res.locals.user
        const userchallenge = await Challenge.findAll({userId})
        console.log(userchallenge)
        return res.status(201).json(userchallenge);
        
    }catch(error) {
        console.log(error)
        console.log('myPage 마이페이지 조회 기능 -> 여기서 오류발생함')
        res.status(400).json({result:false,msg:"마이페이지 조회 실패"})
    }
};

//프로필 조회 GET
//썬더클라이언트 테스트 완료
const userProfileread = async (req, res) => {
    try {
        const userdata = await UserData.findAll()
        return res.status(201).json(userdata);

        res.status(200).json({result:true,msg:"프로필 조회 성공"})
    }catch(error) {
        console.log(error)
        console.log('mypage 프로필 조회하기 -> 여기서 오류발생함')
        res.status(400).json({result:false,msg:"프로필 조회 실패..."})
    }
};

//프로필 수정하기 PATCH
//썬더클라이언트 테스트 완료
const userProfilepatch = async (req, res) => {
    try {
        const armyCategory = req.body.armyCategory
        const rank = req.body.rank
        const {userId} = res.locals.user
        const userdate = await UserData.findAll()
        await UserData.update({armyCategory:armyCategory,rank:rank},{
            where: {
                userId:userId,
            }
        })
        return res.status(201).json({result:true,msg:"프로필 수정 완료",userdate});

    }catch(error) {
        console.log(error)
        console.log('mypage.js 프로필 수정하기 -> 여기서 오류발생함')
        res.status(400).json({result:false,msg:"프로필 수정 실패..."})
    }
};

//마이페이지 - 나의챌린지 수정 query(userNum) PUT
const myPageChallengeread = async (req,res) =>{
    const {challengeNum} = req.query
    const challengeTitle = req.body.challengeTitle
    const {userId} = res.locals.user
    const userchallenge = await Challenge.findAll()
    try {
        await Challenge.update({challengeTitle:challengeTitle},{
            where: {
                userId:userId,
            }
        })
        return res.status(200).json(userchallenge);
    }catch(error) {
        console.log(error)
        console.log('mypage.js 나의 챌린지 조회 -> 여기서 에러발생함')
        res.status(400).json({result:false,msg:"나의 챌린지 조회 실패..."})
    }
}


// //마이페이지 - 나의목표페이지 조회 query(userNum) GET
// const preTestread = async (req, res) => {
//     try {
//         const {userNum} = req.query
//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"나의 목표 조회 성공",challengeTitle})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 나의 목표 페이지 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"나의 목표페이지 조회 실패..."})
//     }
// };

// //마이페이지 - 나의목표페이지 수정 query(userNum) PATCH
// const preTestpatch = async (req, res) => {
//     try {
//         const {userNum} = req.query
//         const Token = req.headers.authorization;

//         res.status(200).json({result:true,msg:"나의 목표 조회 성공"})
//     }catch(error) {
//         console.log(error)
//         console.log('mypage.js 나의 목표 페이지 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"나의 목표페이지 조회 실패..."})
//     }
// };

module.exports = { myPage,
    userProfileread,
    userProfilepatch,
    myPageChallengeread,
    // preTestread,
    // preTestpatch
 };