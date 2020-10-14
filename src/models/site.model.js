const Sequelize = require("sequelize");

class Site extends Sequelize.Model {}

exports.init = (sequelize) => {
  Site.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "site",
    }
  );
};
exports.Site = Site;
