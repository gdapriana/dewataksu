import z from "zod";

export class ViewValidation {
  static readonly POST = z.object({
    schema: z.enum(["destinations", "traditions", "stories"]),
    schemaId: z.string().cuid(),
  });
}
