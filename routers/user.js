const express = require("express");
const router = express.Router();
const {signUp,login,loginCheck} = require("../controllers/user")
const authMiddleWare = require('../middleware/authMiddleWare')
require("dotenv").config();

router.post("/signUp", signUp);

router.post("/login", login);

router.get("/loginCheck",authMiddleWare, loginCheck);


module.exports = router;








