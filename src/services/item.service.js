const { Item } = require("../models/item.model");

const addItem = async (itemDao) => {
  const addedItem = await Item.create({ ...itemDao });
  return addedItem;
};

const deleteItem = async (itemId) => {
  const deleteCount = await Item.destroy({ where: { id: itemId } });
  return deleteCount === 1;
};

const updateItem = async (itemId, itemDao) => {
  return await Item.update({ ...itemDao }, { where: { id: itemId } });
};

const getItemsOfSupplier = async (supplierId) => {
  return await Item.findAll({ where: { supplierId } });
};

const getAllItems = async () => {
  return await Item.findAll();
};

module.exports = {
  addItem,
  deleteItem,
  updateItem,
  getItemsOfSupplier,
  getAllItems,
};
