const express = require("express");
const router = express.Router();

const {} = require("../controllers/main");

//메인페이지 조회
router.get("/readMain");

//메인페이지 검색
router.get("/searchMain");

module.exports = router;
