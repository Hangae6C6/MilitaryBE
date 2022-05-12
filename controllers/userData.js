const express = require("express");
const { UserData, User } = require("../models");

const userOptioalData = async (req, res) => {
  const { startDate, endDate, armyCategory, rank } = req.body;
  const { userId } = res.locals.user; //저장 

  // console.log(startDate, endDate, armyCategory, rank, req.body);

  //DB에 사용자 추가 데이터 저장
  // await UserData.create({ startDate, endDate, armyCategory, rank, userId }); 

  // 중복 회원이 추가데이터 있는 경우 update로 수정하는 로직으로 진행! (수정필요)
  const existUser = await UserData.findOne({
    userId
  });
 
  if ( existUser ) {
      await UserData.update(
          {
            startDate,endDate,armyCategory,rank
          }
          ,{where : { userId:userId} }
      )
  } else {
   const newexistUser = new UserData({startDate,endDate,armyCategory,rank,userId})
   await newexistUser.save();
  };

  res.status(201).json({
    result: true,
    msg: "회원정보추가완료",
  }); 
};

module.exports = { userOptioalData };

// SELECT `userId`, `userNick`, `userPw`, `userTestData`, `from`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`userId` = 'test10000';
  // 선택 : userId ,nick , pw, testdata , from ,cr, up -> FROM(어디로부터) -> Users로부터 조건이 User에 userId 
// INSERT INTO `UserData` (`userId`,`startDate`,`endDate`,`armyCategory`,`rank`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?,?,?);
   // 삽입 : UserData (`userId`,`startDate`,`endDate`,`armyCategory`,`rank`,`createdAt`,`updatedAt` )  7개 
// 에러가 난 이유 existUser.length  -> existUser로 바꾼이유 -> exisUser.length 로 쓸떄는 findAll 로 써서 existUser이 값을 찾아올수있었는데 

// 화면에서 회원이 추가정보를 입력을해 ->  이미 가입되어있는사람인데 정보를 수정하고싶어서 다시 수정하는사람들을 위한게 17~20번까지 그게 아니라면 신규유저 21~24까지 

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


