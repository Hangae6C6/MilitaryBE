//mysql, sequelize, node를 연결해주는 코드
const Sequelize = require("sequelize");
const User = require("./user");
const UserData = require("./userData");
const Challenge = require("./challenge");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

//sequelize = 연결객체 = 테이블, 시퀄라이즈, 모델을 연결하는 것
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
//Sequelize 대문자는 시퀄라이즈 객체로 생성자에 해당함
db.Sequelize = Sequelize;

db.User = User;
db.UserData = UserData;
db.Challenge = Challenge;

User.init(sequelize);
UserData.init(sequelize);
Challenge.init(sequelize);

User.associate(db);
UserData.associate(db);
Challenge.associate(db);

module.exports = db;
