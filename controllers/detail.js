const { transformAuthInfo } = require("passport");
const sequelize = require("sequelize");
const { Challenge, UserData, UserChallenge,ChallengeJoin } = require("../models");
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
            Challenge:detailChallenge,
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
    


    
    // 만든거 db에 쌓일수 있게끔?


    //rank는 기본값을 false로 만들어주고 [t,t,t,t,t,f,f,f] 
    // 순위를 0으로 바꾼수 
    // isChecked t/f  
    // function 

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
        console.log(userId,challengeNum)
        await ChallengeJoin.create({userId,challengeNum})
        res.status(201).json({result:true,msg:"챌린지리스트 성공"})
    }catch(error) {
        console.log(error,'챌린지리스트 오류')
        res.status(400).json({result:false,msg:"챌린지리스트 실패"})
    }
}



// const detailRank = async(req,res) => {

// };


//인원수 limit ->  체크해주기 

// 참가할때마다 참가자 늘려주기 

module.exports = {detailPage,detailJoin};


// detail 보내줄때
// var test2 = stepsStr.split("|");
//test2 = [{a:1,:b:2},{a:3,b:4}];


