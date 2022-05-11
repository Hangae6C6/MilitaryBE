const passport = require('passport')
const NaverStrategy = require('passport-naver')
const User = require('../models/user')


//사용자가 페이지를 방문할때마다 호출되는 함수
//done(null,id)로 세션을 초기화 한다.
passport.serializeUser(function (user,done) {
    done(null,user.id)
})

//사용자가 페이지를 방문할 떄마다 호출되는 함수
//done(null,id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (user,done) {
    done(null, user)
})

// passport.use(
//     new NaverStrategy(
//         {
//             clientID:process.env.NAVER_CLIENT_ID,
//             clientSecret:process.env.NAVER_CLIENT_SECRET,
//             callbackURL:"http://localhost:3000/api/auth/naver/callback", // 애플리케이션을 등록할 떄 입력했던 callbackURL 을 입력해준다.
//         },
//         async(accessToken, refreshToken, profile, cb)=> {
//             try {
//                 const user = await User.findOne({socialId:profile.id})
//                 //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니하면 신규 사용자 생성
//                 if (user) {
//                     user.socialId = profile.id;
//                     user.save()
//                     return cb(null, user)
//                 }else {
//                     const newUser = await User.create({
//                         socialtype: "naver",
//                         socialId: profile.id,
//                         nickname: profile._json.email,
//                     })
//                     return cb(null, newUser)
//                 }
//             }catch (error) {
//                 return cb(error)
//             }
//         }
//     )
// )

module.exports = passport