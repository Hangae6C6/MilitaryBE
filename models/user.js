'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId: {
      type : DataTypes.STRING,
      primaryKey: true,
    },
    userNick:{
      type: DataTypes.STRING,
      unipue:true,
    },
    userPw: {
      type: DataTypes.STRING,
      userTestData : DataTypes.STRING,
    },
  }, 
  {
    sequelize,
    modelName: "User",
  });
  return User;
};