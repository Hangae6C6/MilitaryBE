const express = require('express')
const cookieParser = require('cookie-parser')
const connect = require("./schemas/index");
const cors = require('cors')
const app = express()
const port = 3000

//라우터 불러오기
const userRouter = require('./routers/user')
const userdataRouter = require('./routers/userdata')
const mainRouter = require('./routers/main')
const detailRouter = require('./routers/detail')
const calRouter = require('./routers/cal')
const mypageRouter = require('./routers/mypage')

connect()
//접속 로그 남기기
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
app.use(express.urlencoded())
app.use(cookieParser())
app.use(requestMiddleware)
app.use(express.urlencoded({ extended : false}))

//라우터 연결
app.use("/api", [
    userRouter,
    userdataRouter,
    mainRouter,
    detailRouter,
    calRouter,
    mypageRouter,
])

//서버 열기
app.listen(port, ()=> {
    console.log(port, "포트로 서버가 켜졌어요!")
})