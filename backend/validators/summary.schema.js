const { z } = require("zod");

const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
});

const trendsQuerySchema = dateRangeSchema.extend({
  interval: z.enum(["month", "week"]).default("month")
});

const recentQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(5)
});

module.exports = {
  dateRangeSchema,
  trendsQuerySchema,
  recentQuerySchema
};
