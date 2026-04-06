const { z } = require("zod");

const typeEnum = z.enum(["income", "expense"]);

const createTransactionSchema = z.object({
  amount: z.number().finite().positive(),
  type: typeEnum,
  category: z.string().trim().min(1),
  date: z.coerce.date().optional(),
  note: z.string().trim().max(500).optional()
});

const updateTransactionSchema = z
  .object({
    amount: z.number().finite().positive().optional(),
    type: typeEnum.optional(),
    category: z.string().trim().min(1).optional(),
    date: z.coerce.date().optional(),
    note: z.string().trim().max(500).optional()
  })
  .refine((val) => Object.keys(val).length > 0, { message: "At least one field is required" });

const listTransactionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  type: typeEnum.optional(),
  category: z.string().trim().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsQuerySchema
};
