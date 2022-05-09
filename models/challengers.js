'use strict';
const {Model} = require('sequelize');
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
  Challenge.init({
    challengeNum: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    challengeProgress: DataTypes.STRING,
      challengeTitle: DataTypes.STRING,
      challengeType: DataTypes.STRING,
      challengeCnt: DataTypes.INTEGER,
      challengeViewCnt: DataTypes.INTEGER,
      userId: DataTypes.STRING, 
      lastSavePage:DataTypes.INTEGER,
      challengeStep:DataTypes.STRING,
      challengeEndDt:DataTypes.STRING,
      challengeStartDt:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};