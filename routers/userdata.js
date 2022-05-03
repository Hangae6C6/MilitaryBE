const express = require("express");
const router = express.Router();
const { userOptioalData } = require("../controllers/userData");
const authMiddleWare = require('../middleware/authMiddleWare')
require("dotenv").config();

router.post("/modal/userData", authMiddleWare, userOptioalData);

module.exports = router;




