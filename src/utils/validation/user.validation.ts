import z from "zod";

export class UserValidations {
  static readonly PATCH = z.object({
    name: z.string().min(4).optional(),
    profileImageId: z.string().cuid().optional(),
  });
}
