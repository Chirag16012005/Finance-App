const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { getAllUsers, updateUser } = require("../controllers/User.controller");

const router = express.Router();

router.get("/", auth, authorize(["admin"]), getAllUsers);
router.patch("/:id", auth, authorize(["admin"]), updateUser);

module.exports = router;