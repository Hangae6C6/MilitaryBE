"use strict";

const { now } = require("sequelize/types/utils");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Challenges", {
      challengeNum: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      challengeProgress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      challengeImage: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      challengeTitle: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      challengeType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      challengeCnt: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      challengeViewCnt: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: now(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: now(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Challenges");
  },
};
