const { UserData } = require("../models");

//회원 추가정보 입력 라우터
const userOptioalData = async (req, res) => {
  const { startDate, endDate, armyCategory, rank } = req.body;

  //DB에 사용자 추가 데이터 저장
  await UserData.create({ startDate, endDate, armyCategory, rank });
  res.status(201).send({});
};

module.exports = { userOptioalData };
