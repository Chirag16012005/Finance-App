const express = require("express");
const { RegisterController, LoginController, getMeController } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.schema");

const router = express.Router();

router.post("/register", validate(registerSchema), RegisterController);
router.post("/login", validate(loginSchema), LoginController);
router.get("/me", auth, getMeController);

module.exports = router;