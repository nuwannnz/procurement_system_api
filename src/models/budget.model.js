const Sequelize = require("sequelize");

class Budget extends Sequelize.Model {}

exports.init = (sequelize) => {
  Budget.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "budget",
    }
  );
};
exports.Budget = Budget;
