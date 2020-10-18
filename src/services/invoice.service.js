const { Invoice } = require("../models/invoice.model");
const orderService = require("./purchaseOrder.service");

const createInvoice = async ({ totalValue, ownerId, orderId }) => {
  const createdInvoice = await Invoice.create({ totalValue, ownerId, orderId });
  await orderService.updatePurchaseOrderStatus(orderId, 8);
  return createdInvoice;
};

const payInvoice = async (invoiceId) => {
  const updatedInvoice = await Invoice.update(
    { payed: true, payedDate: new Date() },
    { where: { id: invoiceId } }
  );
  return updatedInvoice;
};

const deleteInvoice = async (invoiceId) => {
  const deleteCount = await Invoice.destroy({ where: { id: invoiceId } });
  return deleteCount === 1;
};

const getAllInvoices = async () => {
  return await Invoice.findAll({ include: { all: true, nested: true } });
};

const getAllInvoicesOfSupplier = async (supplierId) => {
  const allInvoices = await Invoice.findAll({
    include: { all: true, nested: true },
  });
  return allInvoices.filter((i) => i.order.supplier.id === supplierId);
};

module.exports = {
  createInvoice,
  payInvoice,
  deleteInvoice,
  getAllInvoices,
  getAllInvoicesOfSupplier,
};
