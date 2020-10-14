const Sequelize = require("sequelize");

class PurchaseOrder extends Sequelize.Model {}

exports.init = (sequelize) => {
  PurchaseOrder.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
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
      modelName: "purchase_order",
    }
  );
};
exports.PurchaseOrder = PurchaseOrder;
