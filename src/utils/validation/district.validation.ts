import z from "zod";

export class DistrictValidations {
  static readonly GET = z.string();
  static readonly QUERY = z.object({
    search: z.string().optional(),
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a positive integer")
      .transform((val) => Number(val))
      .refine((val) => val > 0, "Page must be greater than 0")
      .optional(),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a positive integer")
      .transform((val) => Number(val))
      .refine((val) => val > 0, "Limit must be greater than 0")
      .optional(),
    sortBy: z
      .enum(["popular", "createdAt", "updatedAt"])
      .optional()
      .default("createdAt"),
    orderBy: z.enum(["asc", "desc"]).optional().default("desc"),
  });
  static readonly POST = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(100, { message: "Name cannot exceed 100 characters." })
      .trim(),
    description: z.string().min(10).trim(),
    coverId: z.string().trim().cuid("Invalid coverId format").optional(),
  });
  static readonly PATCH = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(100, { message: "Name cannot exceed 100 characters." })
      .trim()
      .optional(),
    description: z.string().min(10).optional(),
    coverId: z
      .string()
      .trim()
      .cuid("Invalid coverId format")
      .nullable()
      .optional(),
  });
  static readonly DELETE = z.string().cuid();
}
