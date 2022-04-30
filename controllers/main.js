const { Challenge } = require("../models");
const sequelize = require("sequelize");
const { or, and, like } = sequelize.Op;

//메인페이지 챌린지 보여주기 (회원, 비회원 구분X)
const mainPage = async (req, res) => {
  const challenge = await Challenge.findAll();
  return res.status(201).json(challenge);
};

//로그인한 회원의 챌린지 보여주기
const userChallenge = async (req, res) => {
  const userChallenge = res.locals;
  const challenge = await Challenge.findOne(userChallenge[0]);

  console.log(res.locals);
  return res.status(201).json(challenge);
};

//세부사항 수정 및 확인 필요
const myTcp = async (req, res) => {};

//검색기능
const search = async (req, res) => {
  let { keyword } = req.query;
  console.log(req.query);

  // if (!keyword.length) {
  //   return res.status(400).json("검색어를 입력해주세요.");
  // }

  const searchChallenge = await Challenge.findAll({
    where: {
      [or]: [
        { challengeTitle: { [like]: `%${keyword}%` } },
        { challengeType: { [like]: `%${keyword}%` } },
      ],
    },
  });
  if (searchChallenge.length === 0) {
    return res
      .status(401)
      .json({ message: "검색과 일치하는 챌린지가 없습니다." });
  }
  return res.status(201).json(searchChallenge);
};

module.exports = { mainPage, userChallenge, myTcp, search };
