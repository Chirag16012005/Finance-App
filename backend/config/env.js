const path = require("path");

// Always load env from backend/.env regardless of where node is launched from
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/finance-db";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET
};
