const { Challenge, User } = require("../models");
const sequelize = require("sequelize");
const { or, and, like } = sequelize.Op;

//메인페이지 챌린지 보여주기 라우터 (회원, 비회원 구분X)
const mainPage = async (req, res) => {
  const challenge = await Challenge.findAll();
  return res.status(201).json(challenge);
};

//로그인한 회원의 챌린지 현황 보여주기 라우터 => 어떤 챌린지 보여줄지?
const userChallenge = async (req, res) => {
  const userChallenge = res.locals;
  const challenge = await Challenge.findOne(userChallenge[0]);

  console.log(res.locals);
  return res.status(201).json(challenge);
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



// //챌린지 개설 -- 첼린지만 따로 controllers 
const openChallenge = async (req, res) => {
  const { userId } = res.locals.user;
  const { challengeTitle, challengeType, challengeContent } = req.body;
   
  
  await Challenge.create({ challengeTitle, challengeContent, challengeType, userId }) 
  // joinchallenge -- max challengeNum? 내가 2번째 첼린지를 만들었다. 1번은 다른사람이 만들고 나는 2번이라는 첼린저를 만듬과 동시에 참여를하니까
  // 그래서 challengeNum 2번이라는 값이 필요할거같다. 
  
  // await joinChallenge.create({ challengeNum,userId }).sort(-1);  -- 가장높은 값을 찾아야된다. 

 res.status(201).json({
   result: true,
   msg: "첼린지개설완료"
 });
};

//챌린지 참여하기 기능(미들웨어 거쳐야함))
const joinChallenge = async(req,res)=> {
  if (!res.locals.user) {
    res.status(401).json({
      result:false,msg:"로그인 후 사용하세요",
    })
    return
  }
  try {
    const {user} = res.locals.user
    const {userId} = req.query
    const statusChallenge = await Challenge.findAll({userId}, {
      where:{
        userId:userId,
      }
    })
    if (challengeparticipate) {
      await Challenge.update({},{})
    }
    res.status(200).json({result:true,msg:"챌린지 참여하기 성공"})
  }catch(error) {
    console.log(error)
    console.log('main.js 챌린지 참여하기 -> 여기서 오류발생함')
    res.status(400).json({result:false,msg:"챌린지 참여 실패..."})
  }
}


//챌린지 참여하기 취소 기능(미들웨어 거쳐야함))
const joinCancelChallenge = async(req,res)=> {
  if (!res.locals.user){
    res.status(400).json({result:false,msg:"로그인 후 사용하세요"})
  }
  try {
    const {userId} = req.query
    
    await Challenge.delete()
    res.stauts(200).json({result:true,msg:"챌린치 취소 성공"})
  }catch(error) {
    console.log(error)
    console.log('main.js 챌린치 참여하기 취소 -> 여기서 에러발생함')
    res.status(400).json({result:false,msg:"챌린지 취소 실패"})
  }

}

module.exports = { mainPage, userChallenge, preTest, search, openChallenge };
