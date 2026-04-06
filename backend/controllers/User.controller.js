const User = require("../models/User.model");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

module.exports = {
  getAllUsers,
  updateUser
};
