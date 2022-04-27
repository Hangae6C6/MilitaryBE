const Sequelize = require("sequelize");

module.exports = class UserData extends Sequelize.Model {
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
        startDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        armyCategory: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        rank: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        // married: {
        //   type: Sequelize.BOOLEAN,
        //   allowNull: false,
        // },
        // comment: {
        //   type: Sequelize.TEXT,
        //   allowNull: true,
        // },
        // created_at: {
        //   type: Sequelize.DATE,
        //   allowNull: false,
        //   defaultValue: Sequelize.NOW,
        // },
      },
      //모델에 대한 설정
      //paranoid:true => deletedAt값이 자동으로 생성됨. 그래서 회원탈퇴해도 deletedAt에 날짜를 넣어주고 어느정도 가지고 있음. (soft delete)
      //실제로 DB에서 정보를 삭제하는 것 (hard delete)
      {
        sequelize,
        timestamps: false,
        underscored: false,
        //javascript에서 사용하는 이름
        modelName: "UserData",
        //sql에서 사용하는 이름
        tableName: "userDatas",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserData.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id",
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
    });
  }
};
