const { Challenge, User } = require("../models");
const sequelize = require("sequelize");
const { or, and, like, eq } = sequelize.Op;

//공백 , 최소 , 최대 유효성체크 
// function strCheck(str,min,max,type){
//   const result = {result:true , msg:""};
//   if(str===undefined || str===null || str===""){
//     result=false;
//     msg=type+" 값이 공백입니다.";
//     return result;
//   }else if(str.length>max){
//     result=false;
//     msg=type+" 값이 최대 입력 값보다 큽니다.";
//     return result;
//   }else if(str.length<min){
//     result=false;
//     msg=type+" 값이 최소 입력 값보다 작습니다.";
//     return result;
//   }
//   return result;
// }


//메인페이지 챌린지 보여주기 라우터 (회원, 비회원 구분X)
const mainPage = async (req, res) => {
  const challenge = await Challenge.findAll();
  return res.status(201).json(challenge);
};

//로그인한 회원의 챌린지 현황 보여주기 라우터
//회원이 진행중인 모든 챌린지의 평균 진행률
const userChallenge = async (req, res) => {
  const { userId } = req.query;

  console.log(userId);
  const challenge = await Challenge.findAll({
    where: { userId: userId },
  });
  let sum = 0;
  for (let i = 0; i < challenge.length; i++) {
    sum += parseInt(challenge[i].dataValues.challengeProgress);
  }
  let totalChallengeProgress = Math.round(sum / challenge.length);
  // console.log("progressSum: ", sum);
  console.log("progressAvg: ", totalChallengeProgress);
  return res.status(201).json({ userId, totalChallengeProgress });
};

//사전 테스트 입력 라우터
const preTest = async (req, res) => {
  const userTestData = req.body;
  const { userId } = res.locals.user;

  //DB에 사용자 id에 따라 업데이트
  await User.update(userTestData, {
    where: {
      userId: userId,
    },
  });
  res.status(201).send({});
};

//검색기능 라우터
const search = async (req, res) => {
  let { keyword } = req.query;
  console.log(req.query);

  //검색어 없는 경우 예외처리
  if (!keyword.length) {
    return res.status(400).json("검색어를 입력해주세요.");
  }

  //검색어 입력시 타이틀/타입에서 해당 검색어로 검색
  const searchChallenge = await Challenge.findAll({
    where: {
      [or]: [
        { challengeTitle: { [like]: `%${keyword}%` } },
        { challengeType: { [like]: `%${keyword}%` } },
      ],
    },
  });

  //검색어와 일치하는 챌린지 없는 경우 예외처리
  if (searchChallenge.length === 0) {
    return res
      .status(401)
      .json({ message: "검색과 일치하는 챌린지가 없습니다." });
  }
  console.log("searchChallenge: ", searchChallenge);
  return res.status(201).json(searchChallenge);
};

// //챌린지 조건설정 1-1
const openChallenge1 = async (req, res) => {
  const { userId } = res.locals.user;
  const { challengeTitle } = req.body;
  
  await Challenge.create({
    challengeTitle,
    userId,
  });

  const challenge = await Challenge.findAll({
    order: [[ 'challengeNum','DESC' ]] //sort개념
  }) //challengeNum을 1-2로 넘겨주기위해 디비에서 빼옴
  // console.log("12312321123",challenge);
  res.status(201).json({
    challengeTitle,
    result: true,
    challengeNum:challenge[0].challengeNum,
    msg: "일단첼린지개설완료",
  });
};

// 챌린지 조건설정 1-2 참여인원(challengeCnt) , 시작일(challengeStartDt), 종료일(challengeEndDt)
const openChallenge2 = async (req,res) => {
  const { challengeCnt,challengeStartDt,challengeEndDt,challengeNum} = req.body;
  // console.log( req.body);

  await Challenge.update(
    {
    challengeCnt:challengeCnt,
    challengeStartDt:challengeStartDt,
    challengeEndDt:challengeEndDt,
    lastSavePage:2
  },
  {where: {challengeNum:challengeNum}}
  );
  res.status(201).json({
      result:true,
      challengeNum,
      msg : "인원,시작,종료일단넘어가면성공"
  });
};

//챌린지 조건설정 1-3 주제(type)
const openChallenge3 = async (req,res) => {
  const {challengeNum,challengeType} = req.body;

  await Challenge.update(
    {
    challengeType:challengeType,
    lastSavePage:3
  },
  {where: {challengeNum:challengeNum}}
  );
  res.status(201).json({
    result:true,
    challengeNum,
    msg : "타입일단넘어가면성공"
});
};


//챌린짖 조건설정 1-4(step)
const openChallenge4 = async (req,res) => {
    const {challengeNum,challengeStep} = req.body;
    console.log("test110",challengeStep);
    await Challenge.update(
      {
      challengeStep:challengeStep, // 배열로 challengeStep:[{step1,text},{step2,text}......] --> challengeStep[0].
      lastSavePage:4
    },
    {where: {challengeNum:challengeNum}}
    );
    
    const openChallengeArray = [];
    openChallengeArray.push(challengeStep)
    console.log("tetetet",openChallengeArray);
    


    res.status(201).json({
      result:true,
      challengeNum,
      msg : "스탭일단넘어가면성공"
  });
};

// 챌린지 개설하기를 눌렀는데 lastSavePage가 존재하는지 확인 1-1에서 취소하면 아예 취소되게
const findChallenge = async (req,res) => {
      
    

    
    
};

//챌린지 참여하기 기능(미들웨어 거쳐야함))
const joinChallenge = async (req, res) => {
  if (!res.locals.user) {
    res.status(401).json({
      result: false,
      msg: "로그인 후 사용하세요",
    });
    return;
  }
  try {
    const { user } = res.locals.user;
    const { userId } = req.query;
    const statusChallenge = await Challenge.findAll(
      { userId },
      {
        where: {
          userId: userId,
        },
      }
    );
    if (challengeparticipate) {
      await Challenge.update({}, {});
    }
    res.status(200).json({ result: true, msg: "챌린지 참여하기 성공" });
  } catch (error) {
    console.log(error);
    console.log("main.js 챌린지 참여하기 -> 여기서 오류발생함");
    res.status(400).json({ result: false, msg: "챌린지 참여 실패..." });
  }
};

//챌린지 참여하기 취소 기능(미들웨어 거쳐야함))
const joinCancelChallenge = async (req, res) => {
  if (!res.locals.user) {
    res.status(400).json({ result: false, msg: "로그인 후 사용하세요" });
  }
  try {
    const { userId } = req.query;

    await Challenge.delete();
    res.stauts(200).json({ result: true, msg: "챌린치 취소 성공" });
  } catch (error) {
    console.log(error);
    console.log("main.js 챌린치 참여하기 취소 -> 여기서 에러발생함");
    res.status(400).json({ result: false, msg: "챌린지 취소 실패" });
  }
};




module.exports = { mainPage, userChallenge, preTest, search, openChallenge1,openChallenge2,openChallenge3,openChallenge4,findChallenge };
