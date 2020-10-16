const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const budgetService = require("../services/budget.service");

router.get("/", verifyJWTToken, async (req, res, next) => {
  try {
    // create item
    const monthlyBudget = await budgetService.getMonthlyBudget();
    const billBudget = await budgetService.getBillBudget();
    return res.json({ monthlyBudget, billBudget });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get monthly budget" });
  }
});

router.patch("/month", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { value } = req.body;

  try {
    // create item
    const updatedBudget = await budgetService.updateMonthlyBudget(value);
    if (updatedBudget) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update monthly budget" });
  }
});

router.patch("/bill", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { value } = req.body;

  try {
    // create item
    const updatedBudget = await budgetService.updateBillBudget(value);
    if (updatedBudget) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update bill budget" });
  }
});

module.exports = router;
