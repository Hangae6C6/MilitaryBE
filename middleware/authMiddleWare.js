const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const Token = req.headers.authorization;
  const logInToken = Token.replace("Bearer", "");
  try {
    const token = jwt.verify(logInToken);
    const userId = token.userId;

    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      res.locals.token = logInToken;
      next();
    });
  } catch (error) {
    console.log("사용자 인증 미들웨어 에러");
    console.log(error);
    res.status(401).json({ result: "토큰이 유효하지 않습니다." });
    return;
  }
};
