const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/authMiddleWare')
const {emailSend} = require('../controllers/mailtest')


//메일발송
router.post('/emailSend', emailSend)


module.exports = router