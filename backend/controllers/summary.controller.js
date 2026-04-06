const Transaction = require("../models/Transaction.model");

const getSummary = async (req, res) => {
  const result = await Transaction.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0, expense = 0;

  result.forEach(item => {
    if (item._id === "income") 
        income = item.total;
    if (item._id === "expense") 
        expense = item.total;
  });

  res.json({
    income,
    expense,
    balance: income - expense
  });
};

const getCategoryBreakdown = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
};

const getTrends = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  res.json(data);
};

const getRecent = async (req, res) => {
  const txs = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(txs);
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecent
};
