const { ReturnOrder } = require("../models/returnOrder.model");
const { Item } = require("../models/item.model");
const { Op } = require("sequelize");

const createReturnOrder = async (
  { state, totalPrice, orderId, ownerId },
  itemIdList
) => {
  const createdReturnOrder = await ReturnOrder.create({
    state,
    totalPrice,
    orderId,
    ownerId,
  });

  const items = await Item.findAll({ where: { id: { [Op.in]: itemIdList } } });

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    createReturnOrder.addItem(item);
  }
};

const deleteReturnOrder = async (returnOrderId) => {
  const deleteCount = await ReturnOrder.destroy({
    where: { id: returnOrderId },
  });

  return deleteCount === 1;
};

const updateReturnOrderStatus = async (
  returnOrderId,
  newState,
  approveComment
) => {
  const updatedReturnOrder = await ReturnOrder.update(
    { state: newState, approveComment },
    { where: { id: returnOrderId } }
  );

  return updatedReturnOrder;
};

module.exports = {
  createReturnOrder,
  deleteReturnOrder,
  updateReturnOrderStatus,
};
