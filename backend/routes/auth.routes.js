const express = require("express");
const { RegisterController, LoginController } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.schema");

const router = express.Router();

router.post("/register", validate(registerSchema), RegisterController);
router.post("/login", validate(loginSchema), LoginController);

module.exports = router;