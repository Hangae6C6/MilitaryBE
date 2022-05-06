const {Mail} = require('../models')
const nodeMailer = require('nodemailer')
const sequelize = require('sequelize')
const { or, and, like } = sequelize.Op;

const emailSend = async (req,res) => {
    try {
        const {content, emails} = req.body
        // const {userId} = res.locals.user
        const email = {
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "27c0685a2a5761",
              pass: "e9223cf90be9e2"
            }
        }
        const send = async(option)=> {
            nodeMailer.createTransport(email).sendMail(option, (error,info)=> {
                if (error) {
                    console.log(error)
                }else {
                    console.log(info)
                    return info.response
                }
            })
        }
        let email_data = {
            from: `${emails}`,
            to:"sk1440sk@naver.com",
            subject:"문의드립니다.",
            text:`${content}`
        }
        // await Mail.update({
        //     where: {
        //         userId:userId,
        //     }
        // })
        send(email_data)
        console.log(email_data)
        res.status(201).json({result:true,msg:"메일 발송 성공"})
    }catch (error) {
        console.log(error)
        console.log('app.js 메일발송 -> 여기서 에러발생함')
        res.status(400).json({result:false,msg:"메일 발송 실패"})
    }
}

module.exports = {emailSend};