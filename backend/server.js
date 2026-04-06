const mongoose = require("mongoose");
const app = require("./app");
const path=require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MONGO_URI, PORT } = require("./config/env");

app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exitCode = 1;
  });