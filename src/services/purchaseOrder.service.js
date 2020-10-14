const { Op } = require("sequelize");
const { PurchaseOrder } = require("../models/purchaseOrder.model");
const { Item } = require("../models/item.model");

/**
 *
 * Purchase order states
 *
 * 1 - APPROVED
 * 2 - REJECTED
 * 3 - PENDING
 * 4 - CANCELED
 * 5 - ON_HOLD
 * 6 - DRAFT
 */

const createPurchaseOrder = async (orderDao, itemIdList) => {
  const createdPurchaseOrder = await PurchaseOrder.create({
    ...orderDao,
  });

  // associate the items
  const items = await Item.findAll({ where: { id: { [Op.in]: itemIdList } } });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await createdPurchaseOrder.addItem(item);
  }

  return createdPurchaseOrder;
};
const updatePurchaseOrder = async (orderId, orderDao, itemIdList) => {
  const updatedPurchaseOrder = await PurchaseOrder.update(
    {
      ...orderDao,
    },
    { where: { id: orderId } }
  );

  // remove all the previous item associations
  const purchaseOrder = await PurchaseOrder.findByPk(orderId, {
    include: Item,
  });

  await purchaseOrder.removeItems(purchaseOrder.Items);

  // associate the items
  const items = await Item.findAll({ where: { id: { [Op.in]: itemIdList } } });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await purchaseOrder.addItem(item);
  }

  return purchaseOrder;
};

const updatePurchaseOrderStatus = async (
  orderId,
  newState,
  approveComment = ""
) => {
  return await PurchaseOrder.update(
    { state: newState, approveComment },
    { where: { id: orderId } }
  );
};

const deletePurchaseOrder = async (orderId) => {
  const deleteCount = await PurchaseOrder.destroy({ where: { id: orderId } });
  return deleteCount === 1;
};

module.exports = {
  createPurchaseOrder,
  updatePurchaseOrder,
  updatePurchaseOrderStatus,
  deletePurchaseOrder,
};
