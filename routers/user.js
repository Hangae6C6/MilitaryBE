const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { signUp, login, loginCheck } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

//회원가입 기능
router.post("/signUp", signUp);

//로그인 기능
router.post("/login", login);

//로그인 체크 기능
router.get("/loginCheck", authMiddleware, loginCheck);

module.exports = router;
