const express = require("express");
//요청과 함께들어온 쿠키를 해석하여 곧바로 req.cookies 객체로 만든다.
const cookieParser = require("cookie-parser");
//폼 데이터 또는 AJAX 요청으로 온 POST데이터를 처리한다.
const bodyParser = require("body-parser");
const morgan = require("morgan"); // 요청과 응답에 대한 정보를 추가로 자세히 콘솔에 기록
const winston = require("winston");
//서버 요청관련 보안 hpp , helmet
const hpp = require("hpp");
const helmet = require("helmet");
//XSS(Cross Site Scripting)공격방어
const html = "<script>location.href = 'https://gilbut.co.kr'</script>";

const cors = require("cors");
const port = 3000;
const app = require("express")();
const http = require("http");
const { Server } = require("socket.io");
const logger = require("./logger");
const { sequelize } = require("./models");
const server = http.createServer(app);
const nodemailer = require("nodemailer");
const passport = require("passport");
const session = require("express-session");
const sanitizeHtml = require("sanitize-html");
console.log(sanitizeHtml(html));
app.use(cors());

// app.get("/api", (req, res) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "*"
//   );
//   res.send(data);
// });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const io = new Server(server, {
  cors:{
      origin:"http://localhost:3000",
      methods:["GET","POST"],
  },
})

io.on('connection', (socket)=> {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data)=> {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data)=> {
      socket.to(data.room).emit("receive_message",data)
  })

  socket.on("disconnect", ()=> {
      console.log("User Disconnected", socket.id)
  })
  socket.on("leave-room", (roomName, done) => {
      socket.leave(roomName); done();
      console.log('나 나갔어')
      // const rooms = getUserRooms();
      // if (!rooms.includes(roomName)) {
          io.emit("remove-room", roomName);
          console.log('방 삭제되었음')
      // }
  });
})

//라우터 불러오기
const userRouter = require("./routers/user");
const userdataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
const authNaverRouter = require("./routers/auth_naver");
const mypageRouter = require("./routers/mypage");
const kakaoRouter = require("./routers/kakaoLogin");
const calRouter = require("./routers/cal");
const detailRouter = require("./routers/detail");

// 접속 로그 남기기
const requestMiddleware = (req, res, next) => {
  console.log(
    "[Ip address]:",
    req.ip,
    "[method]:",
    req.method,
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date().toISOString()
  );
  next();
};

//각종 미들웨어
app.use(session({ secret: "solider challenge project" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// tiny 는 최소한의 로그 , combined는 좀 더 자세한 정보를 남길수있다.
app.use(morgan("combined")); // morgan http 로그 미들웨어 추가
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());


//라우터 연결
app.use("/api", [
  userRouter,
  authNaverRouter,
  userdataRouter,
  mainRouter,
  detailRouter,
  calRouter,
  mypageRouter,
  kakaoRouter,
]);

//서버 열기..
// http.listen(port, ()=> winston.info(`${port} 포트로 서버가 켜졌어요!`))
server.listen(3001, () => winston.info(`${port} 포트로 서버가 켜졌어요!`));
// app.listen(4000, ()=> winston.info('4000 포트로 서버가 켜졌어요!'))
