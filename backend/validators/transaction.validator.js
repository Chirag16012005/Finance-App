// src/validators/transaction.validator.js
const { z } = require("zod");

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1),
  note: z.string().optional()
});

module.exports = transactionSchema;