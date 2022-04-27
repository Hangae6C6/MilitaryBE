const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
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
        userPw: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        userNick: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
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
        modelName: "User",
        //sql에서 사용하는 이름
        tableName: "users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    //Challenge DB의 외래키 challenger가 User DB의 'id'를 참조하고 있는 코드
    //내 id를 남의 challenger가 참조하고 있음
    db.User.hasMany(db.Challenge, {
      foreignKey: "challenger",
      sourceKey: "id",
    });
    db.User.hasOne(db.UserData, {
      foreignKey: "userUd",
      sourceKey: "id",
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
    });
  }
};
