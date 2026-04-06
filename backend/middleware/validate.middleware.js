const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      const parsed = schema.safeParse(req[property]);
      if (!parsed.success) {
        parsed.error.status = 400;
        return next(parsed.error);
      }

      req[property] = parsed.data;
      return next();
    } catch (err) {
      err.status = err.status || 400;
      return next(err);
    }
  };
};

module.exports = validate;
