const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const invoiceService = require("../services/invoice.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { totalValue, ownerId, oderId } = req.body;

  try {
    // create item
    const addedItem = await invoiceService.createInvoice({
      totalValue,
      orderId,
      ownerId,
    });
    if (addedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add invoice" });
  }
});

router.delete("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const invoiceId = req.params.id;

  try {
    // create item
    const deletedItem = await invoiceService.deleteInvoice(invoiceId);
    if (deletedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete invoice" });
  }
});

router.patch("pay/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const invoiceId = req.params.id;

  try {
    // create item
    const updatedItem = await invoiceService.payInvoice(invoiceId);
    if (updatedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to pay invoice" });
  }
});

module.exports = router;
