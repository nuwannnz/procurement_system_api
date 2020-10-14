const { Invoice } = require("../models/invoice.model");

const createInvoice = async ({ totalValue, ownerId, orderId }) => {
  const createdInvoice = await Invoice.create({ totalValue, ownerId, orderId });
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

module.exports = {
  createInvoice,
  payInvoice,
  deleteInvoice,
};
