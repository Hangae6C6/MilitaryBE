'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cal.init({
    email: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type : DataTypes.STRING,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Cal',
  });
  return Cal;
};