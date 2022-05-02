const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//회원가입 라우터
const signUp = async (req, res) => {
  const { userId, userPw, userPwCheck, userNick } = req.body;

  //비밀번호 최소 문자/숫자 포함하여 8자리 이상
  const pwdValidation = /^(?=.*[a-zA-Z])(?=.*\d)[\w]{8,}$/;

  if (!pwdValidation.test(userPw)) {
    res.status(400).send({
      errorMessage: "비밀번호는 문자+숫자 조합으로 8자리 이상 입력해주세요.",
    });
    return;
  }

  //비밀번호 일치 확인
  if (userPw !== userPwCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  //아이디, 닉네임 중복 확인
  const existUser = await User.findAll({
    where: {
      [Op.or]: [{ userId }, { userNick }],
    },
  });

  if (existUser.length) {
    res.status(400).send({
      errorMessage: "이미 가입된 아이디 또는 닉네임입니다.",
    });
    return;
  }

  //DB에 사용자 데이터 저장
  await User.create({ userId, userNick, userPw });
  res.status(201).send({});
};

//로그인 라우터
const login = async (req, res) => {
  const { userId, userPw } = req.body;
  const user = await User.findOne({ where: { userId, userPw } });
  //토큰 옵션 설정 - 유효기간 1일 설정
  const tokenOptions = { expiresIn: "1d", issuer: "soldierChallengers" };

  if (!user) {
    res.status(400).send({
      errorMessage: "아이디 또는 비밀번호가 잘못되었습니다.",
    });
    return;
  }

  const loginToken = jwt.sign(
    { userId: user.userId },
    process.env.SECRET_KEY,
    tokenOptions
  );
  res.send({
    loginToken,
    userId,
    msg: "로그인에 성공했습니다.",
  });
};

//로그인 확인 라우터
const loginCheck = async (req, res) => {
  try {
    const { user } = res.locals;
    res.json(user);
  } catch (err) {
    res.status(401).send("로그인 상태가 아닙니다. : ", err);
  }
};

module.exports = { signUp, login, loginCheck };
