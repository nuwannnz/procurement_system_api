const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const invoiceService = require("../services/invoice.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { totalValue, ownerId, orderId } = req.body;

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

router.patch("/pay/:id", verifyJWTToken, async (req, res, next) => {
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

router.get("/", verifyJWTToken, async (req, res, next) => {
  // extract data

  try {
    // create item
    const invoices = await invoiceService.getAllInvoices();
    if (invoices) {
      return res.json({ invoices });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get invoices" });
  }
});

router.get("/supplier/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const supId = req.params.id;
  try {
    // create item
    const invoices = await invoiceService.getAllInvoicesOfSupplier(supId);
    if (invoices) {
      return res.json({ invoices });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get invoices of supplier" });
  }
});

module.exports = router;
