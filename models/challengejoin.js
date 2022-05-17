'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChallengeJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChallengeJoin.init({
    userId: DataTypes.STRING,
    challengeNum: DataTypes.STRING,
    progress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChallengeJoin',
  });
  return ChallengeJoin;
};