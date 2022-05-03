const express = require("express");
const router = express.Router();
const { signUp, login, loginCheck } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.post("/signUp", signUp);

router.post("/login", login);

router.get("/loginCheck", authMiddleware, loginCheck);

module.exports = router;
