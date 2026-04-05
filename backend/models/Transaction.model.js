// src/models/transaction.model.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  note: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);