const { z } = require("zod");

const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    role: z.enum(["viewer", "analyst", "admin"]).optional(),
    isActive: z.boolean().optional()
  })
  .refine((val) => Object.keys(val).length > 0, { message: "At least one field is required" });

module.exports = {
  updateUserSchema
};
