const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const itemService = require("../services/item.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { name, price, supplierId } = req.body;

  try {
    // create item
    const addedItem = await itemService.addItem({ name, price, supplierId });
    if (addedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add item" });
  }
});

router.delete("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const itemId = req.params.id;

  try {
    // create item
    const deletedItem = await itemService.deleteItem(itemId);
    if (deletedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete item" });
  }
});

router.patch("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const itemId = req.params.id;
  const { name, price, supplierId } = req.body;

  try {
    // create item
    const updatedItem = await itemService.updateItem(itemId, {
      name,
      price,
      supplierId,
    });
    if (updatedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update item" });
  }
});

module.exports = router;
