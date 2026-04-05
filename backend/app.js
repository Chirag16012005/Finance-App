const express = require("express");
const app = express();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/User.routes");
const txRoutes = require("./routes/transaction.routes");
const summaryRoutes = require("./routes/summary.routes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/transactions", txRoutes);
app.use("/summary", summaryRoutes);

module.exports = app;