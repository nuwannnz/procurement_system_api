const User = require("./models/user.model").User;
const Budget = require("./models/budget.model").Budget;

const seedAdmin = () => {
  // insert default user if there are no users
  (async () => {
    if ((await User.findAll()).length === 0) {
      await require("./services/user.service").createUser({
        fName: "admin",
        lName: "admin",
        role: 1,
        password: "admin",
        email: "admin@admin.com",
      });
      await require("./services/user.service").createUser({
        fName: "sitem",
        lName: "sitem",
        role: 4,
        password: "1234",
        email: "a@a.com",
      });
      await require("./services/user.service").createUser({
        fName: "sup",
        lName: "sup",
        role: 5,
        password: "1234",
        email: "b@b.com",
      });
    }
  })();
};

const seedBudget = () => {
  (async () => {
    if ((await Budget.findAll()).length === 0) {
      await Budget.create({ name: "monthly", value: 10000 });
      await Budget.create({ name: "bill", value: 3000 });
    }
  })();
};

module.exports = {
  seedAdmin,
  seedBudget,
};
