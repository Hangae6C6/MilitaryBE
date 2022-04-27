const Sequelize = require("sequelize");

module.exports = class Challenge extends Sequelize.Model {
  static init(sequelize) {
    //컬럼값 정의
    return super.init(
      {
        // userId: {
        //   type: Sequelize.STRING(20),
        //   primaryKey: true,
        //   allowNull: false,
        //   unique: true,
        // },
        challengeNum: {
          type: Sequelize.STRING(11),
          allowNull: false,
        },
        challengeTitle: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        challengeContent: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      //모델에 대한 설정
      //paranoid:true => deletedAt값이 자동으로 생성됨. 그래서 회원탈퇴해도 deletedAt에 날짜를 넣어주고 어느정도 가지고 있음. (soft delete)
      //실제로 DB에서 정보를 삭제하는 것 (hard delete)
      {
        sequelize,
        timestamps: false,
        underscored: false,
        //javascript에서 사용하는 이름
        modelName: "Challenge",
        //sql에서 사용하는 이름
        tableName: "challenges",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Challenge.belongsTo(db.User, {
      foreignKey: "challenger",
      targetKey: "id",
    });
  }
};
