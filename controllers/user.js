const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// 회원가입
const signUp = async (req, res) => {
  const { userId, userPw, userNick, userPwCheck } = req.body;
  console.log(userId, userPw, userNick, userPwCheck);

  // Validation Check
  let userNickReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,15}$/; //2~15자 한글,영문,숫자
  let userPwReg = /^(?=.*[a-zA-Z])(?=.*\d)[\w]{8,}$/; //4~15자 영문+숫자

  const existUsers = await User.findAll({
    where: { [Op.or]: [{ userId }, { userNick }] },
  });
  console.log(existUsers);

  if (userId === "" || userId === undefined || userId === null) {
    res.status(400).send({
      errorMessage: "아이디를 입력하세요.",
    });
    return;
  } else if (userNick === "" || userNick === undefined || userNick === null) {
    res.status(400).send({
      errorMessage: "닉네임을 입력하세요.",
    });
    return;
  } else if (!userNickReg.test(userNick)) {
    res.status(400).send({
      errorMessage: "닉네임은 2~15자, 한글,영문 및 숫자만 가능합니다.",
    });
    return;
  } else if (existUsers.length) {
    res.status(400).send({
      errorMessage: "이미 가입된 아이디 또는 닉네임 입니다.",
    });
    return;
  } else if (userPw === "" || userPw === undefined || userPw === null) {
    res.status(400).send({
      errorMessage: "비밀번호를 입력하세요.",
    });
    return;
  } else if (
    userPwCheck === "" ||
    userPwCheck === undefined ||
    userPwCheck === null
  ) {
    res.status(400).send({
      errorMessage: "비밀번호 확인란을 입력하세요.",
    });
    return;
  } else if (!userPwReg.test(userPw)) {
    res.status(400).send({
      errorMessage: "4~15자, 영문 및 숫자만 가능합니다.",
    });
    return;
  }

  // bcrypt module -> 암호화
  // 10 --> saltOrRound --> salt를 10번 실행 (높을수록 강력)
  const from = "webSite";
  const hashed = await bcrypt.hash(userPw, 10);
  // const user = new User({ userId, userNick, userPw : hashed, from})
  await User.create({ userId, userNick, userPw : hashed, from });
  res.status(200).json({
    result: "true",
    msg: "회원가입성공",
  });
};

// 로그인
const login = async (req, res) => {
  const { userId, userPw } = req.body;
  // console.log(req); // { userId: 'test0007', userPw: 't12345678' }
  
  const user = await User.findOne({ where: { userId:userId } });
  console.log("user--->",user);
  const tokenOptions = { expiresIn: "1d", issuer: "soldierChallengers" }; // 토큰옵션
   
  // body passowrd = unHashPassword -->true
  const unHashPw = await bcrypt.compareSync(userPw, user.userPw);
  
  if(user.userId !== userId || unHashPw===false) {
    res.status(401).json({
        msg:"아이디 혹은 비밀번호가 안맞습니다."
    })
  };

  // if (!user) {
  //   res.status(400).json({
  //     errorMessage: "아이디 또는 비밀번호를 확인해주세요.",
  //   });
  //   return;
  // }

  const loginToken = jwt.sign(
    { userId: user.userId },
    process.env.KEY,
    tokenOptions
  );
  console.log(loginToken);
  res.json({
    loginToken,
    userId,
    msg: "로그인에 성공했습니다.",
  });
};

// 로그인체크
const loginCheck = async (req, res) => {
  const { user } = res.locals;
  res.status(200).json({
    user,
  });
};

module.exports = { signUp, login, loginCheck };
