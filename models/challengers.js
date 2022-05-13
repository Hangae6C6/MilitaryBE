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
    challengeProgress: DataTypes.STRING, //(추가)
      challengeTitle: DataTypes.STRING,
      challengeType: DataTypes.STRING,
      challengeCnt: DataTypes.INTEGER,
      challengeViewCnt: DataTypes.INTEGER, //(추가)
      userId: DataTypes.STRING, 
      lastSavePage:DataTypes.INTEGER, // 원래 사용하려했지만 버림
      steps : DataTypes.STRING, //[{stepNum:int,stepContent,isChecked}] 이런식으로 들어옴
      challengeEndDate:DataTypes.STRING,
      challengeDate:DataTypes.STRING,
      challengeLimitNum:DataTypes.STRING, // detail페이지에서 쓸것 

  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};