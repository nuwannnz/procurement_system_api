const { Budget } = require("../models/budget.model");

const updateBillBudget = async (newVal) => {
  return await Budget.update({ value: newVal }, { where: { id: 2 } });
};

const updateMonthlyBudget = async (newVal) => {
  return await Budget.update({ value: newVal }, { where: { id: 1 } });
};

module.exports = {
  updateBillBudget,
  updateMonthlyBudget,
};
