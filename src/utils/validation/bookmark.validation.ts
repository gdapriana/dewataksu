import z from "zod";

export class BookmarkValidations {
  static readonly GET = z.object({
    schema: z.enum(["destinations", "traditions", "stories"]),
    schemaId: z.string().cuid(),
  });
  static readonly DELETE = z.object({
    schema: z.enum(["destinations", "traditions", "stories"]),
    schemaId: z.string().cuid(),
  });
}
