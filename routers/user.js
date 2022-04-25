const express = require("express");
const router = express.Router();
const User = require('../schemas/user')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleWare')




module.exports = router;