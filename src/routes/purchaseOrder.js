const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const purchaseOrderService = require("../services/purchaseOrder.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const {
    description,
    totalPrice,
    itemIdList,
    supplierId,
    siteId,
    ownerId,
  } = req.body;

  try {
    // create item
    const addedItem = await purchaseOrderService.createPurchaseOrder(
      { description, totalPrice, state: 3, supplierId, siteId, ownerId },
      itemIdList
    );
    if (addedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add purchase order" });
  }
});

router.delete("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const orderId = req.params.id;

  try {
    // create item
    const deletedItem = await purchaseOrderService.deletePurchaseOrder(orderId);
    if (deletedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete purchase order" });
  }
});

router.patch("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const orderId = req.params.id;
  const {
    description,
    totalPrice,
    itemIdList,
    supplierId,
    siteId,
    ownerId,
  } = req.body;

  try {
    // create item
    const updatedItem = await purchaseOrderService.updatePurchaseOrder(
      orderId,
      {
        description,
        totalPrice,
        siteId,
        supplierId,
        ownerId,
      },
      itemIdList
    );
    if (updatedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update purchase order" });
  }
});

router.patch("/status/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const orderId = req.params.id;
  const { state, approveComment = "" } = req.body;

  try {
    // create item
    const updatedItem = await purchaseOrderService.updatePurchaseOrderStatus(
      orderId,
      state,
      approveComment
    );
    if (updatedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update purchase order status" });
  }
});

router.get("/of/:ownerId", verifyJWTToken, async (req, res, next) => {
  // extract data
  const ownerId = req.params.ownerId;

  try {
    // create item
    const orders = await purchaseOrderService.getPurchaseOrderOfOwner(ownerId);
    if (orders) {
      return res.json({ orders });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get purchase orders of given owner" });
  }
});

router.get("/supplier/:supId", verifyJWTToken, async (req, res, next) => {
  // extract data
  const supId = req.params.supId;

  try {
    // create item
    const orders = await purchaseOrderService.getPurchaseOrderOfSupplier(supId);
    if (orders) {
      return res.json({ orders });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get purchase orders of given supplier" });
  }
});

router.get("/", verifyJWTToken, async (req, res, next) => {
  // extract data

  try {
    // create item
    const orders = await purchaseOrderService.getPurchaseOrders();
    if (orders) {
      return res.json({ orders });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get purchase orders" });
  }
});

module.exports = router;
