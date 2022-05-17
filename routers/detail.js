const express = require("express");
const router = express.Router();
const {
    detailPage,
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 
router.get("/challengeDetail", authMiddleware, detailPage);


module.exports = router;
