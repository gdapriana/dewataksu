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
    name: z.string().trim(),
    content: z.string().trim().optional(),
    address: z.string().trim().optional(),
    mapUrl: z.string().trim().url("Invalid map URL").optional(),
    price: z.number().nonnegative("Price must be a positive number").optional(),
    coverId: z.string().trim().cuid("Invalid coverId format").optional(),
    districtId: z.string().trim().cuid("Invalid districtId format"),
    categoryId: z.string().trim().cuid("Invalid categoryId format"),
    isPublished: z.boolean().optional(),
    tags: z.array(z.string().min(1)).optional(),
  });
  static readonly PATCH = z.object({
    name: z.string().trim().optional(),
    content: z.string().trim().nullable().optional(),
    address: z.string().trim().nullable().optional(),
    mapUrl: z.string().trim().url("Invalid map URL").nullable().optional(),
    price: z.number().nonnegative("Price must be a positive number").optional(),
    coverId: z
      .string()
      .trim()
      .cuid("Invalid coverId format")
      .nullable()
      .optional(),
    districtId: z.string().trim().cuid("Invalid districtId format").optional(),
    categoryId: z.string().trim().cuid("Invalid categoryId format").optional(),
    isPublished: z.boolean().optional(),
    tags: z.array(z.string().min(1)).nullable().optional(),
  });
  static readonly DELETE = z.string();
}
