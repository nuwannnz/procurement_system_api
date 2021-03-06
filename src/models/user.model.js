const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

exports.init = (sequelize) => {
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fName: {
        type: Sequelize.STRING,
      },
      lName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      userRole: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
};
exports.User = User;
