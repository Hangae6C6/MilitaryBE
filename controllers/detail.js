const sequelize = require("sequelize");
const { Challenge } = require("../models");
const { or, and, like, eq } = sequelize.Op;



// challengeNum:challenge[0].challengeNum,
const detailPage = async(req,res) => {
    
    const { userId } = res.locals.user;
    const {challengeNum} = req.body;
    // console.log(challengeNum);

    const detailChallenge = await Challenge.findOne({
        where :  {challengeNum : challengeNum},
    });

     //console.log(JSON.parse(detailChallenge.steps));
    var ckCnt=0;
    for(var i=0;i<detailChallenge.steps.length;i++){
        if(detailChallenge.steps[i].isChecked){
            ckCnt++;
        };
    }
   console.log(ckCnt); 

    // console.log(detailChallenge.challengeCnt);
    
    // detailChallenge.challengeCnt = 5;
    // console.log(detailChallenge.challengeCnt);
    
    // 참여최대인원수가 6명 challengeLimitNum - challengeCnt = 남은자리  
    //   detailChallenge.a = 1;
    //   console.log(detailChallenge);
    


    
    


    //rank는 기본값을 false로 만들어주고 [t,t,t,t,t,f,f,f] 
    // 순위를 0으로 바꾼수 
    // isChecked t/f  

    // function 

    
    
      
    res.status(201).json({  
        result: true,
        Challenge:detailChallenge,
        msg: "디테일페이지",
      });
};

//눌렀을떄 디비에 저장이 되는건지 . 





// const detailRank = async(req,res) => {

// };




//인원수 limit ->  체크해주기 

// 참가할때마다 참가자 늘려주기 





module.exports = {detailPage};


// detail 보내줄때
// var test2 = stepsStr.split("|");
//test2 = [{a:1,:b:2},{a:3,b:4}];


