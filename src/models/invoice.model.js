const Sequelize = require("sequelize");

class Invoice extends Sequelize.Model {}

exports.init = (sequelize) => {
  Invoice.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      totalValue: {
        type: Sequelize.FLOAT,
      },
      payedDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "invoice",
    }
  );
};
exports.Invoice = Invoice;
