// src/routes/user.routes.js
const express = require("express");
const User = require("../models/User.model");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", auth, authorize(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.patch("/:id", auth, authorize(["admin"]), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

module.exports = router;