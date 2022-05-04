const { User, UserData } = require("../models");
const sequelize = require("sequelize");
const { or, and, like } = sequelize.Op;

// module.exports = { endDay };