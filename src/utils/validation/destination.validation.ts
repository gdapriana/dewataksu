import z from "zod";

export class DestinationValidations {
  static readonly GET = z.string();
  static readonly QUERY = z.object({
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
    search: z.string().optional(),
    district: z.string().optional(),
    category: z.string().optional(),
    isPublished: z.enum(["0", "1"]).optional(),
    sortBy: z
      .enum([
        "price",
        "liked",
        "viewed",
        "bookmarked",
        "createdAt",
        "updatedAt",
      ])
      .optional()
      .default("createdAt"),
    orderBy: z.enum(["asc", "desc"]).optional().default("desc"),
  });
  static readonly POST = z.object({
    name: z.string().min(3).trim(),
    description: z.string().min(10).optional(),
    address: z.string().trim().optional(),
    mapUrl: z.string().trim().url("Invalid map URL").optional(),
    price: z.number().nonnegative("Price must be a positive number").optional(),
    coverId: z.string().nullable().optional(),
    categoryId: z.string().cuid(),
    districtId: z.string().cuid(),
    isPublished: z.boolean().optional(),
    // tags: z.array(z.string().min(1)).optional(),
  });
  static readonly PATCH = z.object({
    name: z.string().min(3).trim().optional(),
    description: z.string().min(10).optional(),
    address: z.string().trim().nullable().optional(),
    mapUrl: z.string().trim().url("Invalid map URL").nullable().optional(),
    price: z.number().nonnegative("Price must be a positive number").optional(),
    coverId: z.string().nullable().optional(),
    categoryId: z.string().cuid().optional(),
    districtId: z.string().cuid().optional(),
    isPublished: z.boolean().optional(),
    // tags: z.array(z.string().min(1)).nullable().optional(),
  });
  static readonly DELETE = z.string();
}
