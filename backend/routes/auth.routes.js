// src/routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const {RegisterController,LoginController}=require("../controllers/auth.controller");

const router = express.Router();

// Register
router.post("/register",RegisterController);

// Login
router.post("/login", LoginController);

module.exports = router;