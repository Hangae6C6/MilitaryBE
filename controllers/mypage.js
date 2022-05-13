const { Challenge, User, UserData } = require("../models");
const sequelize = require("sequelize");
const { or, and, like } = sequelize.Op;

//마이페이지 조회 GET
//썬더클라이언트 테스트 완료
const myPage = async (req, res) => {
    try {
        const {userId} = req.query
        const userchallenge = await Challenge.findOne({
            where:{
                userId:userId,
            }
        })
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
        const {userId} = req.query
        const userdata = await UserData.findAll({
            where:{
                userId:userId,
            }
        })
        return res.status(200).json({result:true,msg:"프로필 조회 성공",userdata});
    }catch(error) {
        console.log(error)
        console.log('mypage 프로필 조회하기 -> 여기서 오류발생함')
        res.status(400).json({result:false,msg:"프로필 조회 실패..."})
    }
};

//프로필 수정하기 PUT
//썬더클라이언트 수정 필요
const userProfilepatch = async (req, res) => {
    const {userId} = req.query
    const armyCategory = req.body.armyCategory
    const rank = req.body.rank
    const userdate = await UserData.findAll()
    try {
        
        await UserData.update({armyCategory:armyCategory,rank:rank},{
            where: {
                userId:userId,
                armyCategory:armyCategory,
                rank:rank,
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
//썬더클라이언트 테스트 완료
const myPageChallengeread = async (req,res) =>{
    const {challengeNum} = req.query
    const challengeTitle = req.body.challengeTitle
    const {userId} = res.locals.user
    const userchallenge = await Challenge.findAll()
    try {
        await Challenge.update({challengeTitle:challengeTitle},{
            where: {
                userId:userId,
                challengeNum:challengeNum,
            }
        })
        return res.status(200).json({userchallenge});
    }catch(error) {
        console.log(error)
        console.log('mypage.js 나의 챌린지 조회 -> 여기서 에러발생함')
        res.status(400).json({result:false,msg:"나의 챌린지 조회 실패..."})
    }
}



module.exports = { myPage,
    userProfileread,
    userProfilepatch,
    myPageChallengeread,
    // preTestread,
    // preTestpatch
 };