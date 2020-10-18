const Sequelize = require("sequelize");

class ReturnOrderItem extends Sequelize.Model {}

exports.init = (sequelize) => {
  ReturnOrderItem.init(
    {
      qty: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "return_order_item",
      freezeTableName: true,
    }
  );
};
exports.ReturnOrderItem = ReturnOrderItem;
