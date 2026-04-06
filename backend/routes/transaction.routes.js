const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transaction.controller");

const router = express.Router();

router.get("/", auth, authorize(["admin", "analyst"]), getTransactions);
router.post("/", auth, authorize(["admin", "analyst"]), createTransaction);
router.patch("/:id", auth, authorize(["admin", "analyst"]), updateTransaction);
router.delete("/:id", auth, authorize(["admin", "analyst"]), deleteTransaction);

module.exports = router;
