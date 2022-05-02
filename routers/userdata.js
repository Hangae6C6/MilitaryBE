const express = require("express");
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleWare')
const fs = require ("fs");



router.post("/api/schemas/userdata"), authMiddleWare, async(req,res) => {
   const { startDate, endDate, armyCategory, rank} = req.body;
   
   const totalDate = dateCalc(startDate,endDate); 
   const { userId } = res.local;
   const wjsdur = await userData.find({
       userId  
   }); // 디비에 저장이 되어있는지 
   if ( wjsdur.length ) {
       wjsdur.updateOne(
           {startDate,endDate,armyCategory,rank}
       )
   } else {
    const newwjsdur = new userData({startDate,endDate,armyCategory,rank})
    await newwjsdur.save();  
   }
   res.send({
    result : true,
    msg : "회원정보추가완료"
   }
   )
}

// function dateCalc(A,B){
//     var startDate = new Date(A);
//     var endDate = new Date(B);
//     var dateGap = endDate.getTime() - startDate.getTime();
//     return Math.ceil(dateGap/(1000 * 60 * 60 * 24));
//   }

module.exports = router;





// var x  = dateCalc('2022-04-20' , '2022-05-20');
// console.log('군생활 일수-->',x);
// var today = new Date();
// var y = dateCalc( today, '2022-05-20');
// console.log('전역까지 남은 일수-->',y);
// var z = (x-y)/x*100;
// console.log('군생활 ',z,'%');