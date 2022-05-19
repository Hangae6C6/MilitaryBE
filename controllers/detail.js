const { transformAuthInfo } = require("passport");
const sequelize = require("sequelize");
const {Op} = require('sequelize')
const { Challenge, UserData, UserChallenge,ChallengeJoin,User } = require("../models");
const { or, and, like, eq } = sequelize.Op;



// challengeNum:challenge[0].challengeNum,
const detailPage = async(req,res) => {
    const {challengeNum} = req.query;
    try {
    if (challengeNum) {
        const detailChallenge = await Challenge.findOne({
            where :  {challengeNum : challengeNum},
        });
        res.status(200).json({  
            result: true,
            msg: "디테일페이지",
            challenge:detailChallenge,
          });
    }else {
        res.status(400).json({result:false,msg:"detail1 가져오기 실패..."})
    }   
    }catch (error) {
        console.log(error, "detail.js 가져오기 에서 오류남")
        res.status(400).json({result:false,msg:"detail2 가져오기 실패..."})
    }
};

    //  console.log(JSON.parse(detailChallenge.steps));
    // var ckCnt=0;
    // for(var i=0;i<detailChallenge.steps.length;i++){
    //     if(detailChallenge.steps[i].isChecked){
    //         ckCnt++;
    //     };
    // }
   //  console.log("2222222",ckCnt); 

    // console.log(detailChallenge.challengeCnt);
    
    // detailChallenge.challengeCnt = 5;
    // console.log(detailChallenge.challengeCnt);
    
    // 참여최대인원수가 6명 challengeLimitNum - challengeCnt = 남은자리  
    //   detailChallenge.a = 1;
    //   console.log(detailChallenge);
    const detailSteps = async(req,res) => {
       const {stepNum} = req.body;
       const {challengeNum,userId} = req.query;
       try{
          const challengeSteps = await ChallengeJoin.update()


       }catch(error) {
        console.log(error,'챌린지스탭스 오류')
        res.status(400).json({result:false,msg:"챌린지스탭스 실패"})
       };
    };
    

//하나의 챌린지에 누가 참여하고있고 참여한 유저의 챌린지 진행현황 확인할수있는 기능
//한챌린지에 여러명이 참여할수있고 , 한명이 다양한 챌린지를 참여할수있다.
//개설한 유저의 정보가 아니라 참여하고있는 유저의 정보가 필요하다.
const detailJoin = async(req,res) => {
    if (!res.locals.user) {
        res.status(401).json({
          result:false,msg:"로그인 후 사용하세요",
        })
        return
    }
    const {userId,challengeNum} = req.query //로그인하고있는 유저
    try {
        const existUsers = await ChallengeJoin.findOne({attributes:['userId'],where :{userId:userId}})
        //기존에 참여한 회원이 중복으로 재참여시 못드가게하려함
        // if (!existUsers) {
            const steps = await Challenge.findOne({attributes:['steps'],where:{userId:userId}})
            // console.log("1231231",steps.dataValues.steps);
            const challengejoin = await ChallengeJoin.create({userId,challengeNum,steps:steps.dataValues.steps})
            // steps:steps.dataValues.steps
            res.status(201).json({result:true,msg:"챌린지리스트 성공",challengejoin})
        // }else {
        //     res.status(400).json({result:false,msg:"이미 참여하고있는 챌린지입니다."})
        // }
        
    }catch(error) {
        console.log(error,'챌린지리스트 오류')
        res.status(400).json({result:false,msg:"챌린지리스트 실패"})
    }
};

//하나의 챌린지에 누가 참여하고있고 참여한 유저의 챌린지 진행현황 확인할수있는 기능 query=userId
//sequelize join 성공 중첩완료
const detailJoinList_id = async(req,res)=> {
    try {
        const {userId} = req.query
            //중첩하여 원하는 데이터 항목 추출 완료
            if (userId) {
                const joinlist_id = await ChallengeJoin.findAll({attributes:['userId','challengeNum','steps'],where:{userId:userId}})
                const onlychallengeNum = await ChallengeJoin.findAll({attributes:['challengeNum'],where:{userId:userId}})
                const onlychallengetable = await Challenge.findAll()
                const onlyusernick = await User.findAll()
                //challengeNum을 비교해서 include시킨다....?!
                let answer = [];
                for (let i = 0; i < onlychallengeNum.length; i++) {
                    for (let j = 0; j < onlychallengetable.length; j++) {
                        if (onlychallengeNum[i].challengeNum == onlychallengetable[j].challengeNum) {
                            answer.push(onlychallengetable[j])
                        }
                    }
                }
                let usernicklist = [];
                for (let i = 0; i < onlyusernick.length; i++) {
                    if (onlyusernick[i].userId == userId) {
                        usernicklist.push(onlyusernick[i].userNick)
                    }
                }
                let usernicklist1 = usernicklist.join()
                res.status(200).json({result:true,msg:"참여한 인원 조회 성공",joinlist_id,answer,usernicklist1})
            }else {
                res.status(400).json({result:false,msg:"참여한 인원 조회 실패"})        
            }
    }catch (error) {
        console.log(error, '참여한 인원 조회 실패...')
        res.status(400).json({result:false,msg:"참여한 인원 조회 실패"})
    }
}; 

//하나의 챌린지에 누가 참여하고있고 참여한 유저의 챌린지 진행현황 확인할수있는 기능 query=challengeNum
//sequelize join 성공 중첩완료
const detailJoinList_challengeNum = async(req,res)=> {
    
    try {
        const {challengeNum} = req.query
            // 중첩하여 원하는 데이터 항목 추출 완료
            if (challengeNum) {
                const joinlist_challengeNum = await ChallengeJoin.findAll({attributes:['userId','challengeNum','steps'],where:{challengeNum:challengeNum},
                include: {
                    model:User
                }
            })
                res.status(200).json({result:true,msg:"참여한 인원 조회 성공",joinlist_challengeNum})
            }else {
                res.status(400).json({result:false,msg:"참여한 인원 조회 실패!"})        
            }
    }catch (error) {
        console.log(error, '참여한 인원 조회 실패...')
        res.status(400).json({result:false,msg:"참여한 인원 조회 실패"})
    }
};

//참여하고있는 챌린지 나가기
//데이터 삭제 완료
const detailJoinout = async(req,res)=> {
    const {userId,challengeNum} = req.query
    try {
        const challengeout = await ChallengeJoin.destroy({where:{userId:userId,challengeNum:challengeNum}})
        res.status(200).json({result:true,msg:"챌린지 나가기 성공"})
    }catch (error) {
        console.log(error,'챌린지 나가기에서 오류남')
        res.status(400).json({result:false,msg:"챌린지 나가기 실패"})
    }
}

// const detailRank = async(req,res) => {

// };


//인원수 limit ->  체크해주기 

// 참가할때마다 참가자 늘려주기 

module.exports = {detailPage,detailJoin,detailJoinList_id,detailJoinList_challengeNum,detailJoinout,detailSteps};


// detail 보내줄때
// var test2 = stepsStr.split("|");
//test2 = [{a:1,:b:2},{a:3,b:4}];


