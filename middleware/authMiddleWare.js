const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

module.exports = (req,res,next)=> {
    const Token = req.headers.authorization
    const logInToken = Token.replace('Bearer', '')
    try {
        const token = jwt.verify(logInToken)
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