const express = require("express");
const router = express.Router();
const {
    detailPage,
    detailPage1,
} = require("../controllers/detail");
const authMiddleware = require("../middleware/authMiddleWare");

//디테일페이지 가져오기(대규님)
router.get("/challengeDetail", authMiddleware, detailPage);

//디테일페이지 가져오기(황인호)
router.get("/challengeDetail1", authMiddleware, detailPage1);

module.exports = router;
