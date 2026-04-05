const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = authorize;