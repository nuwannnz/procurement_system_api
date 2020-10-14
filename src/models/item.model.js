const Sequelize = require("sequelize");

class Item extends Sequelize.Model {}

exports.init = (sequelize) => {
  Item.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "item",
    }
  );
};
exports.Item = Item;
