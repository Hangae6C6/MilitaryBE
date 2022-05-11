const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const passport = require('../passport/NaverStrategy')
dotenv.config()

const router = express.Router()

router.get('/naver',passport.authenticate('naver'))


module.exports = router