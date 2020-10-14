const Sequelize = require("sequelize");

class ReturnOrder extends Sequelize.Model {}

exports.init = (sequelize) => {
  ReturnOrder.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      approveComment: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "return_order",
    }
  );
};
exports.ReturnOrder = ReturnOrder;
