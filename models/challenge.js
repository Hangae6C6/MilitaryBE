"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  challenge.init(
    {
      challengeNum: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      challengeProgress: DataTypes.STRING,
      challengeImage: DataTypes.STRING,
      challengeTitle: DataTypes.STRING,
      challengeType: DataTypes.STRING,
      challengeCnt: DataTypes.INTEGER,
      challengeViewCnt: DataTypes.INTEGER,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "challenge",
    }
  );
  return challenge;
};
