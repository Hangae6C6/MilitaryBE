'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Challenges', {
      challengeNum: {
        allowNull: false,
        //추측이지만 새로운 게시글을 작성할때마다 해당 스키마는 자동으로
        //숫자가 +1 씩 올라가는거같다. 이따 물어봐야징
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challengeProgress: {
        //allowNull 이게 뭐지?? true 와  false는 각각 무슨뜻일까...??
        allowNull: false,
        type: Sequelize.STRING
      },
      challengeImage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      challengeTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      challengeType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      challengeCnt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      challengeViewCnt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        dafault:now(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        dafault:now(),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Challenges');
  }
};