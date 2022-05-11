const passport = require('passport')
const NaverStrategy = require('passport-naver')
const User = require('../models/user')
require('dotenv').config()
const dotenv = require('dotenv')


passport.serializeUser(function (user,done) {
    done(null,user.id)
})

passport.deserializeUser(function (user,done) {
    done(null, user)
})

passport.use(
    new NaverStrategy(
        {
            clientID:process.env.NAVER_CLIENT_ID,
            clientSecret:process.env.NAVER_CLIENT_SECRET,
            callbackURL:"http://localhost:3000/api/auth/naver/callback", // 애플리케이션을 등록할 떄 입력했던 callbackURL 을 입력해준다.
        },
        async(accessToken, refreshToken, profile, cb)=> {
            try {
                const user = await User.findOne({socialId:profile.id})
                //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니하면 신규 사용자 생성
                if (user) {
                    user.socialId = profile.id;
                    user.save()
                    return cb(null, user)
                }else {
                    const newUser = await User.create({
                        socialtype: "naver",
                        socialId: profile.id,
                        nickname: profile._json.email,
                    })
                    return cb(null, newUser)
                }
            }catch (error) {
                console.log(error)
                console.log('NaverStrategy.js -> 여기서 오류발생함')
                res.status(400).json({result:false,msg:"네이버 로그인 오류"})
            }
        }
    )
)

export default passport