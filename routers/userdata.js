const express = require("express");
const router = express.Router();
const { userOptioalData } = require("../controllers/userData");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.post("/modal/userData", authMiddleware, userOptioalData);

module.exports = router;
