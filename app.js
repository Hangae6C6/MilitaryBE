const express = require('express')
const cookieParser = require('cookie-parser')
// const connect = require("./schemas/index");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const winston = require('./config/winston')
const helmet = require('helmet');
const cors = require('cors')
const app = express()
const port = 3000

//라우터 불러오기
const userRouter = require('./routers/user')
const authRouter = require('./routers/auth')
// const userdataRouter = require('./routers/userdata')
// const detailRouter = require('./routers/detail')
// const calRouter = require('./routers/cal')
const mypageRouter = require('./routers/mypage')

// 접속 로그 남기기
const requestMiddleware = (req,res,next)=> {
    console.log(
        "[Ip address]:",
        req.ip,
        "[method]:",
        req.method,
        "Request URL:",
        req.originalUrl,
        " - ",
        new Date()
    )
    next()
}

//각종 미들웨어
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded())
app.use(cookieParser())
app.use(requestMiddleware)
app.use(express.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.use(morgan('combined')) // morgan http 로그 미들웨어 추가
// app.use(helmet());
app.disable('x-powered-by');
// app.use(helmet.hpkp());
// app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//라우터 연결
app.use("/api", [
    userRouter,
    authRouter,
    // userdataRouter,
    // detailRouter,
    // calRouter,
    mypageRouter,
])

//서버 열기
app.listen(port, ()=> winston.info(`${port} 포트로 서버가 켜졌어요!`))