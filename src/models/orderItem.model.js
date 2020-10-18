const Sequelize = require("sequelize");

class OrderItem extends Sequelize.Model {}

exports.init = (sequelize) => {
  OrderItem.init(
    {
      qty: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "order_item",
      freezeTableName: true,
    }
  );
};
exports.OrderItem = OrderItem;
