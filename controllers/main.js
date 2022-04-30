const { Challenge } = require("../models");

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

//세부사항 확인 필요
// const myTcp = async (req, res) => {
//   const {hasTarget, } = req.body;
// }

module.exports = { mainPage, userChallenge, myTcp };
