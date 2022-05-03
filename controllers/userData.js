const express = require("express");
const { UserData, User } = require("../models");

const userOptioalData = async (req, res) => {
  const { startDate, endDate, armyCategory, rank } = req.body;
  const { userId } = res.locals.user;

  console.log(startDate, endDate, armyCategory, rank);

  //DB에 사용자 추가 데이터 저장
  await UserData.create({ startDate, endDate, armyCategory, rank, userId });

  //중복 회원이 추가데이터 있는 경우 update로 수정하는 로직으로 진행! (수정필요)
  // const existUser = await UserData.findOne({

  // });
  // if ( existUser.length ) {
  //     existUser.updateOne(
  //         {startDate,endDate,armyCategory,rank}
  //     )
  // } else {
  //  const newexistUser = new UserData({startDate,endDate,armyCategory,rank})
  //  await newexistUser.save();
  // }

  res.status(201).json({
    result: true,
    msg: "회원정보추가완료",
  });
};

module.exports = { userOptioalData };

// const { UserData } = require("../models");
//  //회원 추가정보 입력 라우터
//  const userOptioalData = async (req, res) => {
//       const { startDate, endDate, armyCategory, rank } = req.body;
//       //DB에 사용자 추가 데이터 저장
//       await UserData.create({ startDate, endDate, armyCategory, rank });
//        res.status(201).send({}); };
//        module.exports = { userOptioalData };

// function dateCalc(A,B){
//     var startDate = new Date(A);
//     var endDate = new Date(B);
//     var dateGap = endDate.getTime() - startDate.getTime();
//     return Math.ceil(dateGap/(1000 * 60 * 60 * 24));
//   }

// var x  = dateCalc('2022-04-20' , '2022-05-20');
// console.log('군생활 일수-->',x);
// var today = new Date();
// var y = dateCalc( today, '2022-05-20');
// console.log('전역까지 남은 일수-->',y);
// var z = (x-y)/x*100;
// console.log('군생활 ',z,'%');
