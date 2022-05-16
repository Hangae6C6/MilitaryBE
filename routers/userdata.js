const express = require("express");
const router = express.Router();
const { userOptioalData, saveTestResult } = require("../controllers/userData");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.post("/userData", authMiddleware, userOptioalData);

router.post("/userTest", authMiddleware, saveTestResult);

module.exports = router;
