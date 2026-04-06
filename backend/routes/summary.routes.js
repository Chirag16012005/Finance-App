// src/routes/summary.routes.js
const express = require("express");
const Transaction = require("../models/Transaction.model");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();


router.get("/", auth, authorize(["admin", "analyst", "viewer"]), async (req, res) => {
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
});

router.get("/category", auth, authorize(["admin", "analyst"]), async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
});
router.get("/trends", auth, authorize(["admin", "analyst"]), async (req, res) => {
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
});
router.get("/recent", auth, authorize(["admin", "analyst", "viewer"]), async (req, res) => {
  const txs = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(txs);
});
module.exports = router;