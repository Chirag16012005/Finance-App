
const errorHandler = (err, req, res, next) => {

  const _next = next;

  const status = err.status || err.statusCode || 500;

  // Zod validation errors
  if (err.name === "ZodError" && typeof err.flatten === "function") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.flatten()
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message || "Validation error",
      errors: err.errors
    });
  }

  // Invalid ObjectId casting, etc.
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid value",
      errors: { path: err.path, value: err.value }
    });
  }

  // Duplicate key (unique index) errors
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value",
      errors: err.keyValue
    });
  }

  console.error(err);

  return res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;