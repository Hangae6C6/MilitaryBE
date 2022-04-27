const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
const port = 3000;

//라우터 불러오기
const userRouter = require("./routers/user");
const userdataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
const detailRouter = require("./routers/detail");

nunjucks.configure("views", {
  express: app,
  watch: true,
});
//시퀄라이즈를 싱크해줘야 데이터베이스에 연결이 됨
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

//접속 로그 남기기
const requestMiddleware = (req, res, next) => {
  console.log(
    "[Ip address]:",
    req.ip,
    "[method]:",
    req.method,
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date()
  );
  next();
};

//각종 미들웨어
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));

//라우터 연결
app.use("/api", [userRouter, userdataRouter, mainRouter, detailRouter]);

//서버 열기
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
