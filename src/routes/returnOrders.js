const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const returnOrderService = require("../services/returnOrder.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { totalPrice, itemIdList, orderId, ownerId } = req.body;

  try {
    // create item
    const addedItem = await returnOrderService.createReturnOrder(
      { orderId, ownerId, state: 3, totalPrice },
      itemIdList
    );
    if (addedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add return purchase order" });
  }
});

router.delete("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const orderId = req.params.id;

  try {
    // create item
    const deletedItem = await returnOrderService.deleteReturnOrder(orderId);
    if (deletedItem) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete return purchase order" });
  }
});

// router.patch("/:id", verifyJWTToken, async (req, res, next) => {
//   // extract data
//   const orderId = req.params.id;
//   const {
//     description,
//     totalPrice,
//     itemIdList,
//     supplierId,
//     siteId,
//     ownerId,
//   } = req.body;

//   try {
//     // create item
//     const updatedItem = await returnOrderService.updatePurchaseOrder(
//       orderId,
//       {
//         description,
//         totalPrice,
//         siteId,
//         supplierId,
//         ownerId,
//       },
//       itemIdList
//     );
//     if (updatedItem) {
//       return res.json({ completed: true });
//     }
//     return res.json({ completed: false });
//   } catch (error) {
//     console.error(error);
//     res.json({ error: "Failed to update purchase order" });
//   }
// });

router.patch("/status/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const orderId = req.params.id;
  const { state, approveComment = "" } = req.body;

  try {
    // create item
    const updatedItem = await returnOrderService.updateReturnOrderStatus(
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
    res.json({ error: "Failed to update return purchase order status" });
  }
});

module.exports = router;
