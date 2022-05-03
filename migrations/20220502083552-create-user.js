'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickNick: {
        type: Sequelize.STRING
      },
      userPw: {
        type: Sequelize.STRING
      },
      userTestData: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default:Sequelize.now(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default:Sequelize.now(),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};