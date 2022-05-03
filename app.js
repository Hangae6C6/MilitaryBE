const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const helmet = require("helmet");
const morgan = require("morgan");
const winston = require("winston");

//라우터 불러오기
const userRouter = require("./routers/user");
const userDataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
// const detailRouter = require("./routers/detail");

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

//winston 라이브러리 사용하여 로그 남기기
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

//각종 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));

//라우터 연결
app.use("/api", [userRouter, userDataRouter, mainRouter]);

//서버 열기
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
