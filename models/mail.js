'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init({
    content: DataTypes.STRING,
    emails: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};