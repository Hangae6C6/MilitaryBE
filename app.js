const express = require('express')
 //요청과 함께들어온 쿠키를 해석하여 곧바로 req.cookies 객체로 만든다.
const cookieParser = require('cookie-parser')
//폼 데이터 또는 AJAX 요청으로 온 POST데이터를 처리한다.
const bodyParser = require('body-parser')
const morgan = require('morgan') // 요청과 응답에 대한 정보를 추가로 자세히 콘솔에 기록
const winston = require('./config/winston')
const helmet = require('helmet');
const cors = require('cors')
const app = require('express')()
const port = 3000
const http = require('http').createServer(app)
const socketIo = require('socket.io')
// const {Server} = require('socket.io')
// const env = require('./env')
const logger = require("./logger");
// const configurePassport = require('./passport')
const { sequelize } = require("./models");

const io = socketIo(server, {
    cors : {
        origin:"*", //여기에 명시된 서버만 호스트만 내서버로 연결을 허용할거야
        methods: ["GET","POST"],
    },
})

//라우터 불러오기
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const userdataRouter = require("./routers/userdata");
const mainRouter = require("./routers/main");
// const userdataRouter = require('./routers/userdata')
// const detailRouter = require('./routers/detail')
const calRouter = require("./routers/cal");
const mypageRouter = require("./routers/mypage");

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
app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
http.listen(port, ()=> winston.info(`${port} 포트로 서버가 켜졌어요!`))
// app.listen(4000, ()=> winston.info('4000 포트로 서버가 켜졌어요!'))

io.on('connection', socket => {
    socket.on('message', ({name,message})=> {
        io.emit('meeage',{name,message})
        console.log("연결은 잘되었나??")
    })
})
