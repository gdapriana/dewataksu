import { ZodSchema } from "zod";

export function validateRequest<T>(schema: ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}
