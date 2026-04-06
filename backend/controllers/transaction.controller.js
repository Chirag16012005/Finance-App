const Transaction = require("../models/Transaction.model");

const getTransactions = async (req, res) => {
  const { type, category, startDate, endDate, page = 1 } = req.query;

  const limit = 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const txs = await Transaction.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  res.json(txs);
};

const createTransaction = async (req, res) => {
  try {
    const tx = await Transaction.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to create transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const existing = await Transaction.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Transaction not found" });

    if (req.user.role !== "admin" && String(existing.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const existing = await Transaction.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Transaction not found" });

    if (req.user.role !== "admin" && String(existing.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to delete transaction" });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
