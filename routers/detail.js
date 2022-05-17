const express = require("express");
const router = express.Router();
const {
    detailPage,
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 가져오기(대규님)
router.get("/challengeDetail", authMiddleware, detailPage);

module.exports = router;
