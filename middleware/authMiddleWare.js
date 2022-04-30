const jwt = require('jsonwebtoken')
const User = require('../schemas/user')
const fs = require ("fs");
const myKey = fs.readFileSync(__dirname + "/key.txt").toString();

module.exports = (req,res,next)=> {
    const Token = req.headers.authorization
    // console.log("111111",Token);

    const logInToken = Token.replace('Bearer', '')
    // console.log("222222,",logInToken)
    try {
        const token = jwt.verify(logInToken, myKey)
        const userId = token.userId

        User.findOne({userId})
          .exec()
          .then((user)=> {
              res.locals.user = user

              res.locals.token = logInToken

              next()
          })
    }catch (error) {
        console.log(error)
        console.log('authMiddleWare.js -> 여기서 에러 발생함')
        res.status(401).json({result:"토큰이 유효하지 않습니다."})
        return
    }
}