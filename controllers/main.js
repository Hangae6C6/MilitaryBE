const { Challenge, User } = require("../models");
const sequelize = require("sequelize");
const { or, and, like, eq } = sequelize.Op;

//메인페이지 챌린지 보여주기 라우터 (회원, 비회원 구분X)
const mainPage = async (req, res) => {
  const challenge = await Challenge.findAll();
  return res.status(201).json(challenge);
};

//로그인한 회원의 챌린지 현황 보여주기 라우터
//회원이 진행중인 모든 챌린지의 평균 진행률
const userChallenge = async (req, res) => {
  const { userId } = res.locals.user.dataValues;

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

// //챌린지 개설 -- 첼린지만 따로 controllers
const openChallenge = async (req, res) => {
  const { userId } = res.locals.user;
  const { challengeTitle, challengeType, challengeContent } = req.body;

  await Challenge.create({
    challengeTitle,
    challengeContent,
    challengeType,
    userId,
  });
  // joinchallenge -- max challengeNum? 내가 2번째 첼린지를 만들었다. 1번은 다른사람이 만들고 나는 2번이라는 첼린저를 만듬과 동시에 참여를하니까
  // 그래서 challengeNum 2번이라는 값이 필요할거같다.

  // await joinChallenge.create({ challengeNum,userId }).sort(-1);  -- 가장높은 값을 찾아야된다.

  res.status(201).json({
    result: true,
    msg: "첼린지개설완료",
  });
};

module.exports = { mainPage, userChallenge, preTest, search, openChallenge };
