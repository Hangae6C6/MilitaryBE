"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Challenge.init(
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
    },
    {
      sequelize,
      modelName: "Challenge",
    }
  );
  return Challenge;
};
