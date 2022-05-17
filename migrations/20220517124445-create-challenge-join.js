'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChallengeJoins', {
      userId: {
        type: Sequelize.STRING
      },
      challengeNum: {
        type: Sequelize.STRING
      },
      progress: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      challengeJoinNumber:{
        allowNull: false,
        type: Sequelize.DATE,
        unique: true,
        autoIncrement: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChallengeJoins');
  }
};