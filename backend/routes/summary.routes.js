const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecent
} = require("../controllers/summary.controller");

const router = express.Router();

router.get("/", auth, authorize(["admin", "analyst", "viewer"]), getSummary);
router.get("/category", auth, authorize(["admin", "analyst"]), getCategoryBreakdown);
router.get("/trends", auth, authorize(["admin", "analyst"]), getTrends);
router.get("/recent", auth, authorize(["admin", "analyst", "viewer"]), getRecent);

module.exports = router;