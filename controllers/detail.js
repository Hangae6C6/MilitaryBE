const sequelize = require("sequelize");
const { Challenge, UserData, UserChallenge } = require("../models");
const { or, and, like, eq } = sequelize.Op;



// challengeNum:challenge[0].challengeNum,
const detailPage = async(req,res) => {
    const {challengeNum} = req.query;
    try {
    // console.log("1111111",req.body);
    // const { userId } = res.locals.user; 
    // const {challengeNum} = req.body;
    // console.log(challengeNum);
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

    
    
      


//눌렀을떄 디비에 저장이 되는건지 . 


//post 
// const ?? = async(req,res) => {

// };




// const detailRank = async(req,res) => {

// };

//챌린지 리스트(참여하고있는 사용자들 가져오기)
const userdetailPage = async(req,res)=> {
    try {
        const {userId} = req.query
        if (userId) {
            const challengeuser = await Challenge.findOne({attributes:['userId','challengeProgress'],where:{userId:userId}})
            const userdata = await UserData.findOne({attributes:['userId','armyCategory','rank'],where:{userId:userId}})
            res.status(200).json({result:true,msg:"일단 성공임",challengeuser,userdata})
        }else {
            res.status(400).json({result:false,msg:"안됨...."})    
        }
        
    }catch (error) {
        console.log(error, 'userdetail-> 여기서 에러발생함')
        res.status(400).json({result:false,msg:"내가 참여하고있는 챌린지 조회 실패"})
    }
}

const test = async(req,res)=> {
    const {userId,challengeTitle,challengeType} = req.body
    try {
        
        const test = await UserChallenge.create({userId,challengeTitle,challengeType})
        res.status(201).json({result:true,msg:"테스트 성공!",test})
    }catch (error) {
        console.log(error, 'test -> 여기서 에러났습니다.')
        res.status(400).json({result:false,msg:"테스트 에러입니다."})
    }
}
//인원수 limit ->  체크해주기 

// 참가할때마다 참가자 늘려주기 

module.exports = {detailPage,userdetailPage,test};


// detail 보내줄때
// var test2 = stepsStr.split("|");
//test2 = [{a:1,:b:2},{a:3,b:4}];


