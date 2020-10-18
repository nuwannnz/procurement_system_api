const { Site } = require("../models/site.model");
const { User } = require("../models/user.model");

const createSite = async (name, address) => {
  return await Site.create({ name, address });
};

const deleteSite = async (siteId) => {
  const deleteCount = await Site.destroy({ where: { id: siteId } });
  return deleteCount === 1;
};

const getAllSites = async () => {
  return await Site.findAll({ include: User });
};

const getSuppliersOfSite = async (siteId) => {
  const sites = await Site.findByPk(siteId, { include: { all: true } });
};

const addSupplierToSite = async (siteId, supplierId) => {
  const site = await Site.findByPk(siteId);
  const supplier = await User.findByPk(supplierId);
  return await site.addUser(supplier);
};

const removeSupplierToSite = async (siteId, supplierId) => {
  const site = await Site.findByPk(siteId);
  const supplier = await User.findByPk(supplierId);
  return await site.removeUser(supplier);
};

module.exports = {
  createSite,
  deleteSite,
  getAllSites,
  getSuppliersOfSite,
  addSupplierToSite,
  removeSupplierToSite,
};
