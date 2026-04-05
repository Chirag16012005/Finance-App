// src/routes/summary.routes.js
const express = require("express");
const Transaction = require("../models/Transaction.model");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", auth, authorize(["admin", "analyst", "viewer"]), async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
});

module.exports = router;