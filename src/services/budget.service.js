const { Budget } = require("../models/budget.model");

const updateBillBudget = async (newVal) => {
  return await Budget.update({ value: newVal }, { where: { id: 2 } });
};

const updateMonthlyBudget = async (newVal) => {
  return await Budget.update({ value: newVal }, { where: { id: 1 } });
};

const getBillBudget = async () => {
  const billBudget = await Budget.findByPk(2);
  return billBudget.value;
};

const getMonthlyBudget = async () => {
  const monthlyBudget = await Budget.findByPk(1);
  return monthlyBudget.value;
};

module.exports = {
  updateBillBudget,
  updateMonthlyBudget,
  getBillBudget,
  getMonthlyBudget,
};
