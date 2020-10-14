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
      },
      totalValue: {
        type: Sequelize.FLOAT,
      },
      payedDate: {
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "invoice",
    }
  );
};
exports.Invoice = Invoice;
