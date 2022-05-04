const express = require('express')
const router = express.Router()
// const moment = require('moment')
// const Cal = require('../schemas/cal')

// // 남은 일수 가져오기
// router.get('/endDay', (req,res)=> {
//     const today = moment()
//     const now = moment(new Date())
//     const {endDay} = req.body
//     console.log(endDay)
//     const a = now.diff(endDay, 'days')
//     console.log(`전역까지 ${-a+1}일 남았습니다.`)
//     res.status(200).json({result:true,msg:`${-a+1}`})
// })

// router.get('/endDay1', async (req,res)=> {
//     const now = moment(new Date())
//     const {end} = await Cal.findOne({endDay})
//     const a = now.diff(end, 'days')
//     console.log(`전역까지 ${-a+1}일 남았습니다.`)
//     res.status(200).json({result:true,msg:`전역까지 ${-a+1}일 남았습니다!`})
// })

// // 전역일 입력
// router.post('/endDay', async(req,res)=> {
//     try {
//         const {endDay} = req.body
//         const calAmount = await Cal.find();
//         if (calAmount.length) {
//             const calSorted = calAmount.sort((a, b) => b.calNum - a.calNum);
//             const MaxCalNum = calSorted[0]["calNum"];
//             const calNum = MaxCalNum + 1;
//             const createdCal = await Cal.create({endDay,calNum})
//         }else {
//             const calNum = 1;
//             const createdCal = await Cal.create({endDay})
//         }
//         res.status(201).json({result:true,msg:"전역일 입력완료"})
//     }catch(error) {
//         console.log(error)
//         console.log('cal.js 전역일 입력 -> 여기서 에러발생함')
//         res.status(400).json({result:false,msg:"전역일 입력 실패..."})
//     }
// })


module.exports = router