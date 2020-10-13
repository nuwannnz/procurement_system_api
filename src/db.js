const Sequelize = require("sequelize");
const config = require("./config");

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

      userModel.init(sequelize);

      sequelize.sync();
    })
    .catch((err) => {
      console.log("Failed to connect to database", err);
    });
};

exports.db = sequelize;
