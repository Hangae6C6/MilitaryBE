const express = require("express");
//요청과 함께들어온 쿠키를 해석하여 곧바로 req.cookies 객체로 만든다.
const cookieParser = require("cookie-parser");
//폼 데이터 또는 AJAX 요청으로 온 POST데이터를 처리한다.
const bodyParser = require("body-parser");
const morgan = require("morgan"); // 요청과 응답에 대한 정보를 추가로 자세히 콘솔에 기록
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require("fs");

const port = 3000;
// const {Server} = require('socket.io')
// const env = require('./env')
const logger = require("./logger");
// const configurePassport = require('./passport')
const { sequelize } = require("./models");

const options = {
  key: fs.readFileSync("./rootca.key"),
  cert: fs.readFileSync("./rootca.crt"),
};
const app = express();

//채팅방

// const httpServer = createServer(app)
// const io = new Server(httpServer, {cors: {origin: '*'}})
// app.set('io', io)
// app.use('/chatt', (req,res)=>res.render('chatIndex'))
// app.use('/chat/:moimId', (req,res)=> res.render('chatIndex'))

// const moimNamespace = io.of('/chat')
// app.set('moimNamespeace', moimNamespace)

// let roomId = '';
//특정 네임스페이스 지정시의 코드
//Namespace : 말 그래도 이름이 붙은 공간이며, 소켓을 묶어주는 단위라고 생각하면된다.
// moimNamespace.on('connect', (socketMoim)=> {
//     console.log('moim 네임스페이스 접속')

//     socketMoim.on('enterNewUser', async (userNickName, targetRoomId)=> {
//         socketMoim.name = userNickName;
//         console.log('방 입장유저 닉네임', socketMoim.name)
//         roomId = targetRoomId;
//         socketMoim.join(roomId)
//         const msg = `${userNickName}님이 채팅방에 참가했습니다.`

//         moimNamespace.to(roomId).emit('updateMsg', {
//             name:'SERVER',
//             msg,
//         })
//     })

//채팅방 퇴장할때
//     socketMoim.on('leaveRoom', async(userNickName,targetRoomId)=> {
//         //프론트로부터 전달 받은 roomId를 타겟으로 하여 방에서 leave시킨다.
//         socketMoim.leave()
//     })

//     socketMoim.on('enterNweRoom',async (newRoom, userNickName)=> {
//         //DB의 고유 roomId를 참고하여 방에 join시킨다.
//         console.log('newRoom',newRoom)
//         const roomId = newRoom.disable

//         socketMoim.join(roomId)
//         const msg = `${userNickName}님이 채팅방에 참가했습니다.`

//         moimNamespace.to(roomId).emit('updateMsg', {
//             name: 'SERVER',
//             msg,
//         })
//     })

// const io = socketIo(http, {
//   cors: {
//     origin: "*", //여기에 명시된 서버만 호스트만 내서버로 연결을 허용할거야
//     methods: ["GET", "POST"],
//   },
// });

//라우터 불러오기
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const userdataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
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
]);

//서버 열기..
http.listen(port, () => "번 포트로 서버가 켜졌어요!");
// app.listen(4000, ()=> winston.info('4000 포트로 서버가 켜졌어요!'))

// io.on("connection", (socket) => {
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log("join_room->여기를 지나갔어요");
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message");
//     console.log("send_message -> 메세지 전달이잘돼요");
//   });
// });

app.get("/", async (req, res) => {
  console.log("main_page");
  res.sendFile(__dirname + "/index.html");
});
