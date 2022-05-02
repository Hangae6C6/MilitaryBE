const express = require("express");
const router = express.Router();
const User = require('../schemas/user')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const authMiddleWare = require('../middleware/authMiddleWare')
const fs = require ("fs");
const myKey = fs.readFileSync(__dirname + "/../middleware/key.txt").toString();

// 회원가입
router.post("/signUp", async (req, res) => {
    // console.log('api/signUp')

        const {userId, userPw, userNick, userPwCheck } = req.body;
    
        // Validation Check
        let userNickReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,15}$/ //2~15자 한글,영문,숫자
        let userPwReg = /^(?=.*[a-zA-Z])(?=.*\d)[\w]{8,}$/; //4~15자 영문+숫자
    
        
        const existUsers = await User.find({
            $or: [ {userId}, {userNick} ],
        }); 
    
        if(userId === "" || userId === undefined || userId ===null){
            res.status(400).send({
                errorMessage : '아이디를 입력하세요.'
            });
            return;
        }else if(userNick === "" || userNick === undefined || userNick === null){
            res.status(400).send({
                errorMessage : '닉네임을 입력하세요.'
            });
            return;
        }else if(!userNickReg.test(userNick)){
            res.status(400).send({
                errorMessage : '닉네임은 2~15자, 한글,영문 및 숫자만 가능합니다.'
            });
            return;
        }else if(existUsers.length) {
            res.status(400).send({
                errorMessage : '이미 가입된 아이디 또는 닉네임 입니다.'
            });
            return;
        }else if(userPw === "" || userPw === undefined || userPw === null){
            res.status(400).send({
                errorMessage : "비밀번호를 입력하세요."
            })
            return;
        }else if(userPwCheck === "" || userPwCheck === undefined || userPwCheck === null){
                res.status(400).send({
                    errorMessage : "비밀번호 확인란을 입력하세요."
                })
                return;
        }else if(!userPwReg.test(userPw)){
            res.status(400).send({
                errorMessage : '4~15자, 영문 및 숫자만 가능합니다.'
            });
            return;
        }
        
        // bcrypt module -> 암호화
        // 10 --> saltOrRound --> salt를 10번 실행 (높을수록 강력)
        const from = 'webSite'
        const hashed = await bcrypt.hash(userPw,10);
        const user = new User({ userId, userNick, userPw : hashed, from})
        await user.save();
         console.log("user",user)
        res.status(200).send({
            result:"true",
             msg : "회원가입성공",
        })
});

// login page
router.post("/login", async (req, res) => {
   
    const{ userId, userPw } = req.body;
    const user = await User.findOne({userId});
    
    
    // body passowrd = unHashPassword -->true
    const unHashPw = await bcrypt.compareSync(userPw, user.userPw);
    
    if(user.userId !== userId || unHashPw==false) {
        res.status(400).send({
            errorMessage : "아이디 또는 비밀번호를 확인해주세요."
        });
        return;
    };

    const tokenOption = { expiresIn : "1d", issuer: "SoldierProject"};
    const payload = { userId };
    const secret = myKey;

    const logInToken = jwt.sign(payload, secret, tokenOption); 
    res.status(200).send({
        result:true,
        logInToken : logInToken,
        msg:'로그인성공'
    });
});

// 로그인체크 
router.get("/loginCheck", authMiddleWare, async (req, res) => {
    const { user } = res.locals;
    res.status(200).send({
        user,
    });
});




module.exports = router;








