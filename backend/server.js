const mongoose = require("mongoose");
const app = require("./app");

const { MONGO_URI, PORT } = require("./config/env");

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exitCode = 1;
  });