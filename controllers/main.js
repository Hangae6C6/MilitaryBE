const express = require("express");
const router = express.Router();
const { Challenge } = require("../models");
const authMiddleware = require("../middleware/authMiddleWare");

//메인페이지 챌린지 보여주기
const mainPage = async (req, res) => {
  const challenge = await Challenge.findAll();
  return res.status(201).json(challenge);
};

module.exports = { mainPage };
