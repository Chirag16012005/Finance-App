const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { dateRangeSchema, trendsQuerySchema, recentQuerySchema } = require("../validators/summary.schema");
const {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecent
} = require("../controllers/summary.controller");

const router = express.Router();

router.get(
  "/",
  auth,
  authorize(["admin", "analyst", "viewer"]),
  validate(dateRangeSchema, "query"),
  getSummary
);
router.get(
  "/category",
  auth,
  authorize(["admin", "analyst", "viewer"]),
  validate(dateRangeSchema, "query"),
  getCategoryBreakdown
);
router.get(
  "/trends",
  auth,
  authorize(["admin", "analyst", "viewer"]),
  validate(trendsQuerySchema, "query"),
  getTrends
);
router.get(
  "/recent",
  auth,
  authorize(["admin", "analyst", "viewer"]),
  validate(recentQuerySchema, "query"),
  getRecent
);

module.exports = router;