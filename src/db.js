const Sequelize = require("sequelize");
const config = require("./config");
const seeder = require("./seeder");

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);
exports.init = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected");
      // create the tables if not exist
      const userModel = require("./models/user.model");
      const itemModel = require("./models/item.model");
      const siteModel = require("./models/site.model");
      const invoiceModel = require("./models/invoice.model");
      const purchaseOrderModel = require("./models/purchaseOrder.model");
      const returnOrderModel = require("./models/returnOrder.model");
      const budgetModel = require("./models/budget.model");

      userModel.init(sequelize);
      itemModel.init(sequelize);
      siteModel.init(sequelize);
      invoiceModel.init(sequelize);
      purchaseOrderModel.init(sequelize);
      returnOrderModel.init(sequelize);
      budgetModel.init(sequelize);

      // Item relationships
      itemModel.Item.belongsTo(userModel.User, { as: "supplier" });
      itemModel.Item.belongsToMany(purchaseOrderModel.PurchaseOrder, {
        through: "purchase_order_items",
      });
      itemModel.Item.belongsToMany(returnOrderModel.ReturnOrder, {
        through: "return_order_items",
      });

      // Purchase order relationships
      purchaseOrderModel.PurchaseOrder.belongsTo(userModel.User, {
        as: "owner",
      });
      purchaseOrderModel.PurchaseOrder.belongsTo(userModel.User, {
        as: "supplier",
      });
      purchaseOrderModel.PurchaseOrder.belongsTo(siteModel.Site);

      // Invoice relationships
      invoiceModel.Invoice.belongsTo(purchaseOrderModel.PurchaseOrder, {
        as: "order",
      });
      invoiceModel.Invoice.belongsTo(userModel.User, {
        as: "owner",
      });

      // Return order relationships
      returnOrderModel.ReturnOrder.belongsTo(purchaseOrderModel.PurchaseOrder);

      (async () => {
        await sequelize.sync({ force: true });
        seeder.seedAdmin();
        seeder.seedBudget();
      })();
    })
    .catch((err) => {
      console.log("Failed to connect to database", err);
    });
};

exports.db = sequelize;
