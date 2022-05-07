const express = require("express");
//요청과 함께들어온 쿠키를 해석하여 곧바로 req.cookies 객체로 만든다.
const cookieParser = require("cookie-parser");
//폼 데이터 또는 AJAX 요청으로 온 POST데이터를 처리한다.
const bodyParser = require("body-parser");
const morgan = require("morgan"); // 요청과 응답에 대한 정보를 추가로 자세히 콘솔에 기록
const winston = require("./config/winston");
const helmet = require("helmet");
const cors = require("cors");
const port = 3000;
const socketIo = require("socket.io");
const logger = require("./logger");
const { sequelize } = require("./models");
// const {Server} = require('socket.io')
// const env = require('./env')
// const configurePassport = require('./passport')
const fs = require("fs");
const http = require("http");
const https = require("https");
const httpProt = 3000;
const httpsPort = 443;

const privateKey = fs.readFileSync(__dirname + "/private.key", "utf8");
const certificate = fs.readFileSync(__dirname + "/certificate.crt", "utf8");
const ca = fs.readFileSync(__dirname + "/ca_bundle.crt", "utf8");
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const app_low = express();
const app = express();

const io = socketIo(http, {
  cors: {
    origin: "*", //여기에 명시된 서버만 호스트만 내서버로 연결을 허용할거야
    methods: ["GET", "POST"],
  },
});

//라우터 불러오기
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const userdataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
// const detailRouter = require('./routers/detail')
const calRouter = require("./routers/cal");
const mypageRouter = require("./routers/mypage");
const kakaoRouter = require("./routers/kakaoLogin");

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
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded())
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// tiny 는 최소한의 로그 , combined는 좀 더 자세한 정보를 남길수있다.
app.use(morgan("combined")); // morgan http 로그 미들웨어 추가
// app.use(helmet());
// app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//라우터 연결
app.use("/api", [
  userRouter,
  authRouter,
  userdataRouter,
  mainRouter,
  // userdataRouter,
  // detailRouter,
  calRouter,
  mypageRouter,
  kakaoRouter,
]);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("join_room->여기를 지나갔어요");
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message");
    console.log("send_message -> 메세지 전달이잘돼요");
  });
});

app.get(
  "/.well-known/pki-validation/783D42BAE9F6B3346E9B9349728243AE.txt",
  (req, res) => {
    res.sendFile(
      __dirname +
        "/well-known/pki-validation/783D42BAE9F6B3346E9B9349728243AE.txt"
    );
  }
);

app.get("/", async (req, res) => {
  console.log("main_page");
  res.sendFile(__dirname + "/index.html");
});
// io.on('connection', socket => {

//     socket.on("join_room", (data)=> {
//         socket.join(data)
//         console.log("join_room->여기를 지나갔어요")
//     })

//     socket.on('send_message', (data)=> {
//         socket.to(data.room).emit("receive_message")
//         console.log("send_message -> 메세지 전달이잘돼요")
//     })
// })

// io.on("connection", (socket) => {
//   console.log("연결이되었습니다.");
//   socket.on("init", (payload) => {
//     console.log(payload);
//   });
//   socket.on("send message", (item) => {
//     //send message 이벤트 발생
//     console.log(item.name + " : " + item.message);
//     io.emit("receive message", { name: item.name, message: item.message });
//     //클라이언트에 이벤트를 보냄
//   });
// });

// app.get("/", async (req, res) => {
//   console.log("main_page");
//   res.sendFile(__dirname + "/index.html");
// });

//서버 열기..
// http.listen(port, () => winston.info(`${port} 포트로 서버가 켜졌어요!`));
// app.listen(4000, ()=> winston.info('4000 포트로 서버가 켜졌어요!'))

app_low.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    const to = `https://${req.hostname}:${httpsPort}${req.url}`;
    console.log(to);
    res.redirect(to);
  }
});

http.createServer(app_low).listen(httpProt, () => {
  console.log("http 서버가 켜졌어요!");
});

https.createServer(credentials, app).listen(httpsPort, () => {
  console.log("https 서버가 켜졌어요!");
});
