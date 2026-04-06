const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsQuerySchema
} = require("../validators/transaction.schema");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transaction.controller");

const router = express.Router();

router.get(
  "/",
  auth,
  authorize(["admin", "analyst", "viewer"]),
  validate(listTransactionsQuerySchema, "query"),
  getTransactions
);
router.post(
  "/",
  auth,
  authorize(["admin"]),
  validate(createTransactionSchema),
  createTransaction
);
router.patch(
  "/:id",
  auth,
  authorize(["admin"]),
  validate(updateTransactionSchema),
  updateTransaction
);
router.delete("/:id", auth, authorize(["admin"]), deleteTransaction);

module.exports = router;
