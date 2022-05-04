const express = require('express')
const {
    naverLogin,
    naverCallback,
} = require('../controllers/passportAuth')

const router = express.Router();

router.get('/naver', naverLogin);
router.get('/naver/callback', naverCallback);

module.exports = router;