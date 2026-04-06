const mongoose = require("mongoose");
const app = require("./app");
const path = require("path");
const express = require("express");

// Load env only for local (Render already provides env)
require("dotenv").config();

const { MONGO_URI } = require("./config/env");

const PORT = process.env.PORT || 3000;

// Static folder (optional, safe)
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });