const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.post("/signUp", signUp);

router.post("/login", login);

router.get("/loginCheck", authMiddleware, (req, res) => {
  const { user } = res.locals;
  console.log(user);
  res.json(user);
});

module.exports = router;
