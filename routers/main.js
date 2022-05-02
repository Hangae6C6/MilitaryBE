const express = require("express");
const router = express.Router();





router.post("/api/challenge", authMiddleware, async(req,res) => {
      const {user} = res.locals;
      const {challengeTitle, challengeLmage, challengeType, challengeContent} = req.body;
       

}); 





module.exports = router;